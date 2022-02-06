import { Link } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"

interface LoginProps {
  children: JSX.Element
}

export const LoginPage: React.FC<LoginProps> = () => {

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
                  <h1 className='h1 fw-bold'>Login</h1>
                  <p>Welcome back to Spicy Guitar Academy.</p>
                </div>

                <div className="mb-lg-4">

                  <div className="form-floating mb-lg-3">
                    <input type="email" id="email" className="form-control" placeholder="johnadeniyi@mail.com" />
                    <label htmlFor="email">Email address</label>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input type="password" id="password" className="form-control" placeholder="**********" />
                    <label htmlFor="password">Password</label>
                  </div>

                </div>

                <div className="mb-lg-3">
                  <button type="submit" className="btn btn-lg btn-primary form-control mb-3">Login</button>
                  <div className="d-flex justify-content-between">
                    <span className=""><Link to='/register'>Create account</Link></span>
                    <span className=""><Link to='/forgot-password'>Forgot password</Link></span>
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