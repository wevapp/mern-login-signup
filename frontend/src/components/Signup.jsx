import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

// Get Local API from dot env
const ACCOUNTS_API = import.meta.env.VITE_ACCOUNTS_API

const Signup = () => {
  const nav = useNavigate()
  const [accounts, setAccounts] = useState([]); // handle all accounts in the database
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
      if(username === "" || password === ""){
          alert('Fill all fields')
      } else {
          axios.get(ACCOUNTS_API).then((response) => setAccounts(response.data)).catch(error => console.log(error.response))
          // check if the username already exist
          const exist = accounts.some((account) => account.username)
          if (exist === false) {
            alert('username already exist')
          } else {
            axios.post(`${ACCOUNTS_API}/signup`, {username, password})
            .then((response) => {
                nav('/')
            }).catch(error => console.log(error.response))
            setUsername('')
            setPassword('')
          }
      }
  }


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
    </div>
  )
}

export default Signup