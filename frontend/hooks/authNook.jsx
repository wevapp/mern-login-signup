// useRequireAuth.jsx
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const useRequireAuth = () => {
  const nav = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to login page if the token is not present
    nav('/');
    return <Navigate to="/" />;
  }

  return null; // Return null if authenticated
};

export default useRequireAuth;
