import { PublicPageWrapper } from "../../../components"
import { AlertCircle } from 'react-feather'
import { Link, useHistory, useLocation } from "react-router-dom"
import { useState } from "react"
import { useAuthStore } from "../../../store/auth"
import { useToastStore } from "../../../store/toast"
import { stateToFormData } from "../../../utils"

type verifyAccountCredentials = {
  email: string
  token: string
}

export const VerifyAccount: React.FC<{}> = () => {

  const { state: locationState } = useLocation<any>()
  const [credentials, setCredentials] = useState<verifyAccountCredentials>({
    email: locationState.email,
    token: ''
  })
  const { verifyAccount } = useAuthStore()
  const { toast } = useToastStore()
  const { replace } = useHistory()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    verifyAccount(stateToFormData(credentials))
      .then(resp => {
        console.log(resp)

        if (!resp?.status) {
          toast(resp?.message, undefined, 'danger')
        } else {
          toast(resp?.message)

          replace('/reset-password', {
            email: credentials.email
          })
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
                  <h1 className='h1 fw-bold'>Verify Account</h1>
                  <p>A 6 digit token has been sent to your email address to verify your account.</p>
                </div>

                <div className="mb-lg-4">

                  <div className="form-floating mb-lg-3">
                    <input onChange={(e) => setCredentials({ ...credentials, token: e.target.value })} type="text" maxLength={6} id="authToken" className="form-control mb-lg-2" placeholder="123456" />
                    <label htmlFor="authToken">Authentication Token</label>
                    <small className="text-danger"><AlertCircle size={'18px'} /> If you don't find the mail in your inbox, please check your Spam or Junk folder.</small>
                  </div>

                </div>

                <div className="mb-lg-3">
                  <button type="submit" className="btn btn-lg btn-primary form-control mb-3">Verify</button>
                  <div className="d-flex justify-content-between">
                    <span className="">Didn't get the code?<br /><span className="text-decoration-underline cursor-pointer" onClick={() => {

                    }}>Send again</span></span>
                    <span className="">Need assistance?<br /><Link to='/contact-us'>Contact us</Link></span>
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