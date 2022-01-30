import { Link } from 'react-router-dom';
import SpicyGuitarLogo from '../../assets/spicyguitaracademy_logo.svg';
import './style.scss'

export const PublicPageWrapper = ({ children, bgImage }: { children: JSX.Element, bgImage?: string }) => {

  return (
    <div className='bg-light'>
      <div className={`vh-100 w-100 __page_wrapper ${bgImage ?? ''}`}>
        <header className='vh-lg-20 w-100'>
          <div className='container h-100 w-100 d-flex justify-content-start align-items-center'>
            <Link to='/welcome'>
              <img src={SpicyGuitarLogo} alt="Spicy Guitar Academy" className='__logo' />
            </Link>
          </div>
        </header>

        <div className='w-100'>
          {children}
        </div>

      </div>
    </div>
  )
}