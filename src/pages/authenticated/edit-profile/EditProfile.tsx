import { DashboardWrapper } from "../../../components"
import { useHistory } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import './style.scss'
import { useState } from "react";
import { useAuthStore, useModalStore } from "../../../store";
import { stateToFormData } from "../../../utils";

type EditProfileCredentials = {
  firstname: string
  lastname: string
  telephone: string
}

export const EditProfile: React.FC<{}> = () => {

  const { student, updateProfile } = useAuthStore()
  const { toast, loading } = useModalStore()
  const { goBack } = useHistory()
  const [credentials, setCredentials] = useState<EditProfileCredentials>({
    firstname: student?.firstname!,
    lastname: student?.lastname!,
    telephone: student?.telephone!
  })
  const [errors, setErrors] = useState<EditProfileCredentials>({
    firstname: '',
    lastname: '',
    telephone: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    loading(true, 'Updating profile...')
    updateProfile(stateToFormData(credentials))
      .then(resp => {
        loading(false)
        if (resp.status === true) {
          toast(resp.message)
          goBack()
        } else {
          toast(resp.message, undefined, 'danger')
        }
      })
  }

  const handleChange = (input: string, value: string) => {
    setCredentials({ ...credentials, [input]: value })
    setErrors({ ...errors, [input]: '' })
  }

  return (

    <DashboardWrapper>
      <div className="__profile_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Edit Profile
          </h2>
        </div>

        <div className="w-100 p-0 p-md-4">
          <form method="post" onSubmit={handleSubmit}>
            <div className="text-primary">

              <div className="mb-5">

                <div className="form-floating mb-3">
                  <input onChange={(e) => handleChange('firstname', e.target.value)} type="text" id="firstname" className="form-control rounded-0 border-0 border-bottom border-primary border-1 bg-light" placeholder="John" value={credentials?.firstname} />
                  <label htmlFor="firstname">First Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={(e) => handleChange('lastname', e.target.value)} type="text" id="lastname" className="form-control rounded-0 border-0 border-bottom border-primary border-1 bg-light" placeholder="Doe" value={credentials?.lastname} />
                  <label htmlFor="lastname">Last Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input onChange={(e) => handleChange('telephone', e.target.value)} type="tel" id="telephone" className="form-control rounded-0 border-0 border-bottom border-primary border-1 bg-light" placeholder="+234..." value={credentials?.telephone} />
                  <label htmlFor="telephone">Telephone</label>
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