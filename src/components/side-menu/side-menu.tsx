// import { Bell, Search } from 'react-feather';
// import { Link } from 'react-router-dom';
import { ChevronRight, Columns, Home, LogOut, Mail, MessageSquare, User, Video } from 'react-feather';
import { Link, useHistory, useLocation } from 'react-router-dom';
import DefaultAvatar from '../../assets/default-avatar.png';
import { useAuthStore, useConfirmModalStore } from '../../store';
import './style.scss'

interface SideMenuProps {
}

export const SideMenu: React.FC<SideMenuProps> = () => {

  const { pathname } = useLocation()
  const { confirm } = useConfirmModalStore()
  const { signOut } = useAuthStore()
  const { push } = useHistory()

  const routes = [
    { icon: <Home size={24} />, title: 'Home', route: '/dashboard' },
    { icon: <Columns size={24} />, title: 'Courses', route: '/dashboard/courses' },
    { icon: <Video size={24} />, title: 'Featured', route: '/dashboard/featured' },
    { icon: <User size={24} />, title: 'Profile', route: '/dashboard/profile' },
    { icon: <MessageSquare size={24} />, title: 'Forum', route: '/dashboard/forum' },
    { icon: <Mail size={24} />, title: 'Contact Us', route: '/contact-us' },
    { icon: <LogOut size={24} />, title: 'Logout', route: '/dashboard/courses', isLogout: true },
  ]

  const handleLogout = () => {
    confirm("Confirm Logout", async () => {
      signOut()
      push('/login')
    })
  }

  return (
    <nav className='__side_menu_wrapper border-end position-fixed d-flex flex-column justify-content-start align-items-center gap-lg-3'>

      <div className='__avatar_wrapper'>
        <img className='__avatar' src={DefaultAvatar} alt="Student Avatar" />
      </div>

      <div className='__student_details'>

        <div className='__student_name h3 text-primary p-2 mb-lg-1'>
          Ebuka Odini
        </div>

        <div className='__student_stats d-flex justify-content-center'>
          <span className='badge bg-primary text-light p-2 fw-normal'>
            10 of 33
          </span>
        </div>

      </div>

      <div className='__navigation w-100'>
        <ul className='d-flex flex-column justify-content-start align-items-center gap-lg-3 list-unstyled p-3'>
          {
            routes?.map((route, index) => (

              <li key={index} className={`__route w-100 fs-5 p-1 ps-lg-3 border-start border-5 ${route?.route === pathname ? 'bg-cream border-primary' : 'border-light'}`}>

                {
                  !route?.isLogout ?
                    <Link className='text-decoration-none d-flex justify-content-between align-items-center' to={route?.route}>

                      <div className='d-flex align-items-center'>
                        <span className='me-2 mb-1'>{route?.icon}</span>
                        <span>{route?.title}</span>
                      </div>

                      <ChevronRight size={24} />

                    </Link>
                    :
                    <div onClick={handleLogout} className='text-danger cursor-pointer text-decoration-none d-flex justify-content-between align-items-center'>

                      <div className='d-flex align-items-center'>
                        <span className='me-2 mb-1'>{route?.icon}</span>
                        <span>{route?.title}</span>
                      </div>

                    </div>
                }


              </li>

            ))
          }
        </ul>
      </div>

    </nav>
  )
}