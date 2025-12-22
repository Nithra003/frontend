import { useState } from 'react'
import './Checkout.css'

function Checkout({ cartItems, total, onClose, onOrderComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate order processing
    setTimeout(() => {
      onOrderComplete()
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <div className="checkout-overlay">
      <div className="checkout-container">
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button className="close-checkout" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Customer Details</h3>
          
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          
          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          
          <input
            type="text"
            name="pincode"
            placeholder="Pin Code"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
            <p className="total-amount">Total: ₹{total}</p>
          </div>
          
          <button type="submit" className="place-order-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Checkout