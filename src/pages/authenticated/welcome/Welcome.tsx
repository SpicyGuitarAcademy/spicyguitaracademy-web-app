import { useHistory } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"
import AppHand from '../../../assets/app-hand.svg'
import { useAuthStore, useCourseStore, useForumStore, useLessonStore, useModalStore, useNotificationStore, useStudentStatsStore, useSubscriptionStore } from "../../../store"
import { ArrowRight } from "react-feather"

export const Welcome: React.FC<{}> = () => {

  const { student } = useAuthStore()
  const { push } = useHistory()
  const { loading } = useModalStore()
  const { getSubscriptionStatus, getSubscriptionPlans } = useSubscriptionStore()
  const { getStudentCategoryAndStats } = useStudentStatsStore()
  const { getAllCourses, getStudyingCourses, getFeaturedCourses, getBoughtCourses } = useCourseStore()
  const { getFreeLessons } = useLessonStore()
  const { getNotifications } = useNotificationStore()
  const { getForumMessages } = useForumStore()

  const handleContinue = async () => {

    loading(true)

    await getSubscriptionStatus()
    await getStudentCategoryAndStats()
    await getSubscriptionPlans()

    await getAllCourses()

    // if (studentSubscription?.status === true && studentStats?.category !== 0)
    await getStudyingCourses()

    await getFeaturedCourses()
    await getBoughtCourses()

    await getFreeLessons()

    await getNotifications()

    await getForumMessages()

    loading(false)
    push('/dashboard')

  }

  const ContinueBtn = () => (
    <button onClick={handleContinue} className="btn btn-lg btn-primary my-md-3">
      Continue <ArrowRight size={24} />
    </button>
  )

  return (
    <PublicPageWrapper>
      <div className='vh-md-60 w-100'>
        <div className='container h-100'>
          <div className="m-md-5 h-100 d-flex justify-content-between align-items-center">

            <div>

              <h1 className='h1 text-primary mb-5'>Hi, {student?.firstname ?? 'Student'}</h1>

              <h1 className='h1 text-primary mb-5 fw-bold'>
                You are welcome to <br />Spicy Guitar Academy.
              </h1>

              <p className="text-grey h4 fw-normal mb-4">
                Spicy Guitar Academy is aimed at guiding beginners to fulfil their dreams of becoming professional guitar players.
              </p>

              <p className="text-grey h4 fw-normal mb-5">
                We have the best qualified tutors who are dedicated to help you develop from start to finish to make your dreams come true.
              </p>

              <div className="d-flex justify-content-end d-lg-none">
                <ContinueBtn />
              </div>

            </div>

            <div className="d-none d-lg-flex flex-column align-items-end">

              <img src={AppHand} alt="Spicy Guitar Academy" />

              <ContinueBtn />

            </div>


          </div>

        </div>
      </div>
    </PublicPageWrapper>
  )
}