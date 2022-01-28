import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App bg-light">
      <header className="App-header text-dark">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code>, save and reload.
        </p>
        <a
          className="text-primary"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Now
        </a>
      </header>
    </div>
  );
}

export default App;
