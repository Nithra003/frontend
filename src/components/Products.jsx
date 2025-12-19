import { useState, useEffect } from 'react'
import { productAPI } from '../services/api'
import './Products.css'

function Products({ addToCart, removeFromCart, onProductClick, onCategoryClick, searchQuery }) {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const data = await productAPI.getAllProducts()
      if (data.length === 0) {
        setFeaturedProducts(defaultFeaturedProducts)
      } else {
        setFeaturedProducts(data.slice(0, 8))
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setFeaturedProducts(defaultFeaturedProducts)
    } finally {
      setLoading(false)
    }
  }
  
  const categories = [
    { name: 'Living Room', icon: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop', count: '120+ items' },
    { name: 'Bedroom', icon: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=200&fit=crop', count: '85+ items' },
    { name: 'Dining Room', icon: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop', count: '65+ items' },
    { name: 'Office', icon: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop', count: '45+ items' },
    { name: 'Storage', icon: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop', count: '75+ items' },
    { name: 'Outdoor', icon: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop', count: '30+ items' }
  ]

  const defaultFeaturedProducts = [
    { id: 1, name: 'Premium Sofa Set', description: 'Luxurious 3-seater sofa with premium fabric and modern design', price: '$1,299', image: 'https://www.royaloakindia.com/media/catalog/product/s/f/sf7008-3_11.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=800&canvas=800:500', rating: '⭐⭐⭐⭐⭐', stock: 12, category: 'Living Room' },
    { id: 2, name: 'Modern Coffee Table', description: 'Solid acacia wood coffee table with steel frame', price: '$399', image: 'https://inmarwar.com/cdn/shop/products/coffee-table-made-of-solid-acacia-wood-and-carbon-steel-551513.jpg?v=1694500159&width=1080', rating: '⭐⭐⭐⭐⭐', stock: 8, category: 'Living Room' },
    { id: 3, name: 'Luxury Bed Frame', description: 'Queen size wooden bed frame with elegant headboard', price: '$899', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQSxkF-UBDvjQnmqUMurvI9LUFYRszXpzqQo_Qy40kWSbKu-GoZWK5Yg_V9C7PUph80RneyecU5UiMyHm6vj7j04At1GCF0YeKAD5hYEkWv', rating: '⭐⭐⭐⭐⭐', stock: 6, category: 'Bedroom' },
    { id: 4, name: 'Executive Desk', description: 'Professional office desk with storage compartments', price: '$699', image: 'https://m.media-amazon.com/images/I/71QX7Q7HXQL._AC_UF894,1000_QL80_.jpg', rating: '⭐⭐⭐⭐⭐', stock: 10, category: 'Office' },
    { id: 5, name: 'Ergonomic Office Chair', description: 'High-back mesh office chair with lumbar support', price: '$299', image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=400&fit=crop', rating: '⭐⭐⭐⭐⭐', stock: 15, category: 'Office' },
    { id: 6, name: 'Dining Table Set', description: '6-seater oak dining table with matching chairs', price: '$1,199', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop', rating: '⭐⭐⭐⭐⭐', stock: 5, category: 'Dining Room' },
    { id: 7, name: 'Bookshelf Cabinet', description: '5-tier wooden bookshelf with adjustable shelves', price: '$249', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', rating: '⭐⭐⭐⭐⭐', stock: 20, category: 'Storage' },
    { id: 8, name: 'Nightstand Pair', description: 'Set of 2 matching bedside tables with drawers', price: '$179', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop', rating: '⭐⭐⭐⭐⭐', stock: 12, category: 'Bedroom' },
    { id: 9, name: 'Outdoor Patio Set', description: 'Weather-resistant 4-piece patio furniture set', price: '$599', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', rating: '⭐⭐⭐⭐⭐', stock: 8, category: 'Outdoor' },
    { id: 10, name: 'TV Entertainment Unit', description: 'Modern TV stand with cable management and storage', price: '$449', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', rating: '⭐⭐⭐⭐⭐', stock: 14, category: 'Living Room' },
    { id: 11, name: 'Wardrobe Closet', description: '3-door wardrobe with mirror and hanging space', price: '$799', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop', rating: '⭐⭐⭐⭐⭐', stock: 7, category: 'Bedroom' },
    { id: 12, name: 'Bar Stool Set', description: 'Set of 4 adjustable height bar stools', price: '$199', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop', rating: '⭐⭐⭐⭐⭐', stock: 16, category: 'Dining Room' }
  ]

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const filteredProducts = featuredProducts.filter(product =>
    product.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    product.description.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    product.category.toLowerCase().includes((searchQuery || '').toLowerCase())
  )

  return (
    <div className="products-page">
      <div className="container">
        <h1>Our Products</h1>
        
        <section className="categories-section">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card" onClick={() => onCategoryClick(category.name)}>
                <img src={category.icon} alt={category.name} className="category-icon" />
                <h3>{category.name}</h3>
                <p>{category.count}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="featured-section">
          <h2>{searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}</h2>
          <div className="products-grid">
            {loading ? (
              <p>Loading products...</p>
            ) : filteredProducts.length === 0 && searchQuery ? (
              <div className="no-products">
                <p>No products found for "{searchQuery}"</p>
              </div>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id || product._id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" onClick={() => onProductClick(product)} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="rating">{product.rating || '⭐⭐⭐⭐⭐'}</div>
                    <p className="price">{product.price}</p>
                    <button 
                      className="add-to-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Products