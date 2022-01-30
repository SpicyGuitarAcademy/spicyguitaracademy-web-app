import { Link } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"

export const WelcomePage = () => {
  return (
    <PublicPageWrapper bgImage='__bg1'>
      <div className='h-100 d-flex justify-content-center align-items-center my-lg-5'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <p className='h1 text-cream mb-lg-5 fw-bold'>Hi, Welcome to Spicy Guitar Academy.</p>
          <div>
            <Link className="btn btn-lg mx-lg-2 btn-primary" to='/register'>Create account</Link>
            <Link className="btn btn-lg mx-lg-2 btn-outline-light px-lg-5" to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </PublicPageWrapper>
  )
}