import './ProductDetail.css'

function ProductDetail({ product, onClose, onAddToCart }) {
  return (
    <div className="product-detail-overlay">
      <div className="product-detail-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="product-detail-content">
          <img src={product.image} alt={product.name} className="detail-image" />
          <div className="detail-info">
            <span className="detail-category">{product.category}</span>
            <h2>{product.name}</h2>
            <p className="detail-description">{product.description}</p>
            <p className="detail-price">₹{product.price}</p>
            <p className="detail-stock">Stock: {product.stock}</p>
            <button className="detail-add-btn" onClick={() => onAddToCart(product.id)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail