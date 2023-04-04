import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserData } from '../../api/api';

export default function Authentication({ children }) {
  const isLoggedIn = useSelector((state) => state.login);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get user data to check if user is authenticated
        const data = await getUserData();
        if (data?.firstName) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  // If user is not authenticated, navigate to login page
  if (!isAuthenticated && isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render children components
  return children;
}
