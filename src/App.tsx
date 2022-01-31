import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LandingPage, LoadingPage, LoginPage, RegisterPage, VerifyAccount, VerifyDevice, WelcomePage } from './pages/public';

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
