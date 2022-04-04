import { useState } from "react"
import { AlertCircle } from "react-feather"
import { Link, useHistory } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"
import { useAuthStore } from "../../../store/auth"
import { useLoadingModalStore } from "../../../store/loading-modal"
import { useToastStore } from "../../../store/toast"
import { stateToFormData } from "../../../utils"

type verifyDeviceCredentials = {
  device: string,
  token: string
}

export const VerifyDevice: React.FC<{}> = () => {

  const { deviceInfo, resetDevice, verifyDevice } = useAuthStore()
  const { setLoading } = useLoadingModalStore()
  const [credentials, setCredentials] = useState<verifyDeviceCredentials>({
    device: deviceInfo,
    token: ''
  })
  const { toast } = useToastStore()
  const { replace } = useHistory()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    resetDevice(stateToFormData(credentials))
      .then(resp => {
        setLoading(false)

        toast(resp?.message, undefined, resp.status ? 'success' : 'danger')
        if (resp.status) replace('/welcome');

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
                  <h1 className='h1 fw-bold'>Verify Device</h1>
                  <p>You can only use Spicy Guitar Academy on one device. A verification token has been sent to your email to continue with this device.</p>
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
                    <span className="">Didn't get the code?<br /><span className="text-decoration-underline cursor-pointer" onClick={async () => {
                      verifyDevice().then(resp => {
                        toast(resp?.message)
                      })
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