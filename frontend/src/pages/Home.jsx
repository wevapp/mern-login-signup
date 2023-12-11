import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

// import authentication
import useRequireAuth from '../../hooks/authNook'

const Home = () => {
  const nav = useNavigate();
    // Use the custom hook to check authentication
    const authCheck = useRequireAuth();

    // If authCheck is not null, it means the user is not authenticated, and navigation has occurred
    if (authCheck) {
      return authCheck;
    }

  return (
    <div>
      Homepage
      <Link to="/"
        onClick={() => {
          localStorage.removeItem('token');
          nav('/');
        }}
      >
        Logout
      </Link>
    </div>
  );
};

export default Home;
