import { useState } from "react"
import { useHistory } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"
import { useAuthStore, useLoadingModalStore, useToastStore } from "../../../store"
import { stateToFormData } from "../../../utils"

type forgetPasswordCredentials = {
  email: string
}

export const ForgotPassword: React.FC<{}> = () => {

  const [credentials, setCredentials] = useState<forgetPasswordCredentials>({
    email: ''
  })
  const { forgotPassword } = useAuthStore()
  const { toast } = useToastStore()
  const { replace } = useHistory()
  const { setLoading } = useLoadingModalStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    forgotPassword(stateToFormData(credentials))
      .then(resp => {
        setLoading(false)
        if (resp?.status) {
          toast(resp.message)

          replace('/verify-account', {
            forgotPassword: true,
            email: credentials.email
          })
        } else {
          toast(resp.message, undefined, 'danger')
        }
      })
  }

  return (
    <PublicPageWrapper>
      <div className="h-100 w-100 bg-light">
        <div className="container d-flex justify-content-center">
          <div className="w-lg-50 bg-white p-lg-4 mb-lg-5 rounded-3 shadow-sm">
            <form method="post" onSubmit={handleSubmit}>
              <div className="text-primary">

                <div className="text-center mb-lg-4">
                  <h1 className='h1 fw-bold'>Forgot Password</h1>
                  <p>Enter your email address to reset your account.</p>
                </div>

                <div className="mb-lg-4">

                  <div className="form-floating mb-lg-3">
                    <input onChange={(e) => setCredentials({ email: e.target.value })} type="email" id="email" className="form-control" placeholder="johnadeniyi@mail.com" />
                    <label htmlFor="email">Email address</label>
                  </div>

                </div>

                <div className="">
                  <button type="submit" className="btn btn-lg btn-primary form-control">Reset your account</button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </PublicPageWrapper>
  )
}