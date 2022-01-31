import { PublicPageWrapper } from "../../../components"
import { AlertCircle } from 'react-feather'
import { Link } from "react-router-dom"

export const VerifyAccount = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <PublicPageWrapper>
      <div className="h-100 w-100 bg-light">
        <div className="container d-flex justify-content-center">
          <div className="w-lg-50 bg-white p-lg-4 mb-lg-5 rounded-3 shadow-sm">
            <form method="post" onSubmit={handleSubmit}>
              <div className="text-primary">

                <div className="text-center mb-lg-4">
                  <h1 className='h1 fw-bold'>Verify Account</h1>
                  <p>A 6 digit token has been sent to your email address to verify your account.</p>
                </div>

                <div className="mb-lg-4">

                  <div className="form-floating mb-lg-3">
                    <input type="text" maxLength={6} id="authToken" className="form-control mb-lg-2" placeholder="123456" />
                    <label htmlFor="authToken">Authentication Token</label>
                    <small className="text-danger"><AlertCircle size={'18px'} /> If you don't find the mail in your inbox, please check your Spam or Junk folder.</small>
                  </div>

                </div>

                <div className="mb-lg-3">
                  <button type="submit" className="btn btn-lg btn-primary form-control mb-3">Verify</button>
                  <div className="d-flex justify-content-between">
                    <span className="">Didn't get the code? <span className="text-decoration-underline cursor-pointer" onClick={() => { }}>Send again</span></span>
                    <span className="">Need assistance? <Link to='/contact-us'>Contact us</Link></span>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </PublicPageWrapper>
  )
}