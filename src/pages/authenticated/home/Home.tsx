import { DashboardWrapper, LessonItem } from "../../../components"
import { useAuthStore, useLessonStore, useStudentStatsStore, useSubscriptionStore } from "../../../store"
import DefaultCategoryImage from '../../../assets/default-category-image.jpg';
import SpicyUnits from '../../../assets/spicy-unit.svg'
import { Link } from "react-router-dom";
import { ArrowRight, Bookmark } from "react-feather";
import './style.scss'

export const Home: React.FC<{}> = () => {

  const { student } = useAuthStore()
  const { studentSubscription } = useSubscriptionStore()
  const { studentStats } = useStudentStatsStore()
  const { freeLessons } = useLessonStore()

  return (
    <DashboardWrapper>
      <div className="__home_page">
        <div className="__greetings mb-3">
          <h2 className="fw-bold">Hi, {student?.firstname}</h2>
          <h4 className="text-dark">welcome</h4>
        </div>

        <div className="__category_image_wrapper mb-3">
          <img className="__category_image" src={DefaultCategoryImage} alt="Category" />
        </div>

        <div className={`__subscription_and_category`}>
          {
            studentSubscription?.status === true ?
              <div className="mb-3">
                <h6 className="fw-bold">Subscription</h6>
                <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <Bookmark size={24} className='text-secondary me-2' />
                    <span>
                      {studentSubscription?.planLabel} Subscription Plan
                    </span>
                  </div>
                  <div>{studentSubscription?.days} day{studentSubscription?.days > 1 ? 's' : ''} remaining</div>
                </div>
              </div>
              :
              <Link to='/dashboard/profile/subscription' className="btn btn-primary w-100  mb-3">
                Choose Subscription Plan
                <ArrowRight className="ms-2" size={16} />
              </Link>
          }

          {
            studentStats?.category !== 0 ?
              <div className="mb-3">
                <h6 className="fw-bold">
                  {studentStats?.viewingPrevious && 'Previous '} Category
                </h6>
                <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <Bookmark size={24} className='text-secondary me-2' />
                    <span>
                      {studentStats?.categoryLabel}
                    </span>
                  </div>
                  <div>{Math.floor((studentStats.takenLessons! / studentStats.allLessons!) * 100)}% Completed</div>
                </div>
              </div>
              :
              <Link to='/dashboard/profile/category' className="btn btn-primary w-100 mb-3">
                Choose a Category
                <ArrowRight className="ms-2" size={16} />
              </Link>
          }
        </div>

        <div className="__spicy_units_wrapper mb-3 d-flex justify-content-between align-items-center">
          <div className="__spicy_units d-flex gap-2 align-items-center">
            <div className="__spicy_unit_icon_wrapper mb-1">
              <img className="__spicy_unit_icon" src={SpicyUnits} alt="Spicy Units" />
            </div>
            <span>{student?.referral_units ?? 0} Spicy Units</span>
          </div>

          <Link to='/dashboard/payment/spicyunits' className="btn btn-primary">
            Buy more
          </Link>
        </div>

        <div className="__free_lessons_wrapper">
          <h3 className="mb-2 fw-bold">FREE LESSONS</h3>

          <div className="__free_lessons d-flex flex-wrap">
            {
              freeLessons?.length > 0 &&
              freeLessons?.map((item, index) => (
                <LessonItem isBought={false} fromFreeLessons={true} tutorialLessons={freeLessons} clickable={true} showOrder={false} item={item} key={index} />
              ))
            }
          </div>
        </div>

      </div>
    </DashboardWrapper>
  )
}