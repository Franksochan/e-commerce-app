import { getUserProfile } from '../../../../hooks/useGetProfile'
import '../profile-styles.css'

export const PurchasedItems = () => {
  const { user, isLoading, error } = getUserProfile()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const renderItems = () => {
    if (user.purchasedItems && user.purchasedItems.length > 0) {
      return (
        <div>
          {user.purchasedItems.map((item) => (
            <div 
              className='item-container' 
              key={item._id}
            >
              <div>
                <img 
                  src={item.imgURL} 
                  alt={item.productName} 
                  className="item-image" 
                />
              </div>
              <div 
                className='item-details'
              >
                <p className="item-name">
                  {item.productName}
                </p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return <p>No purchased items found.</p>;
    }
  }

  return (
    <div className="purchased-items-container">
      <h2>Purchased History</h2>
      {renderItems()}
    </div>
  )
}
