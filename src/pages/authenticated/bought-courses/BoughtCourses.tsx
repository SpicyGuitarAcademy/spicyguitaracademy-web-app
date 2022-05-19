import { CourseItem, DashboardWrapper } from "../../../components"
import { useCourseStore } from "../../../store"
import { Link, useLocation } from "react-router-dom";
import { categoryThumbnails } from "../../../utils";
import { BarChart } from "react-feather";
import './style.scss'

export const BoughtCourses: React.FC<{}> = () => {

  const { boughtCourses, sortedBy, sortCoursesByOrder, sortCoursesByTitle, sortCoursesByTutor } = useCourseStore()
  const { pathname } = useLocation()

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
          <Link to='/dashboard/courses/bought' className={`btn w-100 ${pathname === '/dashboard/courses/bought' ? 'btn-primary' : 'btn-outline-primary'}`}>BOUGHT COURSES</Link>
          <Link to='/dashboard/courses/featured' className={`btn w-100 ${pathname === '/dashboard/courses/featured' ? 'btn-primary' : 'btn-outline-primary'}`}>FEATURED COURSES</Link>
        </div>

        <div className="__greetings mb-3 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">Bought Courses</h2>
          <div className="input-group w-40 w-md-20">
            <div className='__sort_icon_wrapper input-group-text bg-primary text-light border-2 border-top-0 border-bottom-0 border-start-0 border-light'>
              <BarChart size={'1.1rem'} />
            </div>
            <select onChange={handleSort} value={sortedBy} className="bg-primary text-light border-0 form-control w-md-20">
              <option value="order" className="cursor-pointer" >Order</option>
              <option value="title" className="cursor-pointer" >Title</option>
              <option value="tutor" className="cursor-pointer" >Tutor</option>
            </select>
          </div>
        </div>

        <div className="__category_image_wrapper mb-4 mb-md-5">
          <img className="__category_image" src={categoryThumbnails[0]} alt="Category" />
        </div>

        <div className="__courses_wrapper">

          <div className="__courses d-flex flex-wrap">
            {
              boughtCourses?.length > 0 ?
                boughtCourses?.map((item, index) => (
                  <CourseItem item={item} isBought={true} isFeatured={false} showProgress={true} clickable={true} key={index} />
                ))
                : <div>No Courses</div>
            }
          </div>
        </div>

      </div>
    </DashboardWrapper>
  )
}
