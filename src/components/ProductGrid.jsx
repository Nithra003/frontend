import { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import ProductDetail from './ProductDetail'
import { productAPI } from '../services/api'
import './ProductGrid.css'

function ProductGrid({ addToCart, removeFromCart, onProductClick, searchQuery, addToWishlist, wishlistItems = [] }) {
  const [showForm, setShowForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState('')

  const fetchProducts = () => {
    setLoading(true)
    // Using initial products until backend is ready
    setProducts(initialProducts)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts();
  }, []);



  const handleAddProduct = async (newProduct) => {
    try {
      console.log('Adding product:', newProduct);
      const savedProduct = await productAPI.addProduct(newProduct);
      console.log('Product saved:', savedProduct);
      fetchProducts(); // Refresh the list
      setShowForm(false); // Close the form
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  const initialProducts = [
    { id: 1, name: 'Modern Sofa', description: 'Comfortable 3-seater sofa with premium fabric', price: '89900', image: 'https://www.royaloakindia.com/media/catalog/product/s/f/sf7008-3_11.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=800&canvas=800:500', stock: 15, category: 'Living Room' },
    { id: 2, name: 'Coffee Table', description: 'Solid acacia wood coffee table with steel frame', price: '29900', image: 'https://inmarwar.com/cdn/shop/products/coffee-table-made-of-solid-acacia-wood-and-carbon-steel-551513.jpg?v=1694500159&width=1080', stock: 8, category: 'Living Room' },
    { id: 3, name: 'Dining Set', description: '6-piece dining set with cushioned chairs', price: '129900', image: 'https://m.media-amazon.com/images/I/61MAzfI+4vL.jpg', stock: 5, category: 'Dining Room' },
    { id: 4, name: 'Bookshelf', description: '9-tier wooden bookshelf for storage', price: '39900', image: 'https://d1311wbk6unapo.cloudfront.net/NushopCatalogue/tr:f-webp,w-1200,fo-auto/63d518da8163fe00122d8cbf/cat_img/Decazone_Tree_Bookshelf__Small_Space_Saving_Corner_Bookcase__Rack_for_Study_Room_DIY_Wooden_Book_Stand_with_Storage_Space_for_Holds_Books__CDs__Games__Office__Livingroom__Bedroom__Dark_Brown__9_Tier__B16JJV6AWR_2025-03-25_1.jpg', stock: 12, category: 'Office' },
    { id: 5, name: 'Bed Frame', description: 'Queen size wooden bed frame with headboard', price: '69900', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQSxkF-UBDvjQnmqUMurvI9LUFYRszXpzqQo_Qy40kWSbKu-GoZWK5Yg_V9C7PUph80RneyecU5UiMyHm6vj7j04At1GCF0YeKAD5hYEkWv', stock: 7, category: 'Bedroom' },
    { id: 6, name: 'Wardrobe', description: '3-door wardrobe with mirror and drawers', price: '99900', image: 'https://www.nilkamalfurniture.com/cdn/shop/files/JOYCE3DRLS.webp?v=1753182079&width=360', stock: 3, category: 'Bedroom' }
  ]


  const handleAddToCart = (product) => {
    addToCart(product)
    setNotification(`${product.name} added to cart!`)
    setTimeout(() => setNotification(''), 3000)
  }

  const handleAddToWishlist = (product) => {
    const productId = product._id || product.id
    const isInWishlistNow = isInWishlist(productId)
    addToWishlist(product)
    if (isInWishlistNow) {
      setNotification(`${product.name} removed from wishlist!`)
    } else {
      setNotification(`${product.name} added to wishlist!`)
    }
    setTimeout(() => setNotification(''), 3000)
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => (item.id || item._id) === productId)
  }

  const filteredProducts = products.filter(product =>
    !searchQuery || 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <section className="product-grid">
        <div className="container">
          <h2>Loading products...</h2>
        </div>
      </section>
    )
  }

  return (
    <section className="product-grid">
      <div className="container">
        {notification && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#27ae60',
            color: 'white',
            padding: '1rem',
            borderRadius: '5px',
            zIndex: 1000
          }}>
            {notification}
          </div>
        )}
        <div className="products-header">
          <h2>Featured Products</h2>
          <div className="header-buttons">
            <button className="add-product-btn" onClick={() => setShowForm(true)}>
              Add New Product
            </button>
          </div>
        </div>
        <div className="grid">
          {filteredProducts.length === 0 && searchQuery ? (
            <div className="no-products">
              <p>No products found for "{searchQuery}"</p>
            </div>
          ) : (
            filteredProducts.map(product => (
            <div key={product._id || product.id} className="product-card">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image"
                onClick={() => onProductClick(product)}
              />
              <div className="product-info">
                <span className="category">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">₹{product.price}</p>
                <p className="stock">Stock: {product.stock}</p>
              </div>
              <div className="product-actions">
                <button 
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button 
                  className={`add-to-wishlist ${isInWishlist(product._id || product.id) ? 'in-wishlist' : ''}`}
                  onClick={() => handleAddToWishlist(product)}
                >
                  ♡
                </button>
              </div>
            </div>
          ))
          )}
        </div>
        {showForm && (
          <ProductForm 
            onAddProduct={handleAddProduct}
            onClose={() => setShowForm(false)}
          />
        )}
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </div>
    </section>
  )
}

export default ProductGrid