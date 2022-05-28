import { DashboardWrapper } from "../../../components"
import { useAuthStore, useCourseStore, useModalStore } from "../../../store"
import { useHistory } from "react-router-dom";
import { baseUrl, domain } from "../../../utils";
import { ArrowLeft, ArrowRight, Copy, Share2 } from "react-feather";
import './style.scss'

export const CourseDetails: React.FC<{}> = () => {

  const { goBack, push } = useHistory()
  const { selectedCourse } = useCourseStore()
  const { student } = useAuthStore()
  const { toast } = useModalStore()

  const handleBuy = async () => {
    push('/dashboard/payment/methods', {
      paymentFor: 'featured-course',
      course: selectedCourse?.id
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "Learn Guitar With Spicy Guitar Academy.\n\n" +
      "Spicy Guitar Academy is aimed at guiding beginners to fulfill their dream of becoming professional guitar players.\n\n" +
      "Join with the link below\n" +
      `${domain}/featured/${selectedCourse?.id}?ref=${student?.referral_code}`
    )

    toast("Copied", undefined, 'success')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        url: `${domain}/featured/${selectedCourse?.id}?ref=${student?.referral_code}`,
        title: 'Learn Guitar With Spicy Guitar Academy',
        text: 'Spicy Guitar Academy is aimed at guiding beginners to fulfill their dream of becoming professional guitar players.'
      })
    } else {
      toast("Web share is currently not supported on this browser.", undefined, 'danger')
    }
  }

  return (
    <DashboardWrapper>
      <div className="__tutorial_page pb-5">

        <div className="__tutorial_content_wrapper mb-2">
          <video controls controlsList="nodownload" className="__lesson_video border border-grey shadow rounded" src={`${baseUrl}/${selectedCourse?.featured_preview_video!}`} />
        </div>

        <div className="__title mb-4">
          <h2 className="fw-bold">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            {selectedCourse?.course}
          </h2>
          <h5 className="text-secondary">{selectedCourse?.tutor}</h5>
        </div>

        <div className="__description mb-5 text-dark">
          {selectedCourse?.description}
        </div>

        <div className="mb-5">
          <p>Hi <b>{student.firstname}</b>, Share this featured course with your friends.</p>

          <div className="position-relative rounded-pill bg-cream my-2 p-3">
            <span className="__invite_link">{domain}/featured/{selectedCourse?.id}?ref={student?.referral_code}</span>

            <div className="__share_btns d-flex gap-1 gap-md-2">
              <button onClick={handleCopy} className="btn btn-cream shadow-sm text-primary rounded-pill"><Copy size={20} /></button>
              <button onClick={handleShare} className="btn btn-cream shadow-sm text-primary rounded-pill"><Share2 size={20} /></button>
            </div>

          </div>
        </div>

        <div className="my-2 my-md-5"><br /></div>

        <div className="__comment_input_wrapper container-lg position-fixed bottom-0 p-0 mt-3 mt-md-5">
          <div className="__comment_input border-top border-3 border-primary mt-3 mt-md-5 px-0 px-md-2 py-3 bg-light">

            <div className="d-flex justify-content-between align-items-center mb-2 mb-md-2">

              <div className="__lessons fw-bol d text-primary">₦{selectedCourse?.featuredprice}</div>

              <div className="__lessons fw-bol d text-primary align-self-end">{selectedCourse?.total} lessons</div>

            </div>

            <button onClick={handleBuy} className="btn btn-primary rounded-0 w-100">
              <span>Payment Methods</span>
              <ArrowRight size={18} />
            </button>

          </div>
        </div>

      </div>
    </DashboardWrapper>
  )
}