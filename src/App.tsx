import './App.css';
import '@fontsource-variable/lexend';
import Navbar from './components/Navbar.tsx';
import RequestTicket from './pages/RequestTicket.tsx';
import ViewTicket from './pages/ViewTicket.tsx';
import TenantDashboard from './pages/TenantDashboard.tsx';
import ViewQuote from './pages/ViewQuote.tsx';
import RateTicket from './pages/RateTicket.tsx';
import Landing from './pages/Landing.tsx';
import Notification from './pages/Notification.tsx';

// Error Pages
import ErrorPage404 from './pages/404.tsx';
import ErrorPage401 from './pages/401.tsx';
import ErrorPage403 from './pages/403.tsx';
import ErrorPageRunTime from './pages/RuntimeError.tsx';

import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import '@fontsource-variable/lexend';
import AdminAccManage from './pages/AdminAccManage';
import AdminHome from './pages/AdminHome';
import Buildings from './pages/Buildings';
import ViewAllAccounts from './pages/ViewAllAccounts';

//Landlord-specific pages
import LandlordDashboard from './pages/LandlordDashboard.tsx';
import LandlordViewTicket from './pages/LandlordViewTicket.tsx';
import LandlordViewFeedback from './pages/LandlordViewFeedback.tsx';
import LandlordUploadQuotation from './pages/LandlordUploadQuotation.tsx';
import LandlordAddLease from './pages/LandlordAddLease.tsx';
import LandlordAccountCreation from './pages/LandlordAccountCreation.tsx';
import LandlordAddService from './pages/LandlordAddService.tsx';

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
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/adminDashboard" element={<AdminHomePage />} />
        <Route path="/Accounts" element={<AccountsPage />} />
        <Route path="/Buildings" element={<BuildingsPage />} />
        <Route path="/AccountManagement" element={<AdminAccManagePage />} />
        <Route path="/Buildings" element={<BuildingsPage />} />{' '}

        <Route path="/LandlordDashboard" element={<LandlordDashboardPage />} />
        <Route path="/LandlordViewTicket" element={<LandlordViewTicketPage />} />
        <Route path="/LandlordViewFeedback" element={<LandlordViewFeedbackPage />} />
        <Route path="/LandlordUploadQuotation" element={<LandlordUploadQuotationPage />} />
        <Route path="/LandlordAddLease" element={<LandlordAddLeasePage />} />
        <Route path="/LandlordAccountCreation" element={<LandlordAccountCreationPage />} />
        <Route path="/LandlordAddService" element={<LandlordAddServicePage />} />

        <Route path="/*" element={<ErrorPage404 />} />
        <Route path="/401" element={<ErrorPage401 />} /> {/* To add proper auth routing */}
        <Route path="/403" element={<ErrorPage403 />} /> {/* To add proper auth routing */}
        <Route path="/Error" element={<ErrorPageRunTime />} /> {/* To add proper routing.*/}
      </Routes>
    </AuthContextProvider>
  );
}

function DashboardPage() {
  return (
    <div className="App h-full bg-content">
      <ErrorBoundary>
        <Navbar />
        <TenantDashboard />
      </ErrorBoundary>
    </div>
  );
}

function RequestTicketPage() {
  return (
    <div className="App h-full bg-content">
      <ErrorBoundary>
        <Navbar />
        <RequestTicket />
      </ErrorBoundary>
    </div>
  );
}

function ViewTicketPage() {
  return (
    <div className="App h-full bg-content">
      <ErrorBoundary>
        <Navbar />
        <ViewTicket />
      </ErrorBoundary>
    </div>
  );
}

function ViewQuotePage() {
  return (
    <div className="App h-full bg-content">
      <ErrorBoundary>
        <Navbar />
        <ViewQuote />
      </ErrorBoundary>
    </div>
  );
}

function RateTicketPage() {
  return (
    <div className="App h-full bg-content">
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

function NotificationPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <Notification />
      </ErrorBoundary>
    </div>
  );
}

function AdminAccManagePage() {
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <AdminAccManage />
    </div>
  );
}

function AdminHomePage() {
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <AdminHome />
    </div>
  );
}

function AccountsPage() {
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <ViewAllAccounts />
    </div>
  );
}

function BuildingsPage() {
  return (
    <div className="App h-screen bg-content">
      <Navbar />
      <Buildings />
    </div>
  );
}

function LandlordDashboardPage() {
  return (
      <LandlordDashboard />
  );
}

function LandlordViewTicketPage() {
  return (
      <LandlordViewTicket />
  );
}

function LandlordViewFeedbackPage() {
  return (
      <LandlordViewFeedback />
  );
}

function LandlordUploadQuotationPage() {
  return (
      <LandlordUploadQuotation />
  );
}

function LandlordAddLeasePage() {
  return (
      <LandlordAddLease />
  );
}

function LandlordAccountCreationPage() {
  return (
      <LandlordAccountCreation />
  );
}

function LandlordAddServicePage() {
  return (
      <LandlordAddService />
  );
}
export default App;
