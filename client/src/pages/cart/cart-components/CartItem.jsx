export const CartItem = ({ 
  item, 
  toggleItemCheck, 
  incrementQuantity, 
  decrementQuantity
  }) => {
  return (
    <div className="cart-item" key={item._id}>
      <input 
        className="checkbox-input"
        type="checkbox" 
        onChange={() => 
          toggleItemCheck(item._id)} 
      />
      <img 
        src={item.imgURL} 
        alt={item.productName}
      />
      <div className="cart-item-info">
        <h3>{item.productName}</h3>
        <p>Quantity: {item.quantity}</p>
        <p>Price: {item.price}</p>
      </div>
      <button 
        className="plus-button"
        onClick={() => 
          incrementQuantity(item._id)}>
            +
      </button>
      <button 
        className="minus-button"
        onClick={() => 
          decrementQuantity(item._id)}>
            -
      </button>
    </div>
  )
}
