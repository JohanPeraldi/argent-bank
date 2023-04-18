import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Authentication({ children }) {
  const token = localStorage.getItem('token');

  if (token) {
    return children;
  }

  return <Navigate to="/login" />;
}
