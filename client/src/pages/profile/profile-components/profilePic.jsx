import axios from 'axios'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import '../profile-styles.css'

export const ProfilePicture = () => {
  const [profilePic, setProfilePic] = useState('')
  const [newProfilePic, setNewProfilePic] = useState(null)
  const [cookies] = useCookies(['access_token'])
  const accessToken = cookies.access_token
  const userId = localStorage.getItem('userId')
  const [isUploading, setIsUploading] = useState(false)
  const [rerenderKey, setRerenderKey] = useState(0)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const handleFileChange = (e) => {
    setNewProfilePic(e.target.files[0])
  }

  const uploadProfilePicture = async () => {
    if (!newProfilePic) {
      alert('Please input a new photo')
      return
    }
    
    const formData = new FormData()
    formData.append('profilePic', newProfilePic)

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      await axios.post(`${API_BASE_URL}/users/upload/${userId}`, 
       formData, config 
      )
  
      alert('Profile picture has been uploaded succesfully')
      setRerenderKey((prevKey) => prevKey + 1)
    } catch (err) {
      console.log(err)
    } finally {
      setIsUploading(false)
    }
  };

  const getImage = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const response = await axios.get(`${API_BASE_URL}/users/image/${userId}`, 
        config
      )
      setProfilePic(response.data.user);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getImage()
  }, [])

  return (
    <div className='profile-pic-container'>
      {profilePic && (
        <img 
          src={`${API_BASE_URL}/${profilePic}`} 
          alt="Profile Picture" 
          className="profile-pic" 
        />
      )}
      <button 
        onClick={ () => 
          setIsUploading(true)
        } 
        className="upload-button">
        {!profilePic ? 
          'Upload Photo' 
            : 
          'Change Photo'
        }
      </button>
  
      {isUploading && (
        <div className='submission-details'>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="file-input" 
          />
          <div className='upload-cancel-button'>
            <button 
              onClick={uploadProfilePicture} 
              className="upload-button">
                Upload
            </button>
            <button 
              onClick={ () => 
                setIsUploading(false)
              } 
              className="upload-button">
                Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
