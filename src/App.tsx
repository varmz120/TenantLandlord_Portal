import './App.css';
import '@fontsource-variable/lexend';

// Routing library and auth context
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext.tsx';

import Navbar from './components/Navbar.tsx';
import SuccessRedirect from './pages/SuccessRedirect.tsx';

// Login pages
import TenantLogin from './pages/TenantLogin.tsx';
import PasswordResetOne from './pages/PasswordResetOne.tsx';
import Tenant2FA from './pages/Tenant2FA.tsx';
import PasswordResetTwo from './pages/PasswordResetTwo.tsx';
import PasswordResetSuccessful from './pages/PasswordResetSuccessful.tsx';
import PasswordResetUnsuccessful from './pages/PasswordResetUnsuccessful.tsx';
import PasswordResetRequestSuccess from './pages/PasswordResetRequestedSuccessfully.tsx';
import PasswordResetRequestFailed from './pages/PasswordResetRequestedFailed.tsx';

// Error Pages
import ErrorPage404 from './pages/404.tsx';
import ErrorPage401 from './pages/401.tsx';
import ErrorPage403 from './pages/403.tsx';
import ErrorPageRunTime from './pages/RuntimeError.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

import '@fontsource-variable/lexend';
import AdminAccManage from './pages/AdminAccManage';
import AdminHome from './pages/AdminHome';
import Buildings from './pages/Buildings';
import ViewAllAccounts from './pages/ViewAllAccounts';

// Tenant-specific pages
import RequestTicket from './pages/RequestTicket.tsx';
import ViewTicket from './pages/ViewTicket.tsx';
import TenantDashboard from './pages/TenantDashboard.tsx';
import ViewQuote from './pages/ViewQuote.tsx';
import RateTicket from './pages/RateTicket.tsx';
import Landing from './pages/Landing.tsx';
import Notification from './pages/Notification.tsx';

// Landlord-specific pages
import LandlordDashboard from './pages/LandlordDashboard.tsx';
import LandlordViewTicket from './pages/LandlordViewTicket.tsx';
import LandlordViewFeedback from './pages/LandlordViewFeedback.tsx';
import LandlordUploadQuotation from './pages/LandlordUploadQuotation.tsx';
import LandlordAddLease from './pages/LandlordAddLease.tsx';
import LandlordAccountCreation from './pages/LandlordAccountCreation.tsx';
import LandlordAddService from './pages/LandlordAddService.tsx';
import TenantAddAcc from './pages/TenantAddAcc.tsx';

//Service Provider Pages
import ServProvDashboard from './pages/ServProvDashboard.tsx';
import ServProvViewTicket from './pages/ServProvViewTicket.tsx'

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        {/*Routing for login pages */}
        <Route path="/" element={<LandingPage />} />
        {/*Routing for password reset */}
        <Route path="/reset1" element={<PasswordResetPage1 />} />
        <Route path="/Tenant2FA" element={<Tenant2FAPage />} />
        <Route path="/reset2" element={<PasswordResetPage2 />} />
        <Route path="/resetsuccessful" element={<PasswordResetSuccessfulPage />} />
        <Route path="/resetunsuccessful" element={<PasswordResetUnsuccessfulPage />} />
        <Route path="/resetrequestsuccess" element={<PasswordResetRequestSuccessPage />} />
        <Route path="/resetrequestfailure" element={<PasswordResetRequestFailedPage />} />
        {/*Routing for tenant */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/tenantDashboard" element={<DashboardPage />} />
        <Route path="/newRequest" element={<RequestTicketPage />} />
        <Route path="/viewDetails" element={<ViewTicketPage />} />
        <Route path="/viewQuote" element={<ViewQuotePage />} />
        <Route path="/feedbackSurvey" element={<RateTicketPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        {/*Routing for admin */}
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
        <Route path="/ServProvDashboard" element={<ServProvDashboardPage />} />
        <Route path="/ServProvViewTicket" element={<ServProvViewTicketPage />} />
        <Route path="/TenantAddAcc" element={<TenantAddAccPage />} />
        {/*Routing for errors */}
        <Route path="/*" element={<ErrorPage404 />} />
        <Route path="/401" element={<ErrorPage401 />} /> {/* To add proper auth routing */}
        <Route path="/403" element={<ErrorPage403 />} /> {/* To add proper auth routing */}
        <Route path="/Error" element={<ErrorPageRunTime />} /> {/* To add proper routing.*/}
        {/*Routing for misc */}
        <Route path="/Success" element={<SuccessRedirectPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

/* Functions for Login */
function TenantLoginPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <TenantLogin />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetPage1() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <PasswordResetOne />
      </ErrorBoundary>
    </div>
  );
}

function Tenant2FAPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <Tenant2FA />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetPage2() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <PasswordResetTwo />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetSuccessfulPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <PasswordResetSuccessful />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetUnsuccessfulPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <PasswordResetUnsuccessful />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetRequestSuccessPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <PasswordResetRequestSuccess />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetRequestFailedPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <PasswordResetRequestFailed />
      </ErrorBoundary>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <TenantDashboard />
      </ErrorBoundary>
    </div>
  );
}

function RequestTicketPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <RequestTicket />
      </ErrorBoundary>
    </div>
  );
}

function ViewTicketPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <ViewTicket />
      </ErrorBoundary>
    </div>
  );
}

function ViewQuotePage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <ViewQuote />
      </ErrorBoundary>
    </div>
  );
}

function RateTicketPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navbar />
        <RateTicket />
      </ErrorBoundary>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
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
    <div className="App h-screen overflow-y-auto bg-content">
      <Navbar />
      <AdminAccManage />
    </div>
  );
}

function AdminHomePage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <Navbar />
      <AdminHome />
    </div>
  );
}

function AccountsPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <Navbar />
      <ViewAllAccounts />
    </div>
  );
}

function BuildingsPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <Navbar />
      <Buildings />
    </div>
  );
}

function LandlordDashboardPage() {
  return <LandlordDashboard />;
}

function LandlordViewTicketPage() {
  return <LandlordViewTicket />;
}

function LandlordViewFeedbackPage() {
  return <LandlordViewFeedback />;
}

function LandlordUploadQuotationPage() {
  return <LandlordUploadQuotation />;
}

function LandlordAddLeasePage() {
  return <LandlordAddLease />;
}
function TenantAddAccPage() {
  return (
    <div className="App h-screen bg-content">
      <TenantAddAcc />
    </div>
  );
}

function LandlordAccountCreationPage() {
  return <LandlordAccountCreation />;
}

function LandlordAddServicePage() {
  return <LandlordAddService />;
}

function SuccessRedirectPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <SuccessRedirect />
      </ErrorBoundary>
    </div>
  );
}


function ServProvDashboardPage() {
  return <ServProvDashboard />;
}

function ServProvViewTicketPage() {
  return <ServProvViewTicket />;
}

export default App;
