import './App.css';
import '@fontsource-variable/lexend';
import Navbar from './components/Navbar.tsx';
import RequestTicket from './pages/RequestTicket.tsx';
import ViewTicket from './pages/ViewTicket.tsx';
import TenantDashboard from './pages/TenantDashboard.tsx';
import ViewQuote from './pages/ViewQuote.tsx';
import RateTicket from './pages/RateTicket.tsx';
import Landing from './pages/Landing.tsx';

// Error Pages
import ErrorPage_404 from './pages/404.tsx';
import ErrorPage_401 from './pages/401.tsx';
import ErrorPage_403 from './pages/403.tsx';
import ErrorPage_RunTime from './pages/RuntimeError.tsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/newRequest" element={<RequestTicketPage />} />
        <Route path="/viewDetails" element={<ViewTicketPage />} />
        <Route path="/viewQuote" element={<ViewQuotePage />} />
        <Route path="/feedbackSurvey" element={<RateTicketPage />} />
        <Route path="/*" element={<ErrorPage_404 />} />
        <Route path="/401" element={<ErrorPage_401 />} /> {/* To add proper auth routing */}
        <Route path="/403" element={<ErrorPage_403 />} /> {/* To add proper auth routing */}
        <Route path="/Error" element={<ErrorPage_RunTime />} /> {/* To add proper routing.*/}
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

function LandingPage() {
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <Landing />
    </div>
  );
}

export default App;
