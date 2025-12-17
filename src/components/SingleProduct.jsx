import { useState } from 'react'
import './SingleProduct.css'

function SingleProduct({ product, onBack, addToCart }) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    alert(`Added ${quantity} ${product.name}(s) to cart!`)
  }

  return (
    <div className="single-product">
      <button className="back-btn" onClick={onBack}>← Back to Products</button>
      <div className="product-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="main-image" />
        </div>
        <div className="product-details-section">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="price-section">
            <span className="current-price">{product.price}</span>
          </div>
          <p className="stock-info">Stock: {product.stock} available</p>
          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct