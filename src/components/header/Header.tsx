import { Bell, Menu, Search, X } from 'react-feather';
import { Link, useHistory, useLocation } from 'react-router-dom';
import SpicyGuitarLogo from '../../assets/spicyguitaracademy-logo.svg';
import './style.scss'
import { Course, useAuthStore, useCourseStore, useNotificationStore, useStudentStatsStore } from '../../store';
import { baseUrl } from '../../utils';
import { SideMenu } from '../side-menu/SideMenu';
import { useState } from 'react';


interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = () => {

  const { notifications } = useNotificationStore()
  const { student } = useAuthStore()
  const { studentStats } = useStudentStatsStore()
  const { replace, push } = useHistory()
  const { pathname } = useLocation()
  const { allCourses, studyingCourses } = useCourseStore()
  const [showMenu, setShowMenu] = useState(false)

  const handleSearch = (event: any) => {
    event.preventDefault()

    const searchValue: string = event.target[0].value.toString()

    const state = {
      search: searchValue,
      courses: (() => {
        const result: Course[] = [];
        [
          ...studentStats.category === 1 ? studyingCourses : allCourses?.beginner!,
          ...studentStats.category === 2 ? studyingCourses : allCourses?.amateur!,
          ...studentStats.category === 3 ? studyingCourses : allCourses?.intermediate!,
          ...studentStats.category === 4 ? studyingCourses : allCourses?.advanced!
        ].forEach((course: Course) => {
          const value = searchValue.toLowerCase()
          const title = course.course.trim().toLowerCase();
          const description = course.description!.trim().toLowerCase();
          const tutor = course.tutor.trim().toLowerCase();

          if (title.includes(value) || description.includes(value) || tutor.includes(value)) {
            result.push(course)
          }
        })

        return result
      })()
    }

    pathname === '/dashboard/courses/search'
      ? replace('/dashboard/courses/search', state)
      : push('/dashboard/courses/search', state)
  }

  const newNotifications = notifications.filter(notice => notice.status === 'unread')?.length!

  return (
    <>
      <header className='bg-secondary position-fixed'>
        <div className='container-lg px-md-5 h-100 d-flex justify-content-between align-items-center'>

          <div className='__logo_wrapper'>
            <Link to='/'>
              <img src={SpicyGuitarLogo} alt="Spicy Guitar Academy" className='__logo' />
            </Link>
          </div>

          <div className='d-flex justify-content-start align-items-center gap-md-5'>

            <div className='__search_wrapper me-2 me-md-3'>
              <form onSubmit={handleSearch} className='d-flex justify-content-end'>
                <div className='__input_wrapper input-group'>
                  <input type="search" className='__search_input form-control border-0 bg-cream text-primary' placeholder='Search courses' />
                  <button type='submit' className='input-group-text btn btn-cream p-1 px-2 p-md-2'>
                    <Search size={'1.1rem'} className='text-primary' />
                  </button>
                </div>
              </form>
            </div>

            <div className='__header_actions d-flex align-items-center gap-2 gap-md-4'>

              <div className='__notification_wrapper'>
                <Link to='/dashboard/notifications' className='position-relative'>
                  {
                    newNotifications > 0 &&
                    <span className='__notification_count_tag position-absolute fw-bold end-0 bg-danger text-light d-flex justify-content-center align-items-center'>
                      {newNotifications}
                    </span>
                  }
                  <Bell size={28} className='text-primary' />
                </Link>
              </div>

              <div className='__avatar_wrapper d-none d-lg-block'>
                <Link to='/dashboard/profile'>
                  <img src={`${baseUrl}/${student?.avatar}`} alt="Student Avatar" className='__avatar shadow-lg' />
                </Link>
              </div>

              <div className='__avatar_wrapper d-block d-lg-none'>
                <button onClick={() => setShowMenu(!showMenu)} className='btn btn-sm m-0 p-0 text-primary'>
                  {
                    showMenu === true
                    ? <X size={32} className='pb-1' />
                    : <Menu size={32} className='pb-1' />
                  }
                </button>
              </div>

            </div>

          </div>

        </div>
      </header>

      {
        showMenu &&
        <nav className='__menu'>
          <SideMenu />
        </nav>
      }
    </>

  )
}