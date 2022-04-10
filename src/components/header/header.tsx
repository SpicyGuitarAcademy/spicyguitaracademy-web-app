import { Bell, Search } from 'react-feather';
import { Link } from 'react-router-dom';
import SpicyGuitarLogo from '../../assets/spicyguitaracademy-logo.svg';
import DefaultAvatar from '../../assets/default-avatar.png';
import './style.scss'


interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = () => {

  const handleSearch = (event: any) => {
    event.preventDefault()
    const searchValue = event.target[0].value
    alert('Search: ' + searchValue)
  }

  return (
    <header className='bg-secondary position-fixed'>
      <div className='container-lg px-lg-5 h-100 d-flex justify-content-between align-items-center'>

        <div className='__logo_wrapper'>
          <Link to='/'>
            <img src={SpicyGuitarLogo} alt="Spicy Guitar Academy" className='__logo' />
          </Link>
        </div>

        <div className='d-flex justify-content-start align-items-center gap-lg-5'>

          <div className='__search_wrapper me-lg-3'>
            <form onSubmit={handleSearch}>
              <div className='__input_wrapper input-group'>
                <input type="search" className='__search_input form-control border-0 bg-cream text-primary' placeholder='Search courses' />
                <button type='submit' className='input-group-text btn btn-cream'>
                  <Search size={'1.1rem'} className='text-primary' />
                </button>
              </div>
            </form>
          </div>

          <div className='__header_actions d-flex align-items-center gap-lg-4'>

            <div className='__notification_wrapper'>
              <Link to='/notifications' className='position-relative'>
                <span className='__notification_count_tag position-absolute fw-bold end-0 bg-danger text-light d-flex justify-content-center align-items-center'>14</span>
                <Bell size={28} className='text-primary' />
              </Link>
            </div>

            <div className='__avatar_wrapper'>
              <Link to='/profile'>
                <img src={DefaultAvatar} alt="Student Avatar" className='__avatar shadow-lg' />
              </Link>
            </div>

          </div>

        </div>

      </div>

    </header>

  )
}