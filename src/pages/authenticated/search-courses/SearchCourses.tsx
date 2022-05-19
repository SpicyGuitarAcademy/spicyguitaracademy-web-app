import { CourseItem, DashboardWrapper } from "../../../components"
import { Course } from "../../../store"
import './style.scss'
import { ArrowLeft } from "react-feather";
import { useHistory, useLocation } from "react-router-dom";

export const SearchCourses: React.FC<{}> = () => {

  const { goBack } = useHistory()
  const { state } = useLocation<{
    search: string
    courses: Course[]
  }>()

  return (
    <DashboardWrapper>
      <div className="__studying_course_page">

        <div className="__greetings mb-4 d-flex gap-1 justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            <span>Search for <i>"{state?.search}"</i></span>
          </h2>
          <div className='badge bg-primary text-light p-2 px-3'>
            {state?.courses?.length ?? 0} courses
          </div>
        </div>

        <div className="__courses_wrapper">
          <div className="__courses d-flex flex-wrap">
            {
              state?.courses?.length > 0 ?
                state?.courses?.map((item, index) => (
                  <CourseItem isBought={false} clickable={item?.status} isFeatured={false} showProgress={item?.status} item={item} key={index} />
                ))
                :
                <div>No results for search: <i>{state?.search}</i></div>
            }
          </div>
        </div>

      </div>
    </DashboardWrapper>
  )
}
