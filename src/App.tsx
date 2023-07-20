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
import ErrorPage404 from './pages/404.tsx';
import ErrorPage401 from './pages/401.tsx';
import ErrorPage403 from './pages/403.tsx';
import ErrorPageRunTime from './pages/RuntimeError.tsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

function App() {
  return (
    <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tenantDashboard" element={<DashboardPage />} />
          <Route path="/newRequest" element={<RequestTicketPage />} />
          <Route path="/viewDetails" element={<ViewTicketPage />} />
          <Route path="/viewQuote" element={<ViewQuotePage />} />
          <Route path="/feedbackSurvey" element={<RateTicketPage />} />
          <Route path="/*" element={<ErrorPage404 />} />
          <Route path="/401" element={<ErrorPage401 />} /> {/* To add proper auth routing */}
          <Route path="/403" element={<ErrorPage403 />} /> {/* To add proper auth routing */}
          <Route path="/Error" element={<RunTimeErrorPage />} /> {/* To add proper routing.*/}
        </Routes>
    </AuthContextProvider>
  );
}

function DashboardPage() {
  return (
    <div className="App h-screen bg-content">
      <ErrorBoundary>
        <Navbar />
        <TenantDashboard />
      </ErrorBoundary>
    </div>
  );
}

function RequestTicketPage() {
  return (
    <div className="App h-screen bg-content">
      <ErrorBoundary>
        <Navbar />
        <RequestTicket />
      </ErrorBoundary>
    </div>
  );
}

function ViewTicketPage() {
  return (
    <div className="App h-screen bg-content">
      <ErrorBoundary>
        <Navbar />
        <ViewTicket />
      </ErrorBoundary>
    </div>
  );
}

function ViewQuotePage() {
  return (
    <div className="App h-screen bg-content">
      <ErrorBoundary>
        <Navbar />
        <ViewQuote />
      </ErrorBoundary>
    </div>
  );
}

function RateTicketPage() {
  return (
    <div className="App h-screen bg-content">
      <ErrorBoundary>
        <Navbar />
        <RateTicket />
      </ErrorBoundary>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="App h-screen bg-content">
      <ErrorBoundary>
        <Navbar />
        <Landing />
      </ErrorBoundary>
    </div>
  );
}

export default App;
