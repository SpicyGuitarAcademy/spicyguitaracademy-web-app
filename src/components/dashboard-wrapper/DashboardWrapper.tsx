import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { domain } from '../../utils';
import { Header } from '../header/Header';
import { SideMenu } from '../side-menu/SideMenu';
import './style.scss'

interface DashboardWrapperProps {
  children: JSX.Element
  bgImage?: string
  confetti?: boolean
}

export const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children, confetti }) => {

  const { auth, signOut } = useAuthStore()
  const { push } = useHistory()

  useEffect(() => {
    if (auth?.authenticated === false) {
      console.log('not signed in, logging out...')
      signOut()
      push('/login')
    }

    // check for subscription
    // check for category
  })

  return (
    <div className={`__page_wrapper`}>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Spicy Guitar Academy | Dashboard</title>
        <link rel="canonical" href={`${domain}/dashboard`} />
        <meta name="description" content="Spicy Guitar Academy is aimed at guiding beginners to fulfil their dreams of becoming professional guitar players.
        We have the best qualified tutors who are dedicated to help you develop from start to finish to make your dreams come true." />
      </Helmet>

      <Header />

      <main className='__body bg-light text-primary'>

        <div className='__body_wrapper container'>

          <div className='d-none d-lg-block'>
            <SideMenu />
          </div>

          <div className={`__body_content ${confetti === true && '__confetti'}`}>
            {children}
          </div>

        </div>

      </main>

    </div>
  )
}