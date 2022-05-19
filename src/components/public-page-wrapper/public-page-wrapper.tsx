import { Link } from 'react-router-dom';
import SpicyGuitarLogo from '../../assets/spicyguitaracademy-logo.svg';
import './style.scss'

interface PublicPageWrapperProps {
  children: JSX.Element
  bgImage?: string
}

export const PublicPageWrapper: React.FC<PublicPageWrapperProps> = ({ children, bgImage }) => {

  return (
    <div className='bg-light'>
      <div className={`vh-100 w-100 __page_wrapper ${bgImage ?? ''}`}>
        <header className='vh-20 w-100'>
          <div className='container h-100 w-100 d-flex justify-content-start align-items-center'>
            <Link to='/'>
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