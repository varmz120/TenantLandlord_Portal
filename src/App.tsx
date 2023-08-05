import './App.css';
import '@fontsource-variable/lexend';

import { client } from './client';

// Routing library and auth context
import { Routes, Route, redirect, useNavigate, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext.tsx';

import Navbar from './components/Navbar.tsx';
import TenantNavbar from './components/TenantNavbar.tsx';
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
import ServProvViewTicket from './pages/ServProvViewTicket.tsx';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const [isLoading, setLoading] = useState(true);
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    client
      .reAuthenticate()
      .then(({ user }) => {
        login(user);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return isLoading ? (
    'Loading...'
  ) : (
    <Routes>
      {/*Routing for app */}
      <Route path="/" element={<LandingPage />} />
      {/*Routing for login pages */}
      <Route path="/login" element={<TenantLoginPage />} />
      {/*Routing for password reset */}
      <Route path="/reset1" element={<PasswordResetPage1 />} />
      <Route path="/login2FA" element={<Tenant2FAPage />} />
      <Route path="/reset-password" element={<PasswordResetPage2 />} />
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
      {/*Routing for landlord */}
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
  );
}

/* Functions for Login */
function TenantLoginPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <TenantLogin />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetPage1() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <PasswordResetOne />
      </ErrorBoundary>
    </div>
  );
}

function Tenant2FAPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Tenant2FA />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetPage2() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <PasswordResetTwo />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetSuccessfulPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <PasswordResetSuccessful />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetUnsuccessfulPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <PasswordResetUnsuccessful />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetRequestSuccessPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <PasswordResetRequestSuccess />
      </ErrorBoundary>
    </div>
  );
}

function PasswordResetRequestFailedPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
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
        <TenantNavbar />
        <RequestTicket />
      </ErrorBoundary>
    </div>
  );
}

function ViewTicketPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <TenantNavbar />
        <ViewTicket />
      </ErrorBoundary>
    </div>
  );
}

function ViewQuotePage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <TenantNavbar />
        <ViewQuote />
      </ErrorBoundary>
    </div>
  );
}

function RateTicketPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <TenantNavbar />
        <RateTicket />
      </ErrorBoundary>
    </div>
  );
}

function LandingPage() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    client
      .reAuthenticate()
      .then(({ user }) => {
        login(user);
      })
      .catch(() => redirect('/login'));
  }, []);

  if (user?.typ == 0) {
    console.log('User is a tenant');
    let redirect = '/tenantDashboard';
    navigate('/Success', { state: { redirect } });
  } else if (user?.typ == 1) {
    console.log('User is a landlord');
    let redirect = '/ServProvDashboard';
    navigate('/Success', { state: { redirect } });
  } else if (user?.typ == 2) {
    console.log('User is a landlord');
    let redirect = '/landlordDashboard';
    navigate('/Success', { state: { redirect } });
  } else if (user?.typ == 3) {
    console.log('User is a admin');
    let redirect = '/adminDashboard';
    navigate('/Success', { state: { redirect } });
  } else {
    navigate('/401');
  }

  const to =
    user === null
      ? '/login'
      : user.typ === 0
      ? '/tenantDashboard'
      : user.typ === 1
      ? '/ServProvDashboard'
      : user.typ === 2
      ? '/landlordDashboard'
      : '/adminDashboard';

  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Navigate to={to} />
      </ErrorBoundary>
    </div>
  );
}

function NotificationPage() {
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <ErrorBoundary>
        <Notification />
      </ErrorBoundary>
    </div>
  );
}

function AdminAccManagePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      // If the user is not logged in, navigate to 401
      navigate('/401');
    } else if (user.typ !== 3) {
      // If the user type is not 3 (not an admin), navigate to 403
      navigate('/403');
    }
  }, [user, navigate]);
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <Navbar />
      <AdminAccManage />
    </div>
  );
}

function AdminHomePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      // If the user is not logged in, navigate to 401
      navigate('/401');
    } else if (user.typ !== 3) {
      // If the user type is not 3 (not an admin), navigate to 403
      navigate('/403');
    }
  }, [user, navigate]);
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <Navbar />
      <AdminHome />
    </div>
  );
}

function AccountsPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      // If the user is not logged in, navigate to 401
      navigate('/401');
    } else if (user.typ !== 3) {
      // If the user type is not 3 (not an admin), navigate to 403
      navigate('/403');
    }
  }, [user, navigate]);
  return (
    <div className="App h-screen overflow-y-auto bg-content">
      <Navbar />
      <ViewAllAccounts />
    </div>
  );
}

function BuildingsPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      // If the user is not logged in, navigate to 401
      navigate('/401');
    } else if (user.typ !== 3) {
      // If the user type is not 3 (not an admin), navigate to 403
      navigate('/403');
    }
  }, [user, navigate]);
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
