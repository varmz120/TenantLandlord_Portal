import './App.css';
import '@fontsource-variable/lexend';
import Navbar from './components/Navbar.tsx';
import RequestTicket from './pages/RequestTicket.tsx';
import ViewTicket from './pages/ViewTicket.tsx';
import TenantDashboard from './pages/TenantDashboard.tsx';
import ViewQuote from './pages/ViewQuote.tsx';
import RateTicket from './pages/RateTicket.tsx';
import logo from './logo.svg';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/newRequest" element={<RequestTicketPage />} />
        <Route path="/viewDetails" element={<ViewTicketPage />} />
        <Route path="/viewQuote" element={<ViewQuotePage />} />
        <Route path="/feedbackSurvey" element={<RateTicketPage />} />
      </Routes>
    </Router>
  );
}

function DashboardPage() {
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <TenantDashboard />
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

function ViewTicketPage() {
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <ViewTicket />
    </div>
  );
}

function ViewQuotePage() {
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <ViewQuote />
    </div>
  );
}

function RateTicketPage() {
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <RateTicket />
    </div>
  );
}

export default App;
