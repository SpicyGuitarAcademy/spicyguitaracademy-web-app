import SpicyGuitarLogo from '../../../assets/spicyguitaracademy_logo.svg';

export const LandingPage = () => {
  return (
    <div className='bg-light'>
      <div className='vh-100 vw-100 d-flex justify-content-center align-items-center'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img src={SpicyGuitarLogo} alt="Spicy Guitar Academy" className='mb-lg-3' />
          <p className='h3 text-primary'>Spicy Guitar Academy</p>
        </div>
      </div>
    </div>
  )
};
