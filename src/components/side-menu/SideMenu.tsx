import { ChevronRight, Columns, Home, LogOut, Mail, MessageSquare, User, Video } from 'react-feather';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuthStore, useModalStore, useStudentStatsStore } from '../../store';
import { baseUrl } from '../../utils';
import './style.scss'

interface SideMenuProps {
}

export const SideMenu: React.FC<SideMenuProps> = () => {

  const { pathname } = useLocation()
  const { confirm } = useModalStore()
  const { signOut, student } = useAuthStore()
  const { push } = useHistory()
  const { studentStats } = useStudentStatsStore()

  const { state } = useLocation<{
    isBought: boolean
  }>()
  const isBought = state?.isBought! ?? false
  
  const routes = [
    {
      icon: <Home size={24} />,
      title: 'Home', route: '/dashboard',
      indicateFor: [
        '/dashboard'
      ]
    },
    {
      icon: <Columns size={24} />,
      title: 'Courses', route: '/dashboard/courses',
      indicateFor: [
        '/dashboard/courses',
        '/dashboard/courses/all',
        '/dashboard/courses/search',
        '/dashboard/courses/assignment',
        '/dashboard/courses/assignment/question',
        isBought === false && '/dashboard/courses/complete',
        isBought === false && '/dashboard/courses/lessons',
        isBought === false && '/dashboard/tutorial'
      ].filter(Boolean)
    },
    {
      icon: <Video size={24} />,
      title: 'Buy Courses', route: '/dashboard/courses/bought',
      indicateFor: [
        '/dashboard/courses/bought',
        '/dashboard/courses/featured',
        '/dashboard/courses/details',
        isBought === true && '/dashboard/courses/complete',
        isBought === true && '/dashboard/courses/lessons',
        isBought === true && '/dashboard/tutorial'
      ].filter(Boolean)
    },
    {
      icon: <User size={24} />,
      title: 'Profile', route: '/dashboard/profile',
      indicateFor: [
        '/dashboard/profile',
        '/dashboard/profile/update',
        '/dashboard/profile/update-password',
        '/dashboard/profile/category',
        '/dashboard/profile/category/previous',
        '/dashboard/profile/subscription',
        '/dashboard/payment/methods',
        '/dashboard/payment/spicyunits',
        '/dashboard/payment/paystack/complete',
        '/dashboard/payment/paypal/complete',
        '/dashboard/payment/successful',
        '/dashboard/payment/failed',
        '/dashboard/profile/invite',
        '/dashboard/help',
      ]
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Forum', route: '/dashboard/forum',
      indicateFor: [
        '/dashboard/forum'
      ]
    },
    {
      icon: <Mail size={24} />,
      title: 'Contact Us', route: '/contact-us',
      indicateFor: ['/dashboard/contact-us']
    },
    {
      icon: <LogOut size={24} />,
      title: 'Logout', isLogout: true
    },
  ]

  const handleLogout = () => {
    confirm("Confirm Logout", async () => {
      signOut()
      push('/login')
    })
  }

  return (
    <nav className='__side_menu_wrapper bg-light border-end position-fixed d-flex flex-column justify-content-start align-items-center gap-2 gap-md-3'>

      <div className='__avatar_wrapper'>
        <img className='__avatar' src={`${baseUrl}/${student?.avatar}`} alt="Student Avatar" />
      </div>

      <div className='__student_details'>

        <div className='__student_name h3 text-primary p-2 mb-md-1'>
          {student?.firstname}{' '}{student?.lastname}
        </div>

        <div className='__student_stats d-flex flex-column justify-content-center'>
          <span className='badge bg-primary text-light p-2 px-3 fw-bold rounded-pill mx-auto'>
            {studentStats?.takenCourses} of {studentStats?.allCourses} Courses
          </span>
          <span className='badge bg-muted text-primary p-2 fw-bold'>
            {studentStats?.takenLessons} of {studentStats?.allLessons} Lessons
          </span>
        </div>

      </div>

      <div className='__navigation w-100'>
        <ul className='d-flex flex-column justify-content-start align-items-center gap-3 gap-md-3 list-unstyled p-3'>
          {
            routes?.map((route, index) => (

              <li key={index} className={`__route w-100 fs-5 p-1 ps-md-3 border-start border-5 ${route?.indicateFor?.includes(pathname) ? '__active bg-cream border-primary' : 'border-light'}`}>

                {
                  !route?.isLogout ?
                    <Link className='text-decoration-none d-flex justify-content-between align-items-center' to={route?.route!}>

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