import { DashboardWrapper } from "../../../components"
import { useHistory } from "react-router-dom";
import { ArrowLeft, PhoneCall } from "react-feather";
import { useAuthStore } from "../../../store";
import SpicyUnits from '../../../assets/spicy-unit.svg'
import './style.scss'

export const BuyMoreUnits: React.FC<{}> = () => {

  const { student } = useAuthStore()
  const { goBack } = useHistory()

  return (

    <DashboardWrapper>
      <div className="__profile_page">

        <div className="__greetings mb-4 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold d-flex align-items-center m-0">
            <button onClick={goBack} className="btn btn-sm btn-muted p-0 me-2">
              <ArrowLeft size={24} className='text-primary' />
            </button>
            Buy more Spicy Units
          </h2>
        </div>

        <div className="__spicy_units_wrapper mb-3 d-flex justify-content-between align-items-center">
          <div className="__spicy_units d-flex gap-2 align-items-center">
            <div className="__spicy_unit_icon_wrapper mb-2">
              <img className="__spicy_unit_icon" src={SpicyUnits} alt="Spicy Units" />
            </div>
            <span>{student?.referral_units ?? 0} Spicy Units</span>
          </div>
        </div>

        <div className="mb-5">
          <ul>
            <li>You get 2% Bonus when you purchase Spicy Units.</li>
            <li>You can purchase Spicy Units with local Bank transfers or USSD Code</li>
            <li>You can purchase Spicy Units with either: Crypto Currency, Chipper Cash, Skrill</li>
            <li>Call or Send a WhatsApp message to any of the numbers below to buy more Spicy Units</li>
          </ul>
        </div>

        <div>
          <PhoneCall className="mb-4" size={40} />

          <ul>
            <li><a href="tel:+2348173165202" target='__blank'>+234 817 316 5202</a></li>
            <li><a href="tel:+2348057809884" target='__blank'>+234 805 780 9884</a></li>
            <li><a href="tel:+2348076159020" target='__blank'>+234 807 615 9020</a></li>
          </ul>

        </div>

      </div>
    </DashboardWrapper>
  )
}