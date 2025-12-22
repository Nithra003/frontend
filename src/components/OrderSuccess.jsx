import './OrderSuccess.css'

function OrderSuccess({ onClose, orderedItems = [] }) {
  return (
    <div className="success-overlay">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h2>Order Successful!</h2>
        <p>Thank you for your purchase. Your order has been placed successfully.</p>
        
        {orderedItems.length > 0 && (
          <div className="ordered-items">
            <h3>Your Ordered Items:</h3>
            <div className="items-list">
              {orderedItems.map((item, index) => (
                <div key={index} className="ordered-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <p>You will receive a confirmation email shortly.</p>
        <button className="continue-btn" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default OrderSuccess