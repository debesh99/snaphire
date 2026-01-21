import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // 1. Check if user is logged in
    if (!token) {
        return <Navigate to="/" />;
    }

    // 2. Check if user has the correct role (if a specific role is required)
    // If allowedRoles is passed (e.g. "RECRUITER"), check it. 
    // If not passed, just checking for login is enough.
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/jobs" />; // Redirect to safe page
    }

    // 3. If all checks pass, render the child components (The actual page)
    return <Outlet />;
};

export default PrivateRoutes;

// Frontend Private Routes secure the User Interface (UI).

// They prevent a user from seeing the "Post Job" page.

// They redirect unauthorized users to the Login page.
