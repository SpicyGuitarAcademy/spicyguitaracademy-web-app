import { DashboardWrapper } from "../../../components"
import { useAuthStore, useModalStore, useStudentStatsStore } from "../../../store"
import { Link } from "react-router-dom";
import { Award, Edit2, Grid, HelpCircle, Lock, Minus, Plus, Upload, User, UserPlus } from "react-feather";
import { baseUrl, cropImage } from "../../../utils";
import React, { useState, useRef, useEffect, DependencyList } from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import './style.scss'

function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      return fn.apply(undefined, []);
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, [deps, fn, waitTime])
}

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const CropModal: React.FC<{}> = () => {

  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect] = useState<number | undefined>(1)
  const [croppedImage, setCroppedImage] = useState<HTMLCanvasElement>()
  const { updateProfileAvatar } = useAuthStore()
  const { toast } = useModalStore()

  const { closeModal } = useModalStore()

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader?.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        const img = await cropImage(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )

        setCroppedImage(img)
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  const uploadImage = async () => {
    if (croppedImage?.toBlob) {
      croppedImage.toBlob(async function (blob) {

        // Do something with the blob object,
        // e.g. create multipart form data for file uploads:
        let formData = new FormData()
        formData.append('avatar', blob!, 'image.png')

        updateProfileAvatar(formData).then(resp => {
          if (resp.status === true) toast(resp?.message)
          else toast(resp?.message, undefined, 'danger')
    
          closeModal()
        })
      }, 'image/png')
    }
  }

  return (
    <div className="d-flex flex-column gap-3 align-items-center">

      <input id="select-avatar" className="d-none" type="file" accept="image/*" onChange={onSelectFile} />

      {
        Boolean(imgSrc) === true ? (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        ) :
          <label htmlFor="select-avatar" className="w-100 p-5 btn">
            <Upload size={20} />
            <div>Select Image</div>
          </label>
      }

      <div className="d-none">
        {Boolean(completedCrop) && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop?.width,
              height: completedCrop?.height,
            }}
          />
        )}
      </div>

      {
        Boolean(imgSrc) === true ?
          <div className="w-100 d-flex justify-content-between align-items-end">
            <div className="d-flex gap-2">
              <div>
                <div className="fw-bold text-primary">Scale</div>
                <button className="btn btn-primary px-2 py-0 btn-sm" onClick={() => { setScale(scale - 0.1) }}>
                  <Minus size={16} />
                </button>
                <span className="mx-2">{scale.toFixed(2)}</span>
                <button className="btn btn-primary px-2 py-0 btn-sm" onClick={() => { setScale(scale + 0.1) }}>
                  <Plus size={16} />
                </button>
              </div>

              <div>
                <div className="fw-bold text-primary">Rotate</div>
                <button className="btn btn-primary px-2 py-0 btn-sm" onClick={() => { setRotate(Math.min(180, Math.max(-180, (rotate - 1)))) }}>
                  <Minus size={16} />
                </button>
                <span className="mx-2">{Math.round(rotate)}</span>
                <button className="btn btn-primary px-2 py-0 btn-sm" onClick={() => { setRotate(Math.min(180, Math.max(-180, (rotate + 1)))) }}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div>
              <button className="btn btn-sm btn-muted text-danger me-2" onClick={closeModal}>Cancel</button>
              <button className="btn btn-sm btn-primary" onClick={uploadImage}>Upload</button>
            </div>
          </div>
          :
          <button className="btn btn-sm btn-muted text-danger" onClick={closeModal}>Cancel</button>
      }

    </div >
  )

}

export const Profile: React.FC = () => {

  const { student } = useAuthStore()
  const { studentStats } = useStudentStatsStore()
  const { modal } = useModalStore()

  const actions = [
    {
      icon: <User size={33} />,
      title: 'Edit Profile',
      route: '/dashboard/profile/update'
    },
    {
      icon: <Lock size={33} />,
      title: 'Edit Password',
      route: '/dashboard/profile/update-password'
    },
    {
      icon: <Grid size={33} />,
      title: 'Category',
      route: '/dashboard/profile/category'
    },
    {
      icon: <Award size={33} />,
      title: 'Subscription',
      route: '/dashboard/profile/subscription'
    },
    {
      icon: <UserPlus size={33} />,
      title: 'Invite a friend',
      route: '/dashboard/profile/invite'
    },
    {
      icon: <HelpCircle size={33} />,
      title: 'Help',
      route: '/dashboard/help'
    },
  ]

  const previewImage = () => {
    modal(<CropModal />, 'lg', true)
  }

  return (
    <DashboardWrapper>
      <div className="__profile_page">

        <div className="mb-4 d-flex flex-column align-items-center">

          <div className='__avatar_wrapper rounded-circle shadow border border-transparent position-relative'>
            <img className='__avatar img' id="student-avatar" src={`${baseUrl}/${student?.avatar}`} alt="Student Avatar" />
            <button onClick={previewImage} className="btn btn-primary rounded-circle px-2 m-2 position-absolute bottom-0 end-0">
              <Edit2 size={24} className='m-1' />
            </button>
          </div>

          <div className='__student_details'>

            <div className='__student_name h3 text-primary p-2 mb-1'>
              {student?.firstname}{' '}{student?.lastname}
            </div>

            <div className='__student_stats d-flex flex-column justify-content-center'>
              <span className='badge bg-primary text-light p-2 px-3 fw-bold rounded-pill mx-auto'>
                {studentStats?.takenCourses} of {studentStats?.allCourses} Courses
              </span>
              <span className='badge bg-muted text-primary p-2 fw-bold'>
                {studentStats?.takenLessons} of {studentStats?.allLessons} Lessons
              </span>
            </div>

          </div>

        </div>

        <div className="__actions d-flex justify-content-between flex-wrap">

          {
            actions.map((action, index) => (
              <Link key={index} to={action?.route} className="__action w-100 my-2 my-md-3 cursor-pointer text-decoration-none bg-white shadow-sm border border-light">

                <div className="w-100">

                  <div className="d-flex flex-column gap-3 align-items-center p-5">

                    <div>{action?.icon}</div>

                    <div className="">{action?.title}</div>

                  </div>

                </div>
              </Link >
            ))
          }

        </div>

      </div>
    </DashboardWrapper>
  )
}