import './App.css';
import Navbar from './components/Navbar.tsx';
import RequestTicket from './pages/RequestTicket.tsx';
import ViewTicket from './pages/ViewTicket.tsx';
import '@fontsource-variable/lexend';
import TestFlow from './pages/TestFlow.tsx';

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

function Test(){
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <TestFlow />
    </div>
  );
}

export default Test;