import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ContactUs, ForgotPassword, LandingPage, LoadingPage, LoginPage, ReadyToPlay, RegisterPage, VerifyAccount, VerifyDevice } from './pages/public';
import { WelcomePage as StudentWelcomePage } from './pages/authenticated'
import { ConfirmModal, LoadingModal, ToastWrapper } from './components';
import { useLoadingModalStore } from './store/loading-modal';
import { useEffect } from 'react';

function App() {

  const { setLoading } = useLoadingModalStore()

  useEffect(() => {
    setLoading(true, "Booting App...")
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [setLoading])

  return (
    <>
      <ToastWrapper />
      <ConfirmModal />
      <LoadingModal />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/loading' component={LoadingPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/verify-device' component={VerifyDevice} />
          <Route exact path='/verify-account' component={VerifyAccount} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route exact path='/contact-us' component={ContactUs} />
          <Route exact path='/ready-to-play' component={ReadyToPlay} />

          {/* Authenticated pages */}
          <Route exact path='/welcome' component={StudentWelcomePage} />

        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
