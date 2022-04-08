import { Link } from "react-router-dom"
import { PublicPageWrapper } from "../../../components"
import AppHand from '../../../assets/app_hand.svg'
import { useAuthStore } from "../../../store"

export const Welcome: React.FC<{}> = () => {

  const { student } = useAuthStore()

  return (
    <PublicPageWrapper>
      <div className='vh-lg-60 w-100'>
        <div className='container h-100'>
          <div className="m-lg-5 h-100 d-flex justify-content-between align-items-center">

            <div>

              <h1 className='h1 text-primary mb-lg-5'>Hi, {student?.firstname ?? 'Student'}</h1>

              <h1 className='h1 text-primary mb-lg-5 fw-bold'>
                You are welcome to <br />Spicy Guitar Academy.
              </h1>

              <p className="text-grey h4 fw-normal mb-lg-4">
                Spicy Guitar Academy is aimed at guiding beginners to fulfil their dreams of becoming professional guitar players.
              </p>

              <p className="text-grey h4 fw-normal">
                We have the best qualified tutors who are dedicated to help you develop from start to finish to make your dreams come true.
              </p>

            </div>

            <div className="d-flex flex-column align-items-end">

              <img src={AppHand} alt="Spicy Guitar Academy" />

              <Link className="btn btn-lg btn-primary my-lg-3" to='/dashboard'>Continue &rarr;</Link>

            </div>


          </div>

        </div>
      </div>
    </PublicPageWrapper>
  )
}