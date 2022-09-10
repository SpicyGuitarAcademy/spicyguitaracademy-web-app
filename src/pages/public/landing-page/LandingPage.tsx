import { useEffect } from "react"
import { Helmet } from "react-helmet"
import { Link, useHistory } from "react-router-dom"
import { CourseItem, LessonItem, PublicPageWrapper } from "../../../components"
import { useAuthStore, useCourseStore, useLessonStore, useModalStore } from "../../../store"
import { domain } from "../../../utils"

export const LandingPage: React.FC<{}> = () => {

  const { auth, student, signOut, verifyDevice } = useAuthStore()
  const { replace } = useHistory()
  const { loading } = useModalStore()
  const { getFeaturedCourses } = useCourseStore()
  const { getAllLessons } = useLessonStore()

  const getRandomLessons = () => {
    if (useLessonStore.getState().allLessons.length > 50) {
      let rand = Math.floor((Math.random() * (useLessonStore.getState().allLessons.length - 50)) + 1);
      return useLessonStore.getState().allLessons.slice(rand, rand + 50)
    } else {
      return useLessonStore.getState().allLessons
    }
  }

  useEffect(() => {
    getFeaturedCourses()
    getAllLessons()
  }, [getFeaturedCourses, getAllLessons])

  const handleLogout = async () => {
    signOut()
    getFeaturedCourses()
    getAllLessons()
  }

  const handleContinueAsStudent = async () => {
    loading(true)
    verifyDevice()
      .then(async resp => {
        loading(false)
        if (resp.status) {
          if (!auth?.status) {
            replace('/verify-account', {
              email: student?.email
            })
          } else {
            replace('/welcome')
          }
        } else {
          replace('/verify-device')
        }
      })
  }

  return (
    <PublicPageWrapper bgImage='__bg1'>
      <>

        <Helmet>
          <meta charSet="utf-8" />
          <title>Spicy Guitar Academy</title>
          <link rel="canonical" href={`${domain}/`} />
          <meta name="description" content="Spicy Guitar Academy is aimed at guiding beginners to fulfil their dreams of becoming professional guitar players.
        We have the best qualified tutors who are dedicated to help you develop from start to finish to make your dreams come true." />
        </Helmet>

        <div className="container">

          <div className='h-100 w-100 d-flex flex-column gap-4 justify-content-center align-items-start'>

            <div className='w-100 d-flex flex-column justify-content-center align-items-center mb-2 mb-lg-4'>
              <p className='h1 text-cream fw-bold text-center'>Hi, Welcome to Spicy Guitar Academy.</p>

              {
                auth?.authenticated ?
                  <div>
                    <button onClick={handleContinueAsStudent} className="btn btn-lg mx-1 mx-lg-2 btn-primary">Continue as {student?.firstname}</button>
                    <button onClick={handleLogout} className="btn btn-lg mx-1 mx-lg-2 btn-outline-light px-lg-5">Logout</button>
                  </div>
                  :
                  <div>
                    <Link className="btn btn-lg mx-1 mx-lg-2 btn-primary" to='/register'>Create account</Link>
                    <Link className="btn btn-lg mx-1 mx-lg-2 btn-outline-light px-lg-5" to='/login'>Login</Link>
                  </div>
              }

            </div>

            <div className="mb-lg-4 w-100">
              <h3 className="text-cream fw-bold">Featured Courses</h3>
              <div className="w-100 overflow-auto d-flex justify-content-start align-items-start">
                {
                  useCourseStore.getState().featuredCourses.length > 0 ?
                    useCourseStore.getState().featuredCourses.map((course, index) => (
                      <CourseItem key={index} item={course} isFromLandingPage={true} isFromLandingPageHandler={handleContinueAsStudent} showProgress={false} isBought={false} clickable={false} isFeatured={true} />
                    ))
                    : 'Loading...'
                }
              </div>
            </div>

            <div className="mb-lg-4 w-100">
              <h3 className="text-cream fw-bold">Lessons</h3>
              <div className="w-100 overflow-auto d-flex justify-content-start align-items-start">
                {
                  getRandomLessons().length > 0 ?
                    getRandomLessons().map((course, index) => (
                      <LessonItem key={index} showOrder={false} isFromLandingPage={true} isFromLandingPageHandler={handleContinueAsStudent} fromFreeLessons={true} tutorialLessons={[]} item={course} isBought={false} clickable={false} />
                    ))
                    : 'Loading...'
                }
              </div>
            </div>

          </div>

        </div>

      </>
    </PublicPageWrapper >
  )
}