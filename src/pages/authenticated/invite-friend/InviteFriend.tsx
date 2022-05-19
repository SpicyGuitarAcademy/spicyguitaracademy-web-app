import { DashboardWrapper } from "../../../components"
import { Link, useHistory } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Shield, UserPlus } from "react-feather";
import { useAuthStore, useModalStore } from "../../../store";
import { domain, stateToFormData } from "../../../utils";
import SpicyUnits from '../../../assets/spicy-unit.svg'
import './style.scss'

export const InviteFriend: React.FC<{}> = () => {

  const { student, requestReferralCode, inviteFriend } = useAuthStore()
  const { toast, loading } = useModalStore()
  const { goBack } = useHistory()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    loading(true, 'Inviting friend...')
    inviteFriend(stateToFormData({ friend: event.target[0].value }))
      .then(resp => {
        loading(false)

        if (resp?.status === true) {
          toast(resp?.message)
          event.target[0].value = ''
        } else {
          toast(resp?.message, undefined, 'danger')
        }
      })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "Learn Guitar With Spicy Guitar Academy.\n\n" +
      "Spicy Guitar Academy is aimed at guiding beginners to fulfill their dream of becoming professional guitar players.\n\n" +
      "Join with the link below\n" +
      `${domain}/register?ref=${student?.referral_code}`
    )
    
    toast("Copied", undefined, 'success')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        url: `${domain}/register?ref=${student?.referral_code}`,
        title: 'Learn Guitar With Spicy Guitar Academy',
        text: 'Spicy Guitar Academy is aimed at guiding beginners to fulfill their dream of becoming professional guitar players.'
      })
    } else {
      toast("Web share is currently not supported on this browser.", undefined, 'danger')
    }
  }

  return (

    <DashboardWrapper>
      <div className="__profile_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Invite a friend
          </h2>
        </div>

        <div className="__spicy_units_wrapper mb-3 d-flex justify-content-between align-items-center">
          <div className="__spicy_units d-flex gap-2 align-items-center">
            <div className="__spicy_unit_icon_wrapper mb-2">
              <img className="__spicy_unit_icon" src={SpicyUnits} alt="Spicy Units" />
            </div>
            <span>{student?.referral_units ?? 0} Spicy Units</span>
          </div>

          <Link to='/dashboard/payment/spicyunits' className="btn btn-sm btn-primary">
            Buy more
          </Link>
        </div>

        <div className="__spicy_units_wrapper mb-5 d-flex justify-content-between align-items-center">
          <div className="__spicy_units d-flex gap-2 align-items-center">
            <Shield size={24} />
            <span>Invitation Code</span>
          </div>

          {
            student?.referral_code! !== "" ?
              <span className="fw-bold">{student?.referral_code!}</span> :
              <button onClick={requestReferralCode} className="btn btn-sm btn-primary">
                Request code
              </button>
          }
        </div>

        <div className="mb-4">
          <p>Hi <b>{student.firstname}</b>, Enter the email address of your friend and we'll send him/her an invitation mail with your invite code.</p>

          Or share your referral link to them <br />

          <div className="position-relative rounded-pill bg-cream my-2 p-3">
            <span className="__invite_link">{domain}/register?ref={student?.referral_code}</span>

            <div className="__share_btns d-flex gap-1 gap-md-2">
              <button onClick={handleCopy} className="btn btn-cream shadow-sm text-primary rounded-pill"><Copy size={20} /></button>
              <button onClick={handleShare} className="btn btn-cream shadow-sm text-primary rounded-pill"><Share2 size={20} /></button>
            </div>

          </div>
        </div>

        <div>
          <p>
            You receive Spicy Units whenever your friend Subscribes or buys a Featured Course. <br />
            You can use your Spicy Units to buy Featured Courses you find interesting.
          </p>
        </div>

        <form method="post" onSubmit={handleSubmit}>

          <div className="mb-4">
            <div className="form-floating mb-3">
              <input type='email' id="email" required className="form-control rounded-0 border-0 border-bottom border-primary border-1 bg-light" placeholder="********" />
              <label htmlFor="email">Email address</label>
            </div>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-lg btn-primary form-control mb-3 d-flex align-items-center justify-content-center">
              <UserPlus size={24} className='me-2' />
              <span>Invite friend</span>
            </button>
          </div>

        </form>

      </div>
    </DashboardWrapper>
  )
}