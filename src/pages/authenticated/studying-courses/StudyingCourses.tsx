import { CourseItem, DashboardWrapper } from "../../../components"
import { useCourseStore, useStudentStatsStore, useSubscriptionStore } from "../../../store"
import { Link, useLocation } from "react-router-dom";
import './style.scss'
import { categoryThumbnails } from "../../../utils";
import { BarChart } from "react-feather";

export const StudyingCourses: React.FC<{}> = () => {

  const { studyingCourses, sortedBy, sortCoursesByOrder, sortCoursesByTitle, sortCoursesByTutor } = useCourseStore()
  const { studentStats } = useStudentStatsStore()
  const { pathname } = useLocation()
  const { studentSubscription } = useSubscriptionStore()

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target?.value) {
      case 'tutor':
        sortCoursesByTutor()
        break;
      case 'title':
        sortCoursesByTitle()
        break;
      case 'order':
      default:
        sortCoursesByOrder()
        break;
    }
  }

  return (
    <DashboardWrapper>
      <div className="__studying_course_page">

        <div className="__course_tabs d-flex justify-content-between align-items-center gap-2 mb-4 mb-md-5">
          <Link to='/dashboard/courses' className={`btn w-100 ${pathname === '/dashboard/courses' ? 'btn-primary' : 'btn-outline-primary'}`}>STUDYING <span className="d-none d-md-inline-block"> COURSES</span></Link>
          <Link to='/dashboard/courses/all' className={`btn w-100 ${pathname === '/dashboard/courses/all' ? 'btn-primary' : 'btn-outline-primary'}`}>ALL COURSES</Link>
        </div>

        <div className="__greetings mb-3 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">Your Courses</h2>
          <div className="input-group w-40 w-md-20">
            <div className='__sort_icon_wrapper input-group-text bg-primary text-light border-2 border-top-0 border-bottom-0 border-start-0 border-light'>
              <BarChart size={'1.1rem'} />
            </div>
            <select onChange={handleSort} value={sortedBy} className="bg-primary text-light border-0 form-control">
              <option value="order" className="cursor-pointer" >Order</option>
              <option value="title" className="cursor-pointer" >Title</option>
              <option value="tutor" className="cursor-pointer" >Tutor</option>
            </select>
          </div>
        </div>

        <div className="__category_image_wrapper mb-4 mb-md-5">
          <img className="__category_image" src={categoryThumbnails[studentStats?.category! ?? 0]} alt="Category" />
        </div>

        <div className="__courses_wrapper">

          <div className="__courses d-flex flex-wrap">
            {
              studentSubscription.status === true ?
                studyingCourses?.length > 0 ?
                  studyingCourses?.map((item, index) => (
                    <CourseItem item={item} isBought={false} isFeatured={false} showProgress={true} clickable={true} key={index} />
                  ))
                  : studentStats.category === 0 ?
                    <div>
                      Choose a studying category <br />
                      <Link to='/dashboard/profile/category' className="btn btn-primary">Choose Category</Link>
                    </div>
                    : <div>No Courses</div>
                : <div>
                  Choose a subscription plan <br />
                  <Link to='/dashboard/profile/subscription' className="btn btn-primary">Subscribe</Link>
                </div>
            }
          </div>
        </div>

      </div>
    </DashboardWrapper>
  )
}