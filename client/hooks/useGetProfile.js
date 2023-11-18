import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const getUserProfile = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["access_token"]);
  const accessToken = cookies.access_token;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
  const displayUserProfile = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }; 
      const response = await axios.get(
        `https://johnlino-ecommerce-app.onrender.com/users/profile/${userId}`,
        config
      )
      setUser(response.data.user)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  } 
  displayUserProfile()
  console.log(user)
 }, [])


  return { user, isLoading, error }
}
