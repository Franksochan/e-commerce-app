import { useLocation } from 'react-router-dom'
import { getUserProfile } from '../../../hooks/useGetProfile'
import './checkout-styles.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export const Checkout = () => {
  const location = useLocation()
  const { selectedItems } = location.state
  const { user } = getUserProfile()
  const navigate = useNavigate()
  const [cookies] = useCookies(['access_token'])
  const accessToken = cookies.access_token
  const userId = localStorage.getItem('userId')
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


  const handleCheckout = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }

      const response = await axios.post(`${API_BASE_URL}/checkout/${userId}`, {
        selectedItems: selectedItems.map(item => ({
          productID: item.product,
          quantity: item.quantity,
          price: item.price,
          imgURL: item.imgURL,
          productName: item.productName
        })), config
      })

      console.log(response.data)

      if (response.data.msg === 'Transaction failed: Insufficient funds') {
        alert('Transaction failed: Insufficient funds')
      } else if (response.status === 200) {
        navigate('/success')
      } 
    } catch (err) {
      console.log('Error during checkout:', err)
    }
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    selectedItems.forEach(item => {
      totalPrice += item.price
    });

    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div>
      <h2>Delivery details</h2>
      <div className='checkout-user-details'>
        <p>Name : {user.firstName} {user.lastName}</p>
        <p>Delivery Address : {user.address}</p>
        <p>Contact Number : {user.contactNum}</p>
      </div>
      <h2>Checkout Items</h2>
      {selectedItems.length > 0 ? selectedItems.map((item) => (
        <div className='checkout-items-container' key={item._id}>
          <img className='checkout-item-img' src={item.imgURL}/>
          <div className='checkout-item' key={item._id}>
            <p> {item.productName}</p>
            <p>Quantity : {item.quantity}</p>
            <p>Price : {item.price}</p>
          </div>
        </div>
      )) : 'No checkout items'}
      <button
        className='buy-now-button'
        onClick={handleCheckout}
      >
        Buy Now (${totalPrice})
      </button>
    </div>
)
}
