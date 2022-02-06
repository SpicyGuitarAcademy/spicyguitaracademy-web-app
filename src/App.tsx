import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ContactUs, ForgotPassword, LandingPage, LoadingPage, LoginPage, ReadyToPlay, RegisterPage, VerifyAccount, VerifyDevice, WelcomePage } from './pages/public';
import { WelcomePage as StudentWelcomePage } from './pages/authenticated/index'
import { ToastWrapper } from './components';

function App() {
  return (
    <>
      <ToastWrapper>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/welcome' component={WelcomePage} />
            <Route exact path='/loading' component={LoadingPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/verify-device' component={VerifyDevice} />
            <Route exact path='/verify-account' component={VerifyAccount} />
            <Route exact path='/forgot-password' component={ForgotPassword} />
            <Route exact path='/contact-us' component={ContactUs} />
            <Route exact path='/ready-to-play' component={ReadyToPlay} />

            <Route exact path='/welcomee' component={StudentWelcomePage} />

          </Switch>
        </BrowserRouter>
      </ToastWrapper>
    </>
  );
}

export default App;
