import { useState } from "react"
import { AlertCircle } from "react-feather"
import { Link, useHistory } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"
import { useAuthStore } from "../../../store/auth"
import { useLoadingModalStore } from "../../../store/loading-modal"
import { useToastStore } from "../../../store/toast"

type regsterCredentials = {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  cpassword: string,
  telephone: string,
  referral_code: string
}

export const RegisterPage: React.FC<{}> = () => {

  const { signUp } = useAuthStore()
  const [credentials, setCredentials] = useState<regsterCredentials>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cpassword: '',
    telephone: '',
    referral_code: ''
  })
  const [errors, setErrors] = useState<regsterCredentials>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cpassword: '',
    telephone: '',
    referral_code: ''
  })
  const [acceptTC, setAcceptTC] = useState(false)
  const { setLoading } = useLoadingModalStore()
  const { toast } = useToastStore()
  const { replace } = useHistory()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const registerCredentials = new FormData()
    Object.entries(credentials).forEach(([key, value]) => {
      registerCredentials.append(key, value)
    })

    if (!acceptTC) {
      toast('Please accept Terms and Conditions.', undefined, 'danger')
      return
    }

    setLoading(true)
    signUp(registerCredentials)
      .then(resp => {
        setLoading(false)

        if (!resp.status) {
          setErrors(resp.data)
          toast(resp.message, undefined, 'danger')
          return
        }

        toast(resp.message)
        replace('/login')

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
                  <h1 className='h1 fw-bold'>Create Account</h1>
                  <p>Create an account with Spicy Guitar Academy and start learning.</p>
                </div>

                <div className="mb-lg-4">
                  <div className="form-floating mb-lg-3">
                    <input onChange={(e) => handleChange('firstname', e.target.value)} type="text" id="firstName" className="form-control" placeholder="John" />
                    <label htmlFor="firstName">First name</label>
                    <small className="text-danger text-sm">{errors?.firstname!}</small>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input onChange={(e) => handleChange('lastname', e.target.value)} type="text" id="lastName" className="form-control" placeholder="Adeniyi" />
                    <label htmlFor="lastName">Last name</label>
                    <small className="text-danger">{errors?.lastname!}</small>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input onChange={(e) => handleChange('email', e.target.value)} type="email" id="email" className="form-control" placeholder="johnadeniyi@mail.com" />
                    <label htmlFor="email">Email address</label>
                    <small className="text-danger">{errors?.email!}</small>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input onChange={(e) => handleChange('telephone', e.target.value)} type="tel" id="telephone" className="form-control" placeholder="+234" />
                    <label htmlFor="telephone">Telephone</label>
                    <small className="text-danger">{errors?.telephone!}</small>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input onChange={(e) => handleChange('password', e.target.value)} type="password" id="password" className="form-control" placeholder="**********" />
                    <label htmlFor="password">Password</label>
                    <small className="text-danger">{errors?.password!}</small>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input onChange={(e) => handleChange('cpassword', e.target.value)} type="password" id="confirmPassword" className="form-control" placeholder="**********" />
                    <label htmlFor="confirmPassword">Comfirm Password</label>
                    <small className="text-danger">{errors?.cpassword!}</small>

                    <div className="bg-crea m text-danger px-2 py-1 my-3 border-start border-danger">
                      <AlertCircle size={'17px'} className='me-2' />
                      Password must contain letters, numbers and must contain atleast 8 characters.
                    </div>
                  </div>

                  <div className="form-floating mb-lg-3">
                    <input onChange={(e) => handleChange('referral_code', e.target.value)} type="text" id="inviteCode" className="form-control" placeholder="123456" maxLength={6} />
                    <label htmlFor="inviteCode">Invite code (optional)</label>
                  </div>

                  <div className="mb-lg-3">
                    <input onChange={(e) => setAcceptTC(e.target.checked)} type="checkbox" id="agreedToTermsAndConditions" className="form-check-input text-primary" />
                    <label htmlFor="agreedToTermsAndConditions" className="ms-lg-2">I have carefully read and agreed to the <a target='__blank' className="text-primary" href='https://spicyguitaracademy.com/terms'>Terms and Conditions</a></label>
                  </div>
                </div>

                <div className="mb-lg-3 d-flex flex-column">
                  <button type="submit" className="btn btn-lg btn-primary form-control mb-3">Create Account</button>
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