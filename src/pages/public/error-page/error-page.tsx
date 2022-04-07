import { Link, useHistory } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"

export const ErrorPage: React.FC<{}> = () => {

  const { goBack } = useHistory()

  return (
    <PublicPageWrapper bgImage='__bg1'>
      <div className='h-60 w-100 d-flex justify-content-center align-items-center'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div className="text-warning mb-lg-4 d-flex flex-column align-items-center justify-content-start">
            <p className='h1 fw-bold'>Wrong Page!</p>
            <p className='text-light'>You appear to be on the wrong page.</p>
          </div>
          <div className="text-light">
            <span onClick={() => goBack()} className="text-light text-decoration-underline cursor-pointer" >Go Back</span> or <Link className="text-light" to='/'>Return Home</Link>
          </div>
        </div>
      </div>
    </PublicPageWrapper>
  )
}