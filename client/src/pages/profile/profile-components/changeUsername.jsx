import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import '../profile-styles.css'

export const ChangeUsername = () => {
  const [username, setUsername] = useState('')
  const [oldUsername, setOldUsername] = useState('')
  const [cookies] = useCookies(['access_token'])
  const accessToken = cookies.access_token
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.put(
        `${API_BASE_URL}/users/profile/username/${userId}`,
        { username, oldUsername },
        config
      );

      if (response.data.msg === 'User not found ') {
        alert('User not found');
      } else if (response.data.msg === 'Username already exists') {
        alert('Username already exists')
      } else if (response.data.msg === 'Incorrect old username, please try again') {
        alert('Incorrect old username, please try again');
      } else {
        alert('Changed successfully')
        setUsername('')
        setOldUsername('')
      }

    } catch (err) {
      console.log(err)
    }
  };

  const handleCancellation = () => {
    navigate('/profile')
  }

  return (
    <div className="change-username-container">
      <div className="form-container">
      <h2>Change Username</h2>
        <input
          className="username-input-2"
          value={oldUsername}
          placeholder="Old Username"
          type="text"
          onChange={(e) => setOldUsername(e.target.value)}
        />
        <input
          className="username-input-2"
          value={username}
          placeholder="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button 
          className="submit-btn" 
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button 
          className="submit-btn"
          onClick={handleCancellation}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
