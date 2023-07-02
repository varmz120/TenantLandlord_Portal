import './App.css';
import Navbar from './components/Navbar.tsx';
import RequestTicket from './pages/RequestTicket.tsx';
import ViewTicket from './pages/ViewTicket.tsx';
import '@fontsource-variable/lexend';
import TestFlow from './pages/RateTicket.tsx';
import ViewQuote from './pages/ViewQuote.tsx';
import RateTicket from './pages/RateTicket.tsx';

function App() {
  return (
    <div className="App h-screen bg-content">
      <Navbar />
    </div>
  );
}

function RequestTicketPage() {
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <RequestTicket />
    </div>
  );
}

function ViewTicketPage(){
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <ViewTicket />
    </div>
  );
}

function ViewQuotePage(){
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <ViewQuote />
    </div>
  );
}

function RateTicketPage(){
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <RateTicket />
    </div>
  );
}

export default ViewQuotePage; // Change to what you wanna see