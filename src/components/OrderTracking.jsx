import { useState } from 'react'
import './OrderTracking.css'

function OrderTracking({ orders = [] }) {
  const [trackingId, setTrackingId] = useState('')
  const [trackedOrder, setTrackedOrder] = useState(null)

  const orderStatuses = [
    { status: 'Order Placed', icon: '📋', completed: true },
    { status: 'Processing', icon: '⚙️', completed: true },
    { status: 'Shipped', icon: '🚚', completed: false },
    { status: 'Out for Delivery', icon: '🏃', completed: false },
    { status: 'Delivered', icon: '✅', completed: false }
  ]

  const trackOrder = () => {
    const order = orders.find(o => o.orderId === trackingId || o.orderId === parseInt(trackingId))
    if (order) {
      const dummyLocations = [
        'Chennai Warehouse',
        'Bangalore Distribution Center', 
        'Mumbai Sorting Facility',
        'Delhi Hub',
        'Out for Delivery - Your Area'
      ]
      
      setTrackedOrder({
        ...order,
        currentStatus: 'Shipped',
        estimatedDelivery: '2-3 business days',
        currentLocation: dummyLocations[2],
        trackingHistory: [
          { status: 'Order Placed', location: 'Chennai Warehouse', time: '2 days ago' },
          { status: 'Processing', location: 'Chennai Warehouse', time: '1 day ago' },
          { status: 'Shipped', location: 'Mumbai Sorting Facility', time: '6 hours ago' }
        ]
      })
    } else {
      setTrackedOrder(null)
      alert('Order not found')
    }
  }

  return (
    <div className="order-tracking">
      <div className="container">
        <h2>Track Your Order</h2>
        
        <div className="tracking-input">
          <input
            type="text"
            placeholder="Enter Order ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button onClick={trackOrder}>Track Order</button>
        </div>

        {trackedOrder && (
          <div className="tracking-result">
            <div className="order-info">
              <h3>Order #{trackedOrder.orderId}</h3>
              <p>Order Date: {trackedOrder.date}</p>
              <p>Total: ₹{trackedOrder.total}</p>
              <p>Current Location: <strong>{trackedOrder.currentLocation}</strong></p>
              <p>Estimated Delivery: {trackedOrder.estimatedDelivery}</p>
            </div>

            <div className="tracking-progress">
              {orderStatuses.map((step, index) => (
                <div key={index} className={`tracking-step ${step.completed ? 'completed' : ''}`}>
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-info">
                    <h4>{step.status}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="tracking-history">
              <h4>Tracking History:</h4>
              {trackedOrder.trackingHistory?.map((event, index) => (
                <div key={index} className="history-item">
                  <span className="history-status">{event.status}</span>
                  <span className="history-location">{event.location}</span>
                  <span className="history-time">{event.time}</span>
                </div>
              ))}
            </div>

            <div className="order-items">
              <h4>Items in this order:</h4>
              {trackedOrder.items.map((item, index) => (
                <div key={index} className="tracked-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                    <span className="item-price">₹{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderTracking