import { useState } from "react"
import axios from 'axios'
import './styles.css'

export const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [contactNum, setContactNum] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/users/register`, {
        username,
        password,
        firstName,
        lastName,
        address,
        contactNum
      })
      alert('User is registered successfully')
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.msg);
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <form className='registration-form' onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="username">
          <label className="username-label" htmlFor="username">
            Username:
          </label>
          <input
            className="username-input"
            type="text"
            value={username}
            id="username"
            required={true}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="password">
          <label className="password-label" htmlFor="password">
            Password:
          </label>
          <input
            className="password-input"
            type={showPassword ? "text" : "password"}
            value={password}
            id="password" 
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length > 0 && (
            <button
              className="register-password-toggle"
              onClick={togglePasswordVisibility}
              type="button"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          )}
        </div> 
        <div className="first-name">
          <label className="first-name-label" htmlFor="firstName">
            First Name:
          </label>
          <input
            className="first-name-input"
            type="text"
            value={firstName}
            id="firstName" 
            required={true}
            onChange={(e) => setFirstName(e.target.value)}
          /> 
        </div>
        <div className="last-name">
          <label className="last-name-label" htmlFor="lastName">
            Last Name:
          </label>
          <input
            className="last-name-input"
            type="text"
            value={lastName}
            id="lastName" 
            required={true}
            onChange={(e) => setLastName(e.target.value)}
          /> 
        </div>
        <div className="address">
          <label className="address-label" htmlFor="address">
            Address:
          </label>
          <input
            className="address-input"
            type="text"
            value={address}
            id="address" 
            required={true}
            onChange={(e) => setAddress(e.target.value)}
          /> 
        </div>
        <div className="contact-number">
          <label className="contact-number-label" htmlFor="contactNum">
            Contact No.:
          </label>
          <input
            className="contact-input"
            type="text"
            value={contactNum}
            id="contactNum" 
            required={true}
            onChange={(e) => setContactNum(e.target.value)}
          /> 
        </div>
        <button 
          className='submit-button' 
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};
