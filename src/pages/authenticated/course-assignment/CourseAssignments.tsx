import { DashboardWrapper, QuestionItem } from "../../../components"
import { useAssignmentStore } from "../../../store"
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import './style.scss'

type CourseAssignmentsProps = {}

export const CourseAssignments: React.FC<CourseAssignmentsProps> = () => {
  const { assignments } = useAssignmentStore()
  const { goBack } = useHistory()

  return (
    <DashboardWrapper>
      <div className="__studying_course_page">

        <div className="__greetings mb-3 mb-md-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Course Assignment
          </h2>
          <div className='badge bg-primary text-light p-2 px-3'>
            {assignments?.length} questions
          </div>
        </div>

        <div className="__courses_wrapper">
          <div className="__courses d-flex flex-wrap">
            {
              assignments?.length! > 0 &&
              assignments?.map((item, index) => (
                <QuestionItem item={item} key={index} />
              ))
            }
          </div>
        </div>

      </div>
    </DashboardWrapper>
  )
}