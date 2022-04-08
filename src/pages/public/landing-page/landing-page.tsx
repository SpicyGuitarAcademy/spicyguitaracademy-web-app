import { Link, useHistory } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"
import { useAuthStore, useLoadingModalStore } from "../../../store"

export const LandingPage: React.FC<{}> = () => {

  const { auth, student, signOut, verifyDevice } = useAuthStore()
  const { replace } = useHistory()
  const { setLoading } = useLoadingModalStore()

  const handleLogout = async () => {
    signOut()
  }

  const handleContinueAsStudent = async () => {
    setLoading(true)
    verifyDevice()
      .then(resp => {
        setLoading(false)
        if (resp.status) {
          replace('/welcome')
        } else {
          replace('/verify-device')
        }
      })
  }

  return (
    <PublicPageWrapper bgImage='__bg1'>
      <div className='h-60 w-100 d-flex justify-content-center align-items-center'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <p className='h1 text-cream mb-lg-5 fw-bold'>Hi, Welcome to Spicy Guitar Academy.</p>

          {
            auth?.authenticated ?
              <div>
                <button onClick={handleContinueAsStudent} className="btn btn-lg mx-lg-2 btn-primary">Continue as {student?.firstname}</button>
                <button onClick={handleLogout} className="btn btn-lg mx-lg-2 btn-outline-light px-lg-5">Logout</button>
              </div>
              :
              <div>
                <Link className="btn btn-lg mx-lg-2 btn-primary" to='/register'>Create account</Link>
                <Link className="btn btn-lg mx-lg-2 btn-outline-light px-lg-5" to='/login'>Login</Link>
              </div>
          }
        </div>
      </div>
    </PublicPageWrapper>
  )
}