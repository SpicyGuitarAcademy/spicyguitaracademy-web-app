import { CommentTile, DashboardWrapper } from "../../../components"
import { useAuthStore, useCourseStore, useLessonStore, useModalStore, useTutorialStore } from "../../../store"
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { baseUrl, domain, stateToFormData } from "../../../utils";
import { ArrowLeft, Copy, Send, Share2 } from "react-feather";
import PlayingAudio from '../../../assets/playing-audio.svg'
import './style.scss'

export const Tutorial: React.FC<{}> = () => {

  const { goBack, push } = useHistory()
  const { student } = useAuthStore()
  const { activateLesson, activateFeaturedLesson } = useLessonStore()
  const { selectedCourse, sortCoursesByOrder } = useCourseStore()
  const { submitComment, getTutorialComments, setCurrentTutorial, tutorialComments, currentTutorial, tutorialLessons } = useTutorialStore()
  const [medium, setMedium] = useState<'video' | 'audio' | 'practice' | 'tablature'>('video')
  const { state } = useLocation<{
    fromFreeLessons: boolean
    isBought: boolean
  }>()
  const { toast } = useModalStore()

  const tutorialIndex = () => tutorialLessons?.findIndex(lesson => currentTutorial?.id === lesson?.id)

  const handlePrevious = async () => {
    if (tutorialIndex() === 0) return
    const index = tutorialLessons?.findIndex(lesson => lesson?.id === currentTutorial?.id)

    setCurrentTutorial(tutorialLessons[(index - 1)])
    setMedium('video')

    if (state?.fromFreeLessons === false) {
      // activate course

      if (state?.isBought === true)
        await activateFeaturedLesson(stateToFormData({ lesson: tutorialLessons[(index - 1)]?.id, course: selectedCourse?.id }))
      else
        await activateLesson(stateToFormData({ lesson: tutorialLessons[(index - 1)]?.id }))
    }

    // get comments
    await getTutorialComments(tutorialLessons[(index - 1)]?.id)
  }

  const handleNext = async () => {
    if (tutorialIndex() === (tutorialLessons.length - 1)) return
    const index = tutorialLessons?.findIndex(lesson => lesson?.id === currentTutorial?.id)

    setCurrentTutorial(tutorialLessons[(index + 1)])
    setMedium('video')

    if (state?.fromFreeLessons === false) {
      // activate course

      if (state?.isBought === true)
        await activateFeaturedLesson(stateToFormData({ lesson: tutorialLessons[(index + 1)]?.id, course: selectedCourse?.id }))
      else
        await activateLesson(stateToFormData({ lesson: tutorialLessons[(index + 1)]?.id }))
    }

    // get comments
    await getTutorialComments(tutorialLessons[(index + 1)]?.id)
  }

  const handleComplete = () => {
    // if this course is the last course in the category,
    // show the completed category page
    // else show the completed courses page

    sortCoursesByOrder()
    let stCourses = useCourseStore.getState()?.studyingCourses

    if (stCourses[stCourses.length - 1].id === selectedCourse?.id) {
      push('/dashboard/courses/complete', {
        isBought: state.isBought,
        completedCategory: true
      })
    } else {
      push('/dashboard/courses/complete', {
        isBought: state.isBought,
        completedCategory: false
      })
    }
  }

  const handleCommentSubmit = async (event: any) => {
    event.preventDefault()

    submitComment(stateToFormData({
      lessonId: currentTutorial?.id,
      receiver: currentTutorial?.tutor,
      comment: event.target[0].value
    }))
      .then(resp => {
        if (resp.status === true) {
          toast(resp?.message)
          event.target[0].value = ''
        }
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
      <div className="__tutorial_page position-re lative pb-md-5">

        <div className="__tutorial_content_wrapper mb-2">
          {
            medium === 'video' &&
            <video controls controlsList="nodownload" className="__lesson_video border border-grey shadow rounded" src={`${baseUrl}/${currentTutorial?.high_video}`} />
          }
          {
            medium === 'audio' &&
            <div className="w-100 bg-white shadow rounded-3 d-flex gap-4 flex-column align-items-center p-3 py-4 p-md-5">
              <img className="w-60 w-md-30" src={PlayingAudio} alt="Audio" />
              <audio controls controlsList="nodownload" className="__lesson_audio w-100 text-primary" src={`${baseUrl}/${currentTutorial?.audio}`} />
            </div>
          }
          {
            medium === 'practice' &&
            <div className="w-100 bg-white shadow rounded-3 d-flex gap-4 flex-column align-items-center p-3 py-4 p-md-5">
              <img className="w-60 w-md-30" src={PlayingAudio} alt="Audio" />
              <audio controls controlsList="nodownload" className="__lesson_audio w-100 text-primary" src={`${baseUrl}/${currentTutorial?.practice_audio}`} />
            </div>
          }
          {
            medium === 'tablature' &&
            <iframe title="__lesson_tablature" frameBorder="0" className="__lesson_tablature w-100 border border-grey shadow rounded" src={`${baseUrl}/${currentTutorial?.tablature}`} />
          }
        </div>

        <div className="__category_menu mb-3 d-flex justify-content-between align-items-center">
          <div onClick={() => typeof currentTutorial?.high_video === 'string' && setMedium('video')} className={`btn btn-muted p-1 ${medium === 'video' ? 'text-primary fw-bold' : typeof currentTutorial?.high_video === 'string' ? 'text-dark' : 'text-grey'} fw-normal`}>Video</div>
          <div onClick={() => typeof currentTutorial?.audio === 'string' && setMedium('audio')} className={`btn btn-muted p-1 ${medium === 'audio' ? 'text-primary fw-bold' : typeof currentTutorial?.audio === 'string' ? 'text-dark' : 'text-grey'} fw-normal`}>Audio</div>
          <div onClick={() => typeof currentTutorial?.practice_audio === 'string' && setMedium('practice')} className={`btn btn-muted p-1 ${medium === 'practice' ? 'text-primary fw-bold' : typeof currentTutorial?.practice_audio === 'string' ? 'text-dark' : 'text-grey'} fw-normal`}>Practice Loop</div>
          <div onClick={() => typeof currentTutorial?.tablature === 'string' && setMedium('tablature')} className={`btn btn-muted p-1 ${medium === 'tablature' ? 'text-primary fw-bold' : typeof currentTutorial?.tablature === 'string' ? 'text-dark' : 'text-grey'} fw-normal`}>Tablature</div>
        </div>

        <div className="__title mb-4">
          <h2 className="fw-bold">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            {currentTutorial?.lesson}
          </h2>
          <h5 className="text-secondary">{currentTutorial?.tutor}</h5>
        </div>

        <div className="__description mb-4 text-dark">
          {currentTutorial?.description}
        </div>

        {
          currentTutorial?.note &&
          <div className="__notes mb-5 text-dark">
            <h5 className="text-primary fw-bold mb-md-2">Notes</h5>
            {currentTutorial?.note!}
          </div>
        }

        <div className="mb-5 d-flex justify-content-between align-items-center">
          {
            (tutorialIndex() === 0) ? <span className="p-1" /> :
              <button onClick={handlePrevious} className={`btn btn-sm btn-primary`}>
                PREVIOUS
              </button>
          }
          {
            (tutorialIndex() !== tutorialLessons.length - 1) ?
              <button onClick={handleNext} className={`btn btn-sm btn-primary`}>
                NEXT
              </button>
              :
              state?.fromFreeLessons === true
                ? <span className="p-1" />
                : selectedCourse?.done === selectedCourse?.total ?
                  <button onClick={handleComplete} className={`btn btn-sm btn-primary`}>
                    COMPLETE
                  </button>
                  : <span className="p-1" />
          }
        </div>

        {
          state.isBought === true &&
          <div className="mb-5">
            <p>Hi <b>{student.firstname}</b>, Share this featured course with your friends if you're enjoying it.</p>

            <div className="position-relative rounded-pill bg-cream my-2 p-3">
              <span className="__invite_link">{domain}/featured/{selectedCourse?.id}?ref={student?.referral_code}</span>

              <div className="__share_btns d-flex gap-1 gap-md-2">
                <button onClick={handleCopy} className="btn btn-cream shadow-sm text-primary rounded-pill"><Copy size={20} /></button>
                <button onClick={handleShare} className="btn btn-cream shadow-sm text-primary rounded-pill"><Share2 size={20} /></button>
              </div>

            </div>
          </div>
        }

        <div className="__comments mb-5 text-dark w-100">
          <h5 className="text-primary fw-bold mb-3">Comments</h5>
          {
            tutorialComments?.length > 0 ?
              tutorialComments?.map((comment, index) => (
                <CommentTile key={index} comment={comment} />
              ))
              : <div>No comments</div>
          }
        </div>

        <div className="my-4 d-block d-md-none"><br /></div>

        <div className="__comment_input_wrapper container position-fixed bottom-0 p-0">
          <div className="__comment_input border-top border-3 border-primary mt-5 px-0 px-md-2 py-3 bg-light">

            <form className="d-flex align-item-center" onSubmit={handleCommentSubmit}>

              <input type="text" placeholder="Ask question" className="form-control text-dark w-100 rounded-pill me-2" />
              <button type="submit" className="rounded-pill btn btn-primary">
                <Send size={18} />
              </button>

            </form>

          </div>
        </div>

      </div>
    </DashboardWrapper>
  )
}
