import { PublicPageWrapper } from "../../../components"
import { AlertCircle } from 'react-feather'
import { useHistory, useLocation } from "react-router-dom"
import { useState } from "react"
import { useAuthStore } from "../../../store/auth"
import { useToastStore } from "../../../store/toast"
import { stateToFormData } from "../../../utils"
import { useLoadingModalStore } from "../../../store/loading-modal"

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
  const { toast } = useToastStore()
  const { replace } = useHistory()
  const { setLoading } = useLoadingModalStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    resetPassword(stateToFormData(credentials))
      .then(resp => {
        setLoading(false)

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
      <div className="h-100 w-100 bg-light">
        <div className="container d-flex justify-content-center">
          <div className="w-lg-50 bg-white p-lg-4 mb-lg-5 rounded-3 shadow-sm">
            <form method="post" onSubmit={handleSubmit}>
              <div className="text-primary">

                <div className="text-center mb-lg-4">
                  <h1 className='h1 fw-bold'>Reset Password</h1>
                  <p>Enter a new password you can remember.</p>
                </div>

                <div className="mb-lg-4">

                  <div className="form-floating mb-lg-3">
                    <input onChange={(e) => handleChange('password', e.target.value)} type="password" id="password" className="form-control" placeholder="**********" />
                    <label htmlFor="password">New Password</label>
                    <small className="text-danger">{errors?.password!}</small>
                  </div>

                </div>

                <div className="mb-lg-4">

                  <div className="form-floating mb-lg-3">
                    <input onChange={(e) => handleChange('cpassword', e.target.value)} type="password" id="confirmPassword" className="form-control" placeholder="**********" />
                    <label htmlFor="confirmPassword">Comfirm Password</label>
                    <small className="text-danger">{errors?.cpassword!}</small>

                    <div className="bg-crea m text-danger px-2 py-1 my-3 border-start border-danger">
                      <AlertCircle size={'17px'} className='me-2' />
                      Password must contain letters, numbers and must contain atleast 8 characters.
                    </div>
                  </div>

                </div>

                <div className="mb-lg-3">
                  <button type="submit" className="btn btn-lg btn-primary form-control mb-3">Reset</button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </PublicPageWrapper>
  )
}