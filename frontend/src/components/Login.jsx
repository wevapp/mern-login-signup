import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Get Local API from dot env
const ACCOUNTS_API = import.meta.env.VITE_ACCOUNTS_API;

const Login = () => {
  const nav = useNavigate(); // navigate to home
  const [accounts, setAccounts] = useState([]); // handle all accounts in the database
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    axios(ACCOUNTS_API)
      .then((res) => setAccounts(res.data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = accounts.find((acc) => acc.username === username);

    if (user && user.password === password) {
      nav('/home')
    } else {
      console.log('User not found or incorrect password')
    }
  };

  return (
    <div>
      <h1>Login user</h1> <br />
      <label>username</label> <br />
      <input type="text" onChange={(e) => setUsername(e.target.value)} /> <br />

      <label>password</label> <br />
      <input type="text" onChange={(e) => setPassword(e.target.value)} /> <br />

      <button onClick={(e) => handleLogin(e)}>Login</button>
      <Link to='/signup'>Signup</Link>
    </div>
  );
};

export default Login;
