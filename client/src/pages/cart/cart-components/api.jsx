import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchCartItems = async (accessToken, userId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  
    const response = await axios.get(`${API_BASE_URL}/products/cart/${userId}`, config)

    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response.data.msg)
      return [];
    }
  } catch (err) {
    console.error(err)
    return []
  }
}

export const updateCartItemQuantity = async (accessToken, userId, cartItemId, newQuantity, newPrice) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/products/cart/${userId}/${cartItemId}`,
      { quantity: newQuantity, price: newPrice },
      config
    )

    if (response.status !== 200) {
      console.log(response.data.msg)
    }
  } catch (err) {
    console.error(err)
  }
}

export const removeCartItem = async (accessToken, userId, cartItemId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  }

  try {
    const response = await axios.delete(
      `${API_BASE_URL}/products/cart/${userId}/${cartItemId}`,
      config
    )

    if (response.status !== 200) {
      console.log(response.data.msg)
    }
  } catch (err) {
    console.error(err)
  }
}
