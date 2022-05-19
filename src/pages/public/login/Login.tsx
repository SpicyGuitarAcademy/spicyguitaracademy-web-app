import { useState } from "react"
import { Eye, EyeOff } from "react-feather"
import { Helmet } from "react-helmet"
import { Link, useHistory } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"
import { useAuthStore, useModalStore } from "../../../store"
import { domain, stateToFormData } from "../../../utils"

type loginCredentials = {
  email: string,
  password: string
}

export const Login: React.FC<{}> = () => {

  const { signIn, verifyDevice } = useAuthStore()
  const { loading, toast } = useModalStore()
  const { replace } = useHistory()
  const [credentials, setCredentials] = useState<loginCredentials>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<loginCredentials>({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword(!showPassword)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const loginCredentials = stateToFormData(credentials)
    loading(true)

    signIn(loginCredentials)
      .then(async resp => {
        loading(false)

        if (!resp.status) {
          setErrors(resp.data)
          toast(resp.message, undefined, 'danger')
          return
        }

        toast(resp.message)

        const deviceResp = await verifyDevice()
        if (!deviceResp?.status) {
          toast(deviceResp?.message, undefined, 'danger')
          replace('/verify-device')
        } else {
          if (resp?.data?.status !== 'active') {
            replace('/verify-account', {
              email: useAuthStore.getState().student?.email
            })
          } else {
            replace('/welcome')
          }
        }

      })
  }

  const handleChange = (input: string, value: string) => {
    setCredentials({ ...credentials, [input]: value })
    setErrors({ ...errors, [input]: '' })
  }

  return (
    <PublicPageWrapper>
      <>

        <Helmet>
          <meta charSet="utf-8" />
          <title>Spicy Guitar Academy | Login</title>
          <link rel="canonical" href={`${domain}/login`} />
          <meta name="description" content="Welcome back to Spicy Guitar Academy. Login to continue learning." />
        </Helmet>

        <div className="h-100 w-100 bg-light">
          <div className="container d-flex justify-content-center">
            <div className="w-100 w-md-70 w-lg-50 bg-white p-3 p-md-4 mb-3 mb-md-5 rounded-3 shadow-sm">
              <form method="post" onSubmit={handleSubmit}>
                <div className="text-primary">

                  <div className="text-center mb-3 mb-md-4">
                    <h1 className='h1 fw-bold'>Login</h1>
                    <p>Welcome back to Spicy Guitar Academy.</p>
                  </div>

                  <div className="mb-3 mb-md-4">

                    <div className="form-floating mb-2 mb-md-3">
                      <input onChange={(e) => handleChange('email', e.target.value)} type="email" id="email" className="form-control" placeholder="johnadeniyi@mail.com" />
                      <label htmlFor="email">Email address</label>
                    </div>

                    <div className="form-floating mb-2 mb-md-3">
                      <input onChange={(e) => handleChange('password', e.target.value)} type={showPassword ? 'text' : 'password'} id="password" className="form-control" placeholder="**********" />
                      <label htmlFor="password">Password</label>

                      <div onClick={toggleShowPassword} className="position-absolute top-50 end-0 translate-middle cursor-pointer">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </div>
                    </div>

                  </div>

                  <div className="mb-2 mb-md-3">
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

      </>
    </PublicPageWrapper>
  )
}