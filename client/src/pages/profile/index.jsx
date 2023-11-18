import { ProfilePicture } from "./profile-components/profilePic"
import { UserDetails } from "./profile-components/userDetails"
import { getUserProfile } from "../../../hooks/useGetProfile"
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import { useEffect } from "react"
import './profile-styles.css'
import { WalletBalance } from "./profile-components/wallet-balance"

export const Profile = () => {
  const { user } = getUserProfile()
  const navigate = useNavigate()
  const [cookies] = useCookies(['access_token'])
  const accessToken = cookies.access_token

  useEffect(() => {
    if (!accessToken) {
      window.location.href = '/auth'
    }
  }, [accessToken])

  return (
    <>
      { accessToken && (
        <div className="profile-container">
          <div className="details">
            <ProfilePicture />
            <UserDetails user={user}/>
          </div>
          <div className="additional-options">
            <WalletBalance />
            <button
              className="view-purchased-button"
              onClick={ () => 
                navigate('/purchased-items')
              }
            >
              View Purchased Items
            </button>
            <a href='/change-username'>
              Change username?
            </a>
            <a href='/change-password'>
              Change password?
            </a>
          </div>
        </div>
        )
      }
    </>
  )
}
