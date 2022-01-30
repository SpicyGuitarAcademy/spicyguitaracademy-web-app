import SpicyGuitarLogo from '../../assets/spicyguitaracademy_logo.svg';
import './style.scss'

export const PublicPageWrapper = ({ children, bgImage }: { children: JSX.Element, bgImage?: string }) => {

  return (
    <div className={`vh-100 vw-100 bg-light __page_wrapper ${bgImage ?? ''}`}>
      <header className='container py-lg-3 mb-5'>
        <img src={SpicyGuitarLogo} alt="Spicy Guitar Academy" className='__logo' />
      </header>
      <div className='container h-lg-50'>
        {children}
      </div>
    </div>
  )
}