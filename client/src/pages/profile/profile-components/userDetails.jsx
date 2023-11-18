import { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import '../profile-styles.css'

export const UserDetails = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cookies] = useCookies(['access_token']);
  const accessToken = cookies.access_token;
  const userId = localStorage.getItem('userId');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [contactNum, setContactNum] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

 
  const saveChanges = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }

      const response = await axios.put(
        `${API_BASE_URL}/users/profile/${userId}`,
        { firstName, lastName, address, contactNum},
        config
      )

      if (response.status !== 200) {
        const errorMsg = response.data.msg;
        console.error(errorMsg);
      } else {
        user.firstName = firstName || user.firstName
        user.lastName = lastName || user.lastName
        user.address = address || user.address
        user.contactNum = contactNum || user.contactNum
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  }

  return (
    <>
      {isEditing ? (
        <div className='user-details-container'>
          <div className='user-details'>
          <div className='name'>
            <div className='input-label'>
              <label>
                First Name:
                <input
                  type='text'
                  name='firstName'
                  placeholder='First Name'
                  value={firstName || ''}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='input-field'
                />
              </label>
            </div>
            <div className='input-label'>
              <label>
                Last Name:
                <input
                  type='text'
                  name='lastName'
                  placeholder='Last Name'
                  value={lastName || ''}
                  onChange={(e) => setLastName(e.target.value)}
                  className='input-field'
                />
              </label>
            </div>
          </div>
            <label className='input-label'>
              Address:
              <input
                type='text'
                name='address'
                value={address || ''}
                onChange={(e) => setAddress(e.target.value)}
                className='input-field'
              />
            </label>
            <label className='input-label'>
              Contact No.:
              <input
                type='text'
                name='contactNum'
                value={contactNum || ''}
                onChange={(e) => setContactNum(e.target.value)}
                className='input-field'
              />
            </label>
          </div>
          <div className='toggle-buttons'>
            <button 
              className='save-button' 
              onClick={saveChanges}
            >
              Save Changes
            </button>
            <button 
              className='cancel-button' 
              onClick={() => 
                setIsEditing(false)
              }
              >
                Cancel
              </button>
          </div>
        </div>
      ) : (
        <div className='user-details-container'>
          <div className='user-details'>
            <p>Name : {user.firstName} {user.lastName}</p>
            <p>Address : {user.address}</p>
            <p>Contact No. : {user.contactNum}</p>
          </div>
          <button className='edit-button' onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
      )}
    </>
  );
};
