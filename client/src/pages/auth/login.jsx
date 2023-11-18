import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'
import './styles.css'

export const Login = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const  [_, setCookies ] = useCookies(['access_token'])
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(`${API_BASE_URL}/users/login`, {
        username,
        password
      })

      setCookies('access_token', result.data.token)
      localStorage.setItem('userId', result.data.userID)
      navigate('/')
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.msg)
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='username'>
          <label className='username-label' htmlFor="username">Username:</label>
          <input
            className='username-input'
            type="text"
            value={username}
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='password'>
          <label className='password-label' htmlFor="password">Password:</label>
          <input
            className='password-input'
            type= {showPassword ? 'text' : 'password'}
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length > 0 && (
            <button
              className="login-password-toggle"
              onClick={togglePasswordVisibility}
              type='button'
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          )}
        </div>
        <button 
          className='submit-button' 
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
  }