import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.tsx';
import RequestTicket from './pages/RequestTicket.tsx';
import '@fontsource/lexend';

function App() {
  return (
    <div className="App h-screen">
      <Navbar />
      <RequestTicket />
    </div>
  );
}

export default App;
