import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { getProducts } from "../../../../hooks/useGetProducts"
import { fetchCartItems, updateCartItemQuantity, removeCartItem } from './api'
import { CartItem } from './CartItem'
import '../styles.css'

export const CartComponent = () => {
  const [ cartItems, setCartItems ] = useState([])
  const [ checkedItems,  setCheckedItems ] = useState({})
  const [ cookies ] = useCookies(['access_token'])
  const accessToken = cookies.access_token;
  const userId = localStorage.getItem('userId')
  const { products } = getProducts()
  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      window.location.href = '/auth'
    } else {
      const fetchCartItemsData = async () => {
      const items = await fetchCartItems(accessToken, userId)
      setCartItems(items)
    }
    fetchCartItemsData();
    setCheckedItems({});}
  }, [accessToken, userId])

  const toggleItemCheck = (cartItemID) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [cartItemID]: !prevCheckedItems[cartItemID],
    }));
  };

  const incrementQuantity = async (cartItemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === cartItemId) {
        const productRef = products.find((product) =>
          product._id === item.product
        )

        if (item.quantity < productRef.productQuantity) {
          const newQuantity = item.quantity + 1
          const newPrice = newQuantity * productRef.price
          updateCartItemQuantity(
            accessToken, 
            userId, 
            cartItemId, 
            newQuantity, 
            newPrice
          )
          return {
            ...item,
            quantity: newQuantity,
            price: newPrice,
          }
        } else {
          alert('Not enough stock')
        }
      }
      return item
    })

    setCartItems(updatedCartItems)
  }

  const decrementQuantity = async (cartItemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === cartItemId) {
        const newQuantity = item.quantity - 1
        const productRef = 
          products.find((product) => 
            product._id === item.product
          )

        const newPrice = newQuantity * productRef.price

        if (newQuantity <= 0) {
          removeCartItem(accessToken, userId, item._id)
          return null
        } else {
          updateCartItemQuantity(
            accessToken, 
            userId, 
            item._id, 
            newQuantity, 
            newPrice
          )
          return {
            ...item,
            quantity: newQuantity,
            price: newPrice,
          }
        }
      }
      return item
    })
    setCartItems(updatedCartItems.filter(Boolean));
  }
  
  const handleCheckout = () => {
    const selectedItems = 
      cartItems.filter((item) => 
        checkedItems[item._id]
      )
    
    if (selectedItems.length === 0) {
      return alert('Check an item first')
    }
    navigate('/checkout', { state: { selectedItems } })
  }

  return (
    <>
    { accessToken && (
      <div className="cart-container">
        <h2>Your Cart</h2>
          <div>
            {cartItems.length > 0 ? 
              cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  toggleItemCheck={toggleItemCheck}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                />
              )) : 'Cart is empty'}
          </div>
          {cartItems.length > 0 && (
            <button 
              className='checkout-button'
              onClick={handleCheckout}>
                Checkout
            </button>
          )}
        </div>
      )
    }
    </>
  )
}
