import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';
import { getToken, removeToken } from '../../services/LocalStorageService';

// API base URL
const API_BASE_URL = 'http://localhost:8080';

// Protected route component that checks authentication before rendering
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { token } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token - check both sources
        const reduxToken = token?.access_token;
        const localToken = getToken()?.access_token;

        // Use redux token, fallback to local storage token
        const access_token = reduxToken || localToken;

        if (!access_token) {
          console.log('No valid token found');
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Check if token is in correct format
        if (!access_token.startsWith('eyJ')) {
          console.warn('Token appears malformed');
        }

        try {
          // Try client-side validation of token if possible
          // Many JWTs have role information embedded that could be extracted

          // For debugging: check if token format matches what backend expects
          console.log('Using Authorization: Bearer', access_token.substring(0, 10) + '...');

          // Try the authentication endpoint
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            method: 'GET',
            headers: {
              // Remove any extra spaces in the Authorization header
              'Authorization': `Bearer ${access_token.trim()}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });

          console.log('Auth check response status:', response.status);

          if (response.ok) {
            const userData = await response.json();
            console.log('User data retrieved:', userData);
            setUserRole(userData.role);
            setIsAuthenticated(true);

            // Store role for future use
            if (userData.role) {
              localStorage.setItem('userRole', userData.role);
            }
          } else {
            // If API call fails but we have a role in localStorage, we can optionally
            // use that as a fallback for a better user experience
            const storedRole = localStorage.getItem('userRole');

            if (response.status === 401) {
              // Token invalid/expired, fall back to login
              console.warn('Token is unauthorized - possibly expired');

              // This is a development fallback - can be removed in production
              // It allows testing protected routes with a role even when API auth fails
              if (process.env.NODE_ENV === 'development' && storedRole) {
                console.warn('DEVELOPMENT MODE: Using stored role despite auth failure');
                setUserRole(storedRole);
                setIsAuthenticated(true);
              } else {
                setIsAuthenticated(false);
                removeToken();
              }
            } else {
              console.warn(`Authentication failed with status: ${response.status}`);
              setIsAuthenticated(false);
            }
          }
        } catch (error) {
          console.error('Authentication check failed:', error);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token processing error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  // Check if we should bypass authentication in development mode (for testing)
  useEffect(() => {
    // This allows bypassing auth in development by setting a URL parameter
    // Example: http://localhost:3000/dashboard?dev_auth=admin
    if (process.env.NODE_ENV === 'development') {
      const params = new URLSearchParams(window.location.search);
      const devAuth = params.get('dev_auth');

      if (devAuth) {
        console.warn('DEVELOPMENT MODE: Bypassing authentication with role:', devAuth);
        setUserRole(devAuth);
        setIsAuthenticated(true);
        setLoading(false);
      }
    }
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required and user doesn't have permission
  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render the children
  return children;
};

export default ProtectedRoute;