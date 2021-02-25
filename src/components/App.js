import '../App.css';
import React from 'react'
import NavBar from './NavBar'
import MainPage from './MainPage'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <MainPage />
      </header>
    </div>
  );
}

export default App;
