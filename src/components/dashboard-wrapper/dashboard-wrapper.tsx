import { Header } from '../header/header';
import { SideMenu } from '../side-menu/side-menu';
import './style.scss'

interface DashboardWrapperProps {
  children: JSX.Element
  bgImage?: string
}

export const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children, bgImage }) => {

  return (
    <div className='__page_wrapper'>
      
      <Header />

      <main className='__body bg-light text-dark'>

        <div className='__body_wrapper container-lg'>

          <SideMenu />

          <div className='__body_content'>
            {children}
          </div>

        </div>

      </main>

    </div>
  )
}