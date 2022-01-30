import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LandingPage, LoadingPage, WelcomePage } from './pages/public';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' children={LandingPage} />
        <Route exact path='/welcome' children={WelcomePage} />
        <Route exact path='/loading' children={LoadingPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
