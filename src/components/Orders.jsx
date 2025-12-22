import './Orders.css'

function Orders({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <section className="orders">
        <div className="container">
          <h2>My Orders</h2>
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="orders">
      <div className="container">
        <h2>My Orders</h2>
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <h3>Order #{index + 1}</h3>
                <span className="order-date">{order.date}</span>
              </div>
              <div className="order-items">
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <div className="order-item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="order-item-price">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Total: ₹{order.total}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Orders