import {Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthProvider from './contexts/AuthContexts.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

import AdminLayout from './layouts/AdminLayout.jsx';
import LaborLayout from './layouts/LaborLayout.jsx';
import DashboardOverview from './pages/DashboardOverview.jsx';
import LaborDashboard from './pages/LaborDashboard.jsx';
import AttendancePage from './pages/Attendance.jsx';
import ProjectForm from "./components/ProjectForm.jsx";

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import Profile from './pages/Profile.jsx';
import AdminLaborPayments from './pages/AdminLaborPayments.jsx';
import Enquiries from './pages/Enquiries.jsx';
import LaborMyPayments from './pages/LaborMyPayments.jsx';
import LaborAttendnaceHistory from "./pages/LaborAttendanceHistory.jsx"
import Settings from './pages/Settings.jsx';
import VerifyOtp from './pages/OtpVerify.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Unauthorized from './pages/Unauthorized.jsx';

const App = () => {
  return (
      <div className="flex flex-col min-h-screen bg-gray-200">
  
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <WhatsAppButton />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />        
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/verify-otp' element={<VerifyOtp />}/>
          <Route path="/unauthorized" element={<Unauthorized />} />


            <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin','sub-admin']}>
                <AdminLayout />
              </ProtectedRoute>
             }>

            <Route index element={<DashboardOverview />} />
            <Route path="create-project" element={<ProjectForm />} />
            <Route path="labor-payments" element={<AdminLaborPayments />} /> 
            <Route path="attendance" element={<AttendancePage />} />
            <Route path='enquiries' element={< Enquiries />} />
            </Route>

            <Route
            path="/labor"
            element={
            <ProtectedRoute roles={['labor']}>
            <LaborLayout />
            </ProtectedRoute>
             }>

             <Route index element={<Navigate to="dashboard" replace />} />
             <Route path="dashboard" element={<LaborDashboard />} />
             <Route path="attendance" element={<LaborAttendnaceHistory />} />
             <Route path="payments" element={<LaborMyPayments />} />
             </Route>


             <Route
              path="/profile"
              element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
                }
              />   

              <Route
              path="/settings"
              element={
              <ProtectedRoute roles={['admin','labor']}>
              <Settings />
              </ProtectedRoute>
                }
              />
              
              </Routes>
              <Footer />
              </BrowserRouter>
              </AuthProvider>
       </div>        
              );
              };

export default App; 
