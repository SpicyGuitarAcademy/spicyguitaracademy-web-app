import { CourseItem, DashboardWrapper } from "../../../components"
import { useCourseStore } from "../../../store"
import { Link, useLocation } from "react-router-dom";
import './style.scss'
import { useState } from "react";
import { categoryThumbnails } from "../../../utils";
import { BarChart } from "react-feather";

export const AllCourses: React.FC<{}> = () => {

  const { pathname } = useLocation()
  const [selectedCategory, setSelectedCategory] = useState(1)
  const { allCourses, sortedBy, sortCoursesByOrder, sortCoursesByTitle, sortCoursesByTutor } = useCourseStore()

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

  const CourseList = () => {
    switch (selectedCategory) {
      case 1:
        return (
          allCourses?.beginner?.length! > 0 ?
            allCourses?.beginner?.map((item, index) => (
              <CourseItem clickable={false} isBought={false} isFeatured={false} showProgress={false} item={item} key={index} />
            ))
            : <div>No Courses</div>
        )
      case 2:
        return (
          allCourses?.amateur?.length! > 0 ?
            allCourses?.amateur?.map((item, index) => (
              <CourseItem clickable={false} isBought={false} isFeatured={false} showProgress={false} item={item} key={index} />
            ))
            : <div>No Courses</div>
        )
      case 3:
        return (
          allCourses?.intermediate?.length! > 0 ?
            allCourses?.intermediate?.map((item, index) => (
              <CourseItem clickable={false} isBought={false} isFeatured={false} showProgress={false} item={item} key={index} />
            ))
            : <div>No Courses</div>
        )
      case 4:
        return (
          allCourses?.advanced?.length! > 0 ?
            allCourses?.advanced?.map((item, index) => (
              <CourseItem clickable={false} isBought={false} isFeatured={false} showProgress={false} item={item} key={index} />
            ))
            : <div>No Courses</div>
        )
      default:
        return (
          <div>No Courses</div>
        )
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
          <h2 className="fw-bold">Find Amazing Courses</h2>
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

        <div className="__category_menu mb-3 d-flex justify-content-between align-items-center w-100 overflow-auto">
          <div onClick={() => setSelectedCategory(1)} className={`btn btn-muted p-0 ${selectedCategory === 1 ? 'text-primary' : 'text-grey'} fw-bold`}>Beginner</div>
          <div onClick={() => setSelectedCategory(2)} className={`btn btn-muted p-0 ${selectedCategory === 2 ? 'text-primary' : 'text-grey'} fw-bold`}>Amateur</div>
          <div onClick={() => setSelectedCategory(3)} className={`btn btn-muted p-0 ${selectedCategory === 3 ? 'text-primary' : 'text-grey'} fw-bold`}>Intermediate</div>
          <div onClick={() => setSelectedCategory(4)} className={`btn btn-muted p-0 ${selectedCategory === 4 ? 'text-primary' : 'text-grey'} fw-bold`}>Advanced</div>
        </div>

        <div className="__category_image_wrapper mb-4 mb-md-5">
          <img className="__category_image" src={categoryThumbnails[selectedCategory]} alt="Category" />
        </div>

        <div className="__courses_wrapper">

          <div className="__courses d-flex flex-wrap">
            {CourseList()}
          </div>
        </div>

      </div>
    </DashboardWrapper>
  )
}