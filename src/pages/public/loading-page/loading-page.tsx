import SpicyGuitarLogo from '../../../assets/spicyguitaracademy_logo.svg';

export const LoadingPage = () => {
  return (
    <div className='bg-grey'>
      <div className='vh-100 vw-100 d-flex justify-content-center align-items-center'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img src={SpicyGuitarLogo} alt="Spicy Guitar Academy" className='mb-lg-3' />
          <p className='h5 text-primary'>Loading...</p>
        </div>
      </div>
    </div>
  )

}