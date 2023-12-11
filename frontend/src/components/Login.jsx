import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Get Local API from dot env
const ACCOUNTS_API = import.meta.env.VITE_ACCOUNTS_API;

const Login = () => {
  const nav = useNavigate(); // navigate to home
  const [accounts, setAccounts] = useState([]); // handle all accounts in the database
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios(ACCOUNTS_API)
      .then((res) => setAccounts(res.data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ACCOUNTS_API}/login`, { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      nav('/home');
    } catch (error) {
      setError('Invalid username or password');
      setPassword('');
    }
  };

  return (
    <div>
      <h1>Login user</h1> <br />
      <label>username</label> <br />
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> <br />

      <label>password</label> <br />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />

      <small style={{color: 'red'}}>{error.length > 0 ? error:error}</small><br />
      <button onClick={(e) => handleLogin(e)}>Login</button>
      <Link to='/signup'>Signup</Link>
    </div>
  );
};

export default Login;
