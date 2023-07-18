import './App.css';
import '@fontsource-variable/lexend';
import Navbar from './components/Navbar.tsx';
import RequestTicket from './pages/RequestTicket.tsx';
import ViewTicket from './pages/ViewTicket.tsx';
import TenantDashboard from './pages/TenantDashboard.tsx';
import ViewQuote from './pages/ViewQuote.tsx';
import RateTicket from './pages/RateTicket.tsx';

// Error Pages
import _404_ErrorPage from './pages/404.tsx';
import _401_ErrorPage from './pages/401.tsx';
import _403_ErrorPage from './pages/403.tsx';
import _500_ErrorPage from './pages/500.tsx';
import _502_ErrorPage from './pages/502.tsx';
import _503_ErrorPage from './pages/503.tsx';
import _504_ErrorPage from './pages/504.tsx';
import _RunTime_ErrorPage from './pages/RuntimeError.tsx';

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
        <Route path="/*" element={<_404_ErrorPage />} />
        <Route path="/401" element={<_401_ErrorPage />} /> {/* To add proper auth routing */}
        <Route path="/403" element={<_403_ErrorPage />} /> {/* To add proper auth routing */}
        <Route path="/500" element={<_500_ErrorPage />} /> {/* To add proper routing */}
        <Route path="/502" element={<_502_ErrorPage />} /> {/* To add proper routing. How do you serve this if the server is down? - Darren */}
        <Route path="/503" element={<_503_ErrorPage />} /> {/* To add proper routing.*/}
        <Route path="/504" element={<_504_ErrorPage />} /> {/* To add proper routing.*/}
        <Route path="/Error" element={<_RunTime_ErrorPage />} /> {/* To add proper routing.*/}
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
