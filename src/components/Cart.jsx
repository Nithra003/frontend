import { useState } from 'react'
import Checkout from './Checkout'
import OrderSuccess from './OrderSuccess'
import './Cart.css'

function Cart({ cartItems, onClose, updateQuantity, removeFromCart, clearCart, addOrder }) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [orderedItems, setOrderedItems] = useState([])
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Handle both string prices like "₹899" and number prices like 899
      const price = typeof item.price === 'string' && item.price.includes('₹') 
        ? parseFloat(item.price.replace('₹', ''))
        : parseFloat(item.price)
      return total + (price * item.quantity)
    }, 0).toFixed(2)
  }

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-cart" onClick={onClose}>×</button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id || item._id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">
                      ₹{typeof item.price === 'string' && item.price.includes('₹') 
                        ? item.price.replace('₹', '') 
                        : item.price}
                    </p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id || item._id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id || item._id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id || item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-total">
                <h3>Total: ₹{calculateTotal()}</h3>
              </div>
              <button className="checkout-btn" onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
      
      {showCheckout && (
        <Checkout 
          cartItems={cartItems}
          total={calculateTotal()}
          onClose={() => setShowCheckout(false)}
          onOrderComplete={async () => {
            const total = calculateTotal()
            await addOrder([...cartItems], total) // Wait for order to save
            setOrderedItems([...cartItems])
            setShowCheckout(false)
            setShowSuccess(true)
            clearCart()
          }}
        />
      )}
      
      {showSuccess && (
        <OrderSuccess 
          orderedItems={orderedItems}
          onClose={() => {
            setShowSuccess(false)
            setOrderedItems([]) // Clear ordered items
            onClose() // Close cart as well
          }}
        />
      )}
    </div>
  )
}

export default Cart