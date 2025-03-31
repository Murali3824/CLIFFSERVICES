import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import VerifyOtp from './components/VerifyOtp'; // New component
import ForgotPassword from './components/ForgotPassword'; // New component
import ResetPassword from './components/ResetPassword'; // New component
import Sidebar from './components/Sidebar';
import HRDashboard from './pages/hr/HrDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddJob from './pages/hr/AddJob';
import JobList from './pages/hr/JobList';
import AllJobList from './pages/admin/AllJobList';
import HRProfile from './pages/hr/HRProfile';
import HRProfilesManagement from './pages/admin/HRProfilesManagement';
import AdminApplicants from './pages/admin/AdminApplicants';
import JobApplicants from './pages/hr/JobApplicants';
import UserManagement from './pages/admin/UserManagement';

export const API_URL = import.meta.env.VITE_BACKEND_URL;


const PrivateRoute = ({ requiredRole }) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userType !== requiredRole) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="">
            <Sidebar />
        </div>
    );
};

const PublicRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    // If already logged in, redirect to appropriate dashboard
    if (token) {
        return <Navigate to={userType === 'hr' ? '/hr' : '/admin'} replace />;
    }

    return <Component {...rest} />;
};

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<PublicRoute component={LoginSignup} />} />
            <Route path="/verify-otp" element={<PublicRoute component={VerifyOtp} />} />
            <Route path="/forgot-password" element={<PublicRoute component={ForgotPassword} />} />
            <Route path="/reset-password" element={<PublicRoute component={ResetPassword} />} />

            {/* Protected HR Routes */}
            <Route path="/hr" element={<PrivateRoute requiredRole="hr" />}>
                <Route index element={<HRDashboard />} />
                <Route path="addjobs" element={<AddJob />} />
                <Route path="joblist" element={<JobList />} />
                <Route path="job-applications" element={<JobApplicants />} />
                <Route path="profile" element={<HRProfile />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<PrivateRoute requiredRole="admin" />}>
                <Route index element={<AdminDashboard />} />
                <Route path="alljoblist" element={<AllJobList />} />
                <Route path="hr-profiles" element={<HRProfilesManagement />} />
                <Route path="user-profiles" element={<UserManagement />} />
                <Route path="applications" element={<AdminApplicants />} /> 
            </Route>

            {/* Redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default App;