import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getProducts } from "../../../hooks/useGetProducts"
import './styles.css'

export const Shop = () => {
  const { products } = getProducts()
  const [cookies] = useCookies(['access_token'])
  const accessToken = cookies.access_token
  const userId = localStorage.getItem('userId')
  const [isAddingToCart, setIsAddingToCart] = useState({})
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    if (!accessToken) {
      window.location.href = '/auth'
    }
  }, [accessToken])

  const updateIsAddingToCart = (productID, value) => {
    setIsAddingToCart((prevIsAddingToCart) => ({
      ...prevIsAddingToCart,
      [productID]: value,
    }))
  }

  const addToCart = async (productID) => {
    if (isAddingToCart[productID]) {
      return;
    }
  
    updateIsAddingToCart(productID, true);
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
  
      const response = await axios.post(
        `${API_BASE_URL}/products/cart`,
        { productID, userID: userId },
        config
      )
  
      if (response.status === 200) {
        console.log(response.data.msg);
        setTimeout(() => {
          updateIsAddingToCart(productID, false)
          alert('Added to cart successfully')
          console.log('Added to cart:', productID)
        }, 1000)
      } else if (response.status === 204) {
        alert('Your cart has already reached the maximum number of stock available.');
        updateIsAddingToCart(productID, false)
      } else {
        console.log(response.data.msg)
        alert(response.data.msg)
        updateIsAddingToCart(productID, false)
      }
    } catch (err) {
      console.error(err);
      updateIsAddingToCart(productID, false)
    }
  };

  useEffect(() => {
    return () => {
      setIsAddingToCart({});
    };
  }, []);
  
  return (
    <>
      { accessToken && (
        <div className="shop-container">
          <h1 className="shop-title">
            Shop
          </h1>
          <div className="product-list">
            {products.map((product) => ( 
              product.productQuantity > 0 && (
                <div className="product-item" key={product._id}>
                  <img 
                    className="product-image" 
                    src={product.imgURL} 
                    alt={product.productName} 
                  />
                  <span className="product-name">
                    {product.productName}
                  </span>
                  <p className='price'>
                    Price: ${product.price}
                  </p>
                  <p className='quantity'>
                    Stocks: {product.productQuantity}
                  </p>
                  <button
                    className="add-to-cart-button"
                    onClick={() =>
                      addToCart(product._id)
                    }
                    disabled={isAddingToCart[product._id]}
                  >
                    {isAddingToCart[product._id] ? 
                      'Adding...' 
                        : 
                      'Add To Cart'
                    }
                  </button>
                </div>
              )))}
          </div>
        </div>
        )
      }
    </>
  )
}
