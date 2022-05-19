import { DashboardWrapper } from "../../../components"
import { useHistory } from "react-router-dom";
import { AlertCircle, ArrowLeft, Eye, EyeOff } from "react-feather";
import './style.scss'
import { useState } from "react";
import { useAuthStore, useModalStore } from "../../../store";
import { stateToFormData } from "../../../utils";

type EditPasswordCredentials = {
  opassword: string
  npassword: string
  cpassword: string
}

export const EditPassword: React.FC<{}> = () => {

  const { updatePassword } = useAuthStore()
  const { toast, loading } = useModalStore()
  const { goBack } = useHistory()
  const [credentials, setCredentials] = useState<EditPasswordCredentials>({
    opassword: '',
    npassword: '',
    cpassword: ''
  })
  const [errors, setErrors] = useState<EditPasswordCredentials>({
    opassword: '',
    npassword: '',
    cpassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    loading(true, 'Updating password...')
    updatePassword(stateToFormData(credentials))
      .then(resp => {
        loading(false)
        if (resp.status === true) {
          toast(resp.message)
          goBack()
        } else {
          toast(resp.message, undefined, 'danger')
          setErrors({
            ...resp?.data,
            npassword: resp?.data?.password
          })
        }
      })
  }

  const handleChange = (input: string, value: string) => {
    setCredentials({ ...credentials, [input]: value })
    setErrors({ ...errors, [input]: '' })
  }

  const toggleShowPassword = () => setShowPassword(!showPassword)

  return (

    <DashboardWrapper>
      <div className="__profile_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Edit Password
          </h2>
        </div>

        <div className="w-100 p-0 p-md-4">
          <form method="post" onSubmit={handleSubmit}>
            <div className="text-primary">

              <div className="mb-5">

                <div className="form-floating mb-3">
                  <input onChange={(e) => handleChange('opassword', e.target.value)} type={showPassword ? 'text' : 'password'} id="opassword" className="form-control rounded-0 border-0 border-bottom border-primary border-1 bg-light" placeholder="********" />
                  <label htmlFor="opassword">Old Password</label>
                  <small className="text-danger">{errors?.opassword!}</small>

                  <div onClick={toggleShowPassword} className="position-absolute top-50 end-0 translate-middle cursor-pointer">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={(e) => handleChange('npassword', e.target.value)} type={showPassword ? 'text' : 'password'} id="npassword" className="form-control rounded-0 border-0 border-bottom border-primary border-1 bg-light" placeholder="********" />
                  <label htmlFor="npassword">New Password</label>
                  <small className="text-danger">{errors?.npassword!}</small>

                  <div onClick={toggleShowPassword} className="position-absolute top-50 end-0 translate-middle cursor-pointer">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={(e) => handleChange('cpassword', e.target.value)} type={showPassword ? 'text' : 'password'} id="cpassword" className="form-control rounded-0 border-0 border-bottom border-primary border-1 bg-light" placeholder="********" />
                  <label htmlFor="cpassword">Confirm Password</label>
                  <small className="text-danger">{errors?.cpassword!}</small>

                  <div onClick={toggleShowPassword} className="position-absolute top-50 end-0 translate-middle cursor-pointer">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>

                <div className="text-danger px-2 py-1 my-3 border-3 border-start border-danger">
                  <AlertCircle size={'17px'} className='me-2' />
                  Password must contain letters, numbers and must contain atleast 8 characters.
                </div>

              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-lg btn-primary form-control mb-3">Update</button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </DashboardWrapper>
  )
}