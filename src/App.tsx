import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.tsx';
import RequestTicket from './pages/RequestTicket.tsx';
import ViewTicket from './pages/ViewTicket.tsx';
import '@fontsource-variable/lexend';
import "@fontsource-variable/lexend/wght.css"; 

/* Where I put in my pages I guess? */
function App() {
  return (
    <div className="App h-screen">
      <RequestTicket />
    </div>
  );
}

function ViewTicketPage(){
  return (
    <div className="App h-screen">
      <Navbar />
      <ViewTicket />
    </div>
  );
}

export default ViewTicketPage; /* This was originally App */