import { PublicPageWrapper } from "../../../components"
import { AlertCircle, Eye, EyeOff } from 'react-feather'
import { useHistory, useLocation } from "react-router-dom"
import { useState } from "react"
import { useAuthStore, useModalStore } from "../../../store"
import { stateToFormData } from "../../../utils"
import { Helmet } from "react-helmet"

type resetPasswordCredentials = {
  email: string
  password: string
  cpassword: string
}

export const ResetPassword: React.FC<{}> = () => {

  const { state: locationState } = useLocation<any>()
  const [credentials, setCredentials] = useState<resetPasswordCredentials>({
    email: locationState.email,
    password: '',
    cpassword: ''
  })
  const [errors, setErrors] = useState<resetPasswordCredentials>({
    email: '',
    password: '',
    cpassword: ''
  })
  const { resetPassword } = useAuthStore()
  const { toast, loading } = useModalStore()
  const { replace } = useHistory()
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword(!showPassword)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loading(true)

    resetPassword(stateToFormData(credentials))
      .then(resp => {
        loading(false)

        toast(resp?.message, undefined, resp?.status ? 'success' : 'danger')
        if (resp?.status) replace('/login')
        else setErrors(resp?.data)
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
          <title>Spicy Guitar Academy | Reset Password</title>
        </Helmet>

        <div className="h-100 w-100 bg-light">
          <div className="container d-flex justify-content-center">
            <div className="w-100 w-md-70 w-lg-50 bg-white p-3 p-md-4 mb-3 mb-md-5 rounded-3 shadow-sm">
              <form method="post" onSubmit={handleSubmit}>
                <div className="text-primary">

                  <div className="text-center mb-2 mb-md-4">
                    <h1 className='h1 fw-bold'>Reset Password</h1>
                    <p>Enter a new password you can remember.</p>
                  </div>

                  <div className="mb-2 mb-md-4">

                    <div className="form-floating">
                      <input onChange={(e) => handleChange('password', e.target.value)} type={showPassword ? 'text' : 'password'} id="password" className="form-control" placeholder="**********" />
                      <label htmlFor="password">New Password</label>

                      <div onClick={toggleShowPassword} className="position-absolute top-50 end-0 translate-middle cursor-pointer">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </div>
                    </div>

                    <small className="text-danger">{errors?.password!}</small>

                  </div>

                  <div className="mb-2 mb-md-4">

                    <div className="form-floating">
                      <input onChange={(e) => handleChange('cpassword', e.target.value)} type={showPassword ? 'text' : 'password'} id="confirmPassword" className="form-control" placeholder="**********" />
                      <label htmlFor="confirmPassword">Comfirm Password</label>

                      <div onClick={toggleShowPassword} className="position-absolute top-50 end-0 translate-middle cursor-pointer">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </div>
                    </div>
                    <small className="text-danger">{errors?.cpassword!}</small>

                    <div className="bg-crea m text-danger px-2 py-1 my-3 border-start border-danger">
                      <AlertCircle size={'17px'} className='me-2' />
                      Password must contain letters, numbers and must contain atleast 8 characters.
                    </div>

                  </div>

                  <div className="mb-2 mb-md-3">
                    <button type="submit" className="btn btn-lg btn-primary form-control mb-3">Reset</button>
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