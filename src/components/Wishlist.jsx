import './Wishlist.css'

function Wishlist({ wishlistItems = [], removeFromWishlist, addToCart, onProductClick }) {
  if (wishlistItems.length === 0) {
    return (
      <section className="wishlist">
        <div className="container">
          <h2>My Wishlist</h2>
          <div className="empty-wishlist">
            <p>Your wishlist is empty.</p>
            <p>Save products you love to view them here!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="wishlist">
      <div className="container">
        <h2>My Wishlist</h2>
        <div className="wishlist-grid">
          {wishlistItems.map(product => (
            <div key={product._id || product.id} className="wishlist-card">
              <div className="wishlist-image-container">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="wishlist-image"
                  onClick={() => onProductClick(product)}
                />
                <button 
                  className="remove-wishlist-btn"
                  onClick={() => removeFromWishlist(product._id || product.id)}
                >
                  ×
                </button>
              </div>
              <div className="wishlist-info">
                <span className="wishlist-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="wishlist-description">{product.description}</p>
                <p className="wishlist-price">₹{product.price}</p>
                <p className="wishlist-stock">Stock: {product.stock}</p>
              </div>
              <div className="wishlist-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Wishlist