import { Lock, PlayCircle } from "react-feather"
import { useHistory } from "react-router-dom"
import { Lesson, useCourseStore, useLessonStore, useModalStore, useTutorialStore } from "../../store"
import { baseUrl, stateToFormData } from "../../utils"
import './style.scss'

type LessonItemProps = {
  item: Lesson
  clickable: boolean
  showOrder: boolean
  tutorialLessons: Lesson[]
  fromFreeLessons: boolean,
  isBought: boolean
  isFromLandingPage?: boolean
  isFromLandingPageHandler?: Function
}

export const LessonItem: React.FC<LessonItemProps> = ({ item, clickable, showOrder, tutorialLessons, fromFreeLessons, isBought, isFromLandingPage = false, isFromLandingPageHandler = () => { } }) => {

  const { push } = useHistory()
  const { loading } = useModalStore()
  const { activateLesson, activateFeaturedLesson } = useLessonStore()
  const { selectedCourse } = useCourseStore()
  const { setCurrentTutorial, setTutorialLessons, getTutorialComments } = useTutorialStore()

  const handleLessonClicked = async () => {

    if (isFromLandingPage)
      isFromLandingPageHandler!()

    if (!clickable) return

    loading(true)

    if (fromFreeLessons === false) {
      // activate course

      if (isBought === true)
        await activateFeaturedLesson(stateToFormData({ lesson: item?.id, course: selectedCourse?.id }))
      else
        await activateLesson(stateToFormData({ lesson: item?.id }))
    }

    // set the lessons for the tutorial
    setCurrentTutorial(item)
    setTutorialLessons(tutorialLessons)

    // get comments
    await getTutorialComments(item?.id)

    loading(false)
    push('/dashboard/tutorial', {
      fromFreeLessons: fromFreeLessons,
      isBought: isBought
    })
  }

  return (
    <div className={`__item h-100 col-12 col-md-6 ${isFromLandingPage === false ? 'col-lg-4' : 'col-lg-3'} p-1 h-100`}>
      <div onClick={handleLessonClicked} className="__item_content h-100 mb-2 mb-lg-3 bg-light cursor-pointer text-decoration-none">
        <div className={`__thumbnail ${isFromLandingPage === false && 'mb-2'} position-relative`}>
          <img className="rounded border border-grey shadow-sm" src={`${baseUrl}/${item?.thumbnail}`} alt="Lesson Thumbnail" />
          {
            isFromLandingPage === false ?
              clickable === true ?
                <PlayCircle size={32} strokeWidth={1.5} className="position-absolute translate-middle top-50 start-50 text-white" />
                :
                <Lock size={32} strokeWidth={1.5} className="position-absolute translate-middle top-50 start-50 text-white" />
              :
              <Lock size={32} strokeWidth={1.5} className="position-absolute translate-middle top-50 start-50 text-white" />
          }
          {
            showOrder === true ?
              isBought === true ? <></> :
                <span className="position-absolute m-1 top-0 end-0 bg-secondary badge p-1 px-3" >
                  {item?.ord}
                </span>
              : <br />
          }
        </div>
        {
          isFromLandingPage === false &&
          <div className="__details d-flex flex-column gap-1 justify-content-start align-items-center px-1 pb-3">
            <div className="__tutor text-center text-secondary">{item?.tutor}</div>
            <div className="__title text-center fw-bold">{item?.lesson}</div>
            <div className="__description text-center text-dark">{item?.description}</div>
          </div>
        }
      </div >
    </div>
  )
}