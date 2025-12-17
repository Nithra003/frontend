import { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import ProductDetail from './ProductDetail'
import { productAPI } from '../services/api'
import './ProductGrid.css'

function ProductGrid({ addToCart, removeFromCart, onProductClick, searchQuery }) {
  const [showForm, setShowForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Set initial products immediately, then try to fetch from API
    setProducts(initialProducts)
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getAllProducts()
      if (data.length > 0) {
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // Keep initial products if API fails
    }
  }



  const handleAddProduct = async (newProduct) => {
    try {
      const savedProduct = await productAPI.addProduct(newProduct)
      setProducts(prev => [...prev, savedProduct])
    } catch (error) {
      console.error('Error adding product:', error)
      // Add to local state if backend fails
      const localProduct = {
        ...newProduct,
        id: Date.now()
      }
      setProducts(prev => [...prev, localProduct])
    }
  }

  const initialProducts = [
    { id: 1, name: 'Modern Sofa', description: 'Comfortable 3-seater sofa with premium fabric', price: '$899', image: 'https://www.royaloakindia.com/media/catalog/product/s/f/sf7008-3_11.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=800&canvas=800:500', stock: 15, category: 'Living Room' },
    { id: 2, name: 'Coffee Table', description: 'Solid acacia wood coffee table with steel frame', price: '$299', image: 'https://inmarwar.com/cdn/shop/products/coffee-table-made-of-solid-acacia-wood-and-carbon-steel-551513.jpg?v=1694500159&width=1080', stock: 8, category: 'Living Room' },
    { id: 3, name: 'Dining Set', description: '6-piece dining set with cushioned chairs', price: '$1299', image: 'https://m.media-amazon.com/images/I/61MAzfI+4vL.jpg', stock: 5, category: 'Dining Room' },
    { id: 4, name: 'Bookshelf', description: '9-tier wooden bookshelf for storage', price: '$399', image: 'https://d1311wbk6unapo.cloudfront.net/NushopCatalogue/tr:f-webp,w-1200,fo-auto/63d518da8163fe00122d8cbf/cat_img/Decazone_Tree_Bookshelf__Small_Space_Saving_Corner_Bookcase__Rack_for_Study_Room_DIY_Wooden_Book_Stand_with_Storage_Space_for_Holds_Books__CDs__Games__Office__Livingroom__Bedroom__Dark_Brown__9_Tier__B16JJV6AWR_2025-03-25_1.jpg', stock: 12, category: 'Office' },
    { id: 5, name: 'Bed Frame', description: 'Queen size wooden bed frame with headboard', price: '$699', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQSxkF-UBDvjQnmqUMurvI9LUFYRszXpzqQo_Qy40kWSbKu-GoZWK5Yg_V9C7PUph80RneyecU5UiMyHm6vj7j04At1GCF0YeKAD5hYEkWv', stock: 7, category: 'Bedroom' },
    { id: 6, name: 'Wardrobe', description: '3-door wardrobe with mirror and drawers', price: '$999', image: 'https://www.nilkamalfurniture.com/cdn/shop/files/JOYCE3DRLS.webp?v=1753182079&width=360', stock: 3, category: 'Bedroom' }
  ]


  const handleAddToCart = (product) => {
    addToCart(product)
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
            <div key={product.id} className="product-card">
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
                <p className="price">{product.price}</p>
                <p className="stock">Stock: {product.stock}</p>
              </div>
              <button 
                className="add-to-cart"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
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