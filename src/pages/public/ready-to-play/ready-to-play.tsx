import { Link } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"

export const ReadyToPlay = () => {
  return (
    <PublicPageWrapper bgImage='__bg2'>
      <div className='vh-lg-60 w-100'>
        <div className='container h-100'>
          <div className="m-lg-5 h-100 d-flex flex-column justify-content-between align-items-start">

            <div>
              <h1 className='h1 text-secondary mb-lg-5 fw-bold'>Ready to play?</h1>
              <h3 className="h3 text-light">Are you ready to <br />be a professional guitar <br />player?</h3>
            </div>

            <Link className="btn btn-lg mx-lg-2 btn-primary align-self-end" to='/welcome'>Start now &rarr;</Link>

          </div>

        </div>
      </div>
    </PublicPageWrapper>
  )
}