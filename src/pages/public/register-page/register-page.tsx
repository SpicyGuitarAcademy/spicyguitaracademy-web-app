import { Link } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"

export const RegisterPage = () => {

  const handleSubmit = (e: React.FormEvent) => {

  }

  return (
    <PublicPageWrapper>
      <div className="h-100 w-100 bg-light">
        <div className="container d-flex justify-content-center">
          <div className="w-lg-50 bg-white p-lg-4 mb-lg-5 rounded-3 shadow-sm">
            <form method="post" onSubmit={handleSubmit}>
              <div className="text-primary">

                <div className="text-center mb-lg-4">
                  <h1 className='h1 fw-bold'>Create Account</h1>
                  <p>Create an account with Spicy Guitar Academy and start learning.</p>
                </div>

                <div className="mb-lg-4">
                  <div className="form-floating mb-lg-3">
                    <input type="text" id="firstName" className="form-control" placeholder="John" />
                    <label htmlFor="firstName">First name</label>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input type="text" id="lastName" className="form-control" placeholder="Adeniyi" />
                    <label htmlFor="lastName">Last name</label>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input type="email" id="email" className="form-control" placeholder="johnadeniyi@mail.com" />
                    <label htmlFor="email">Email address</label>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input type="tel" id="telephone" className="form-control" placeholder="+234" />
                    <label htmlFor="telephone">Telephone</label>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input type="password" id="password" className="form-control" placeholder="**********" />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input type="password" id="confirmPassword" className="form-control" placeholder="**********" />
                    <label htmlFor="confirmPassword">Comfirm Password</label>
                    <span className="text-danger">Password must contain letters, numbers and must contain atleast 8 characters.</span>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input type="text" id="inviteCode" className="form-control" placeholder="123456" maxLength={6} />
                    <label htmlFor="inviteCode">Invite code (optional)</label>
                  </div>

                  <div className="mb-lg-3">
                    <input type="checkbox" id="agreedToTermsAndConditions" className="form-check-input text-primary" />
                    <label htmlFor="agreedToTermsAndConditions" className="ms-lg-2">I have carefully read and agreed to the <a target='__blank' className="text-primary" href='https://spicyguitaracademy.com/terms'>Terms and Conditions</a></label>
                  </div>
                </div>

                <div className="mb-lg-3 d-flex flex-column">
                  <button className="btn btn-lg btn-primary form-control mb-3">Create Account</button>
                  <span className="align-self-center">Already have an account? <Link to='/login'>Login</Link>.</span>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </PublicPageWrapper>
  )
}