import { useState } from "react"
import { Helmet } from "react-helmet"
import { useHistory } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"
import { useAuthStore, useModalStore } from "../../../store"
import { domain, stateToFormData } from "../../../utils"

type forgetPasswordCredentials = {
  email: string
}

export const ForgotPassword: React.FC<{}> = () => {

  const [credentials, setCredentials] = useState<forgetPasswordCredentials>({
    email: ''
  })
  const { forgotPassword } = useAuthStore()
  const { toast, loading } = useModalStore()
  const { replace } = useHistory()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    loading(true)
    forgotPassword(stateToFormData(credentials))
      .then(resp => {
        loading(false)
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
      <>

        <Helmet>
          <meta charSet="utf-8" />
          <title>Spicy Guitar Academy | Forgot Password</title>
          <link rel="canonical" href={`${domain}/forgot-password`} />
          <meta name="description" content="Have you forgotten your login details? Enter your email address to reset your account." />
        </Helmet>

        <div className="h-100 w-100 bg-light">
          <div className="container d-flex justify-content-center">
            <div className="w-100 w-md-70 w-lg-50 bg-white p-3 p-md-4 mb-3 mb-md-5 rounded-3 shadow-sm">
              <form method="post" onSubmit={handleSubmit}>
                <div className="text-primary">

                  <div className="text-center mb-3 mb-md-4">
                    <h1 className='h1 fw-bold'>Forgot Password</h1>
                    <p>Enter your email address to reset your account.</p>
                  </div>

                  <div className="mb-3 mb-md-4">

                    <div className="form-floating mb-2 mb-md-3">
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

      </>
    </PublicPageWrapper>
  )
}