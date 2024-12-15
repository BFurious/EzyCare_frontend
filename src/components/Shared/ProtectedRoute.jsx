import React from 'react';
import { Navigate } from 'react-router-dom'; // React Router v6
import { useRole } from '../Login/RoleCheck';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { userRole } = useRole(); // Get the current role from context

  if (!userRole) {
    // Redirect to login or loading page if role is not set
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Redirect to unauthorized page or hide content
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the children if the role matches
  return children;
};
