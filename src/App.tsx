import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ContactUs, ErrorPage, ForgotPassword, LandingPage, LoginPage, ReadyToPlay, RegisterPage, ResetPassword, VerifyAccount, VerifyDevice } from './pages/public';
import { WelcomePage as StudentWelcomePage } from './pages/authenticated'
import { ConfirmModal, LoadingModal, ToastWrapper } from './components';
import { useLoadingModalStore } from './store/loading-modal';
import { useCallback, useEffect } from 'react';
import { useAuthStore } from './store/auth';

function App() {

  const { setLoading } = useLoadingModalStore()
  const { boot } = useAuthStore()

  const bootApp = useCallback(async () => {
    setLoading(true, "Booting App...")
    boot().then(_ => {
      setLoading(false)
    })
  }, [boot, setLoading])

  useEffect(() => {
    bootApp()
  }, [bootApp])

  return (
    <>
      <ToastWrapper />
      <ConfirmModal />
      <LoadingModal />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route exact path='/verify-account' component={VerifyAccount} />
          <Route exact path='/reset-password' component={ResetPassword} />
          <Route exact path='/verify-device' component={VerifyDevice} />
          <Route exact path='/contact-us' component={ContactUs} />
          <Route exact path='/ready-to-play' component={ReadyToPlay} />

          {/* Authenticated pages */}
          <Route exact path='/welcome' component={StudentWelcomePage} />

          {/* Error Page */}
          <Route component={ErrorPage} />

        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
