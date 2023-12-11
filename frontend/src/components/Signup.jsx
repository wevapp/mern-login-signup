import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'

// Get Local API from dot env
const ACCOUNTS_API = import.meta.env.VITE_ACCOUNTS_API

const Signup = () => {
  const nav = useNavigate()
  const [accounts, setAccounts] = useState([]); // handle all accounts in the database
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (username === "" || password === "") {
    alert('Fill all fields');
  } else {
    try {
      // Fetch accounts from the server
      const response = await axios.get(ACCOUNTS_API);
      const existingAccounts = response.data;

      // Check if the username already exists
      const exist = existingAccounts.some((account) => account.username === username);

      if (exist) {
        alert('Username already exists')
        setUsername('')
      } else {
        // If the username is unique, proceed with signup
        await axios.post(`${ACCOUNTS_API}/signup`, { username, password });
        alert('Successfully Created')
        nav('/'); // Redirect to the login page
      }
    } catch (error) {
      console.log(error.response);
    }
  }
};


  return (
    <div>
      <h1>Signup user</h1> <br />

      <label>username</label> <br />
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)}
      /> <br />
      
      <label>password</label> <br />
      <input 
        type="text" 
        onChange={(e) => setPassword(e.target.value)}
      /> <br />
      
      <button
        onClick={(e) => handleSubmit(e)}
      >Submit</button>

      <small>Already have an account? <Link to='/'>Login</Link></small>
    </div>
  )
}

export default Signup