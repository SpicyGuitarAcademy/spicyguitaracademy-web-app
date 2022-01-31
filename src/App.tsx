import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ContactUs, ForgotPassword, LandingPage, LoadingPage, LoginPage, ReadyToPlay, RegisterPage, VerifyAccount, VerifyDevice, WelcomePage } from './pages/public';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' children={LandingPage} />
        <Route exact path='/welcome' children={WelcomePage} />
        <Route exact path='/loading' children={LoadingPage} />
        <Route exact path='/register' children={RegisterPage} />
        <Route exact path='/login' children={LoginPage} />
        <Route exact path='/verify-device' children={VerifyDevice} />
        <Route exact path='/verify-account' children={VerifyAccount} />
        <Route exact path='/forgot-password' children={ForgotPassword} />
        <Route exact path='/contact-us' children={ContactUs} />
        <Route exact path='/ready-to-play' children={ReadyToPlay} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
