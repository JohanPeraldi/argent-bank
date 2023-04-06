import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Authentication({ children }) {
  const isAuthenticated = useSelector((state) => state.login.loggedIn);

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
}
