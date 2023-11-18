import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../profile-styles.css'


export const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const userId = localStorage.getItem('userId');
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
        `${API_BASE_URL}/users/profile/password/${userId}`,
        { password, oldPassword },
        config
      );

      if (response.data.msg === 'User not found ') {
        alert('User not found');
      } else if (response.data.msg === 'Incorrect old password, please try again') {
        alert('Incorrect old password, please try again');
      } else {
        alert('Password changed successfully');
        setPassword('')
        setOldPassword('')
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleCancellation = () => {
    navigate('/profile')
  }

  return (
    <div className="change-username-container">
      <div className="form-container">
      <h2>Change Password</h2>
        <input
          className="username-input-2"
          value={oldPassword}
          placeholder="Old Password"
          type="text"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          className="username-input-2"
          value={password}
          placeholder="Password"
          type="text"
          onChange={(e) => setPassword(e.target.value)}
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
  );
};
