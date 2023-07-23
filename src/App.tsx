import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AccountCreation from './pages/AccountCreation';
import ViewTicket from './pages/ViewTicket';
import AddLease from './pages/AddLease';
import ViewFeedback from './pages/ViewFeedback'
import UploadQuation from './pages/UploadQuotation'
import AddService from './pages/AddService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/AddLease" element={<AddLeasePage />} />
        <Route path="/ViewTicket" element={<ViewTicketPage />} />
        <Route path="/AddService" element={<AddServicePage />} />
        <Route path="/UploadQuotation" element={<UploadQuationPage />} />
        <Route path="/AccountCreation" element={<AccountCreationPage />} />
        <Route path="/ViewFeedback" element={<ViewFeedbackPage />} />
      </Routes>
    </Router>
  );
}

function DashboardPage() {
  return (
    <Dashboard />
  )
}

function AddLeasePage() {
  return (
    <AddLease />
  )
}

function ViewTicketPage() {
  return (
    <ViewTicket />
  )
}

function AddServicePage() {
  return (
    <AddService />
  )
}

function UploadQuationPage() {
  return (
    <UploadQuation />
  )
}

function AccountCreationPage() {
  return (
    <AccountCreation />
  )
}

function ViewFeedbackPage() {
  return (
    <ViewFeedback />
  )
}

export default App;
