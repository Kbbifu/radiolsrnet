// src/Auth/PrivateRoute.js
import React from 'react';
//import { Navigate } from 'react-router-dom';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';

const PrivateRoute = ({ element, ...rest }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
