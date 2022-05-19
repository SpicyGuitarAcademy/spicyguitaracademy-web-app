import { AssignmentItem, DashboardWrapper, LessonItem } from "../../../components"
import { useAssignmentStore, useCourseStore, useLessonStore, useStudentStatsStore } from "../../../store"
import './style.scss'
import { ArrowLeft } from "react-feather";
import { useHistory, useLocation } from "react-router-dom";

type CourseLessonsProps = {
  // clickable: boolean
}
export const CourseLessons: React.FC<CourseLessonsProps> = () => {

  const { courseLessons, featuredLessons } = useLessonStore()
  const { selectedCourse } = useCourseStore()
  const { studentStats } = useStudentStatsStore()
  const { assignments } = useAssignmentStore()
  const { goBack } = useHistory()
  const { state } = useLocation<{
    isBought: boolean
    clickable: boolean
  }>()

  const clickable = state?.clickable!
  const isBought = state?.isBought!

  return (
    <DashboardWrapper>
      <div className="__studying_course_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            {selectedCourse?.course}
          </h2>
          <div className='badge bg-primary text-light p-2 px-3'>
            {isBought === true ? featuredLessons?.length : courseLessons?.length} lessons
          </div>
        </div>

        <div className="__courses_wrapper">
          <div className="__courses d-flex flex-wrap">
            {
              isBought === true ?
                featuredLessons?.length > 0 &&
                featuredLessons?.map((item, index) => (
                  <LessonItem fromFreeLessons={false} isBought={true} tutorialLessons={featuredLessons} clickable={clickable} showOrder={true} item={item} key={index} />
                ))
                :
                courseLessons?.length > 0 &&
                <>
                  {
                    courseLessons?.map((item, index) => (
                      <LessonItem fromFreeLessons={false} isBought={false} tutorialLessons={courseLessons} clickable={clickable} showOrder={true} item={item} key={index} />
                    ))
                  }
                  {
                    (studentStats?.viewingPrevious === false && assignments?.length! > 0) &&
                    <AssignmentItem />
                  }
                </>
            }
          </div>
        </div>

      </div>
    </DashboardWrapper>
  )
}