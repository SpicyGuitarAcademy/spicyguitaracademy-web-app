import { Lock, PlayCircle } from "react-feather"
import { useHistory } from "react-router-dom"
import { Course, useAssignmentStore, useCourseStore, useLessonStore, useModalStore, useStudentStatsStore } from "../../store"
import { baseUrl, stateToFormData } from "../../utils"
import './style.scss'

type CourseItemProps = {
  item: Course
  showProgress: boolean
  clickable: boolean
  isFeatured: boolean
  isBought: boolean
  isFromLandingPage?: boolean
  isFromLandingPageHandler?: Function
}

export const CourseItem: React.FC<CourseItemProps> = ({ item, showProgress, clickable, isFeatured, isBought, isFromLandingPage = false, isFromLandingPageHandler = () => { } }) => {

  const { push } = useHistory()
  const { toast, loading } = useModalStore()
  const { activateCourse, setSelectedCourse, boughtCoursesId } = useCourseStore()
  const { getCourseLessons, getFeaturedLessons } = useLessonStore()
  const { getAssignment } = useAssignmentStore()
  const { studentStats } = useStudentStatsStore()
  const progress = Math.ceil((item?.done / item?.total) * 100)
  const alreadyBought = boughtCoursesId.includes(item?.id)

  const handleCourseClicked = async () => {

    if (isFromLandingPage)
      isFromLandingPageHandler!()

    if (!clickable) return

    if (isFeatured === true) {
      setSelectedCourse(item)

      if (alreadyBought === true) {
        loading(true, 'Fetching lessons...')
        getFeaturedLessons(item?.id)
          .then(async _ => {
            loading(false)
            push('/dashboard/courses/lessons', {
              isBought: true,
              clickable: true
            })
          })
      } else
        push('/dashboard/courses/details')

    } else {

      setSelectedCourse(item)

      if (isBought === true) {

        // get the lessons for this course
        loading(true, 'Fetching lessons...')
        getFeaturedLessons(item?.id)
          .then(async _ => {
            loading(false)
            push('/dashboard/courses/lessons', {
              isBought: true,
              clickable: true
            })
          })

      } else {

        // get the lessons for this course
        loading(true, 'Fetching lessons...')
        getCourseLessons(item?.id)
          .then(async _ => {

            // get assignments for the course if current category is not a previous category
            if (studentStats?.viewingPrevious === false) {
              await getAssignment(item?.id)
            }

            if (item?.status === false) {
              // activate course
              activateCourse(stateToFormData({ course: item?.id }))
                .then((resp: any) => {
                  toast(resp.message, undefined, resp.status ? 'success' : 'danger')

                  loading(false)
                  push('/dashboard/courses/lessons', {
                    clickable: resp?.status!
                  })
                })
            } else {
              loading(false)
              push('/dashboard/courses/lessons', {
                clickable: true
              })
            }

          })
      }

    }
  }

  return (
    <div className={`__item h-100 col-12 col-md-6 ${isFromLandingPage === false ? 'col-lg-4' : 'col-lg-3'} p-1`}>
      <div onClick={handleCourseClicked} className="__item_content h-100 mb-2 mb-lg-3 bg-light cursor-pointer text-decoration-none">
        <div className={`__thumbnail ${isFromLandingPage === true && '__landing'} ${isFromLandingPage === false && 'mb-2'} position-relative`}>
          <img className="rounded border border-grey shadow-sm" src={`${baseUrl}/${item?.thumbnail}`} alt="Lesson Thumbnail" />
          {
            isFromLandingPage === false ?
              item?.status === true || alreadyBought === true ?
                <PlayCircle size={32} strokeWidth={1.5} className="position-absolute translate-middle top-50 start-50 text-white" />
                :
                <Lock size={32} strokeWidth={1.5} className="position-absolute translate-middle top-50 start-50 text-white" />
              :
              <Lock size={32} strokeWidth={1.5} className="position-absolute translate-middle top-50 start-50 text-white" />
          }
        </div>
        {
          isFromLandingPage === false &&
          <div className="__details d-flex flex-column gap-1 justify-content-start align-items-center px-1 pb-3">
            {
              showProgress === true ?
                <div className="w-100">
                  <div className="w-100 pb-1 bg-cream position-relative rounded-pill">
                    <div style={{ width: `${progress === 0 ? 1 : progress}%` }}
                      className="position-absolute pb-1 top-0 start-0 bg-primary rounded-pill"></div>
                  </div>
                  <div className="w-100 d-flex justify-content-between">
                    <span>{progress}%</span>
                    <span>{item?.done!}/{item?.total} lessons</span>
                  </div>
                </div>
                :
                <div className="w-100 d-flex justify-content-between mx-1">
                  {
                    isFeatured === true ?
                      <div className="__lessons badge badge-sm text-primary">₦{item?.featuredprice}</div>
                      :
                      <span className="p-1" />
                  }
                  <div className="__lessons badge badge-sm bg-primary align-self-end">{item?.total} lessons</div>
                </div>
            }
            <div className="__tutor text-center text-secondary">{item?.tutor}</div>
            <div className="__title text-center fw-bold">{item?.course}</div>
            <div className="__description text-center text-dark">{item?.description}</div>
          </div>
        }
      </div>
    </div>
  )
}