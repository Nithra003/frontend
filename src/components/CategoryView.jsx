import { useState, useEffect } from 'react'
import { productAPI } from '../services/api'
import './CategoryView.css'

function CategoryView({ category, onBack, onProductClick, addToCart }) {
  const [categoryProducts, setCategoryProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategoryProducts()
  }, [category])

  const fetchCategoryProducts = async () => {
    try {
      const data = await productAPI.getProductsByCategory(category)
      if (data.length === 0) {
        const fallbackProducts = allProducts.filter(product => product.category === category)
        setCategoryProducts(fallbackProducts)
      } else {
        setCategoryProducts(data)
      }
    } catch (error) {
      console.error('Error fetching category products:', error)
      const fallbackProducts = allProducts.filter(product => product.category === category)
      setCategoryProducts(fallbackProducts)
    } finally {
      setLoading(false)
    }
  }

  const allProducts = [
    { id: 1, name: 'Modern Sofa', description: 'Comfortable 3-seater sofa with premium fabric', price: '₹899', image: 'https://www.royaloakindia.com/media/catalog/product/s/f/sf7008-3_11.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=800&canvas=800:500', stock: 15, category: 'Living Room' },
    { id: 2, name: 'Coffee Table', description: 'Solid acacia wood coffee table with steel frame', price: '₹299', image: 'https://inmarwar.com/cdn/shop/products/coffee-table-made-of-solid-acacia-wood-and-carbon-steel-551513.jpg?v=1694500159&width=1080', stock: 8, category: 'Living Room' },
    { id: 7, name: 'Recliner Chair', description: 'Comfortable leather recliner with footrest', price: '₹599', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', stock: 6, category: 'Living Room' },
    { id: 5, name: 'Bed Frame', description: 'Queen size wooden bed frame with headboard', price: '₹699', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQSxkF-UBDvjQnmqUMurvI9LUFYRszXpzqQo_Qy40kWSbKu-GoZWK5Yg_V9C7PUph80RneyecU5UiMyHm6vj7j04At1GCF0YeKAD5hYEkWv', stock: 7, category: 'Bedroom' },
    { id: 6, name: 'Wardrobe', description: '3-door wardrobe with mirror and drawers', price: '₹999', image: 'https://www.nilkamalfurniture.com/cdn/shop/files/JOYCE3DRLS.webp?v=1753182079&width=360', stock: 3, category: 'Bedroom' },
    { id: 8, name: 'Nightstand', description: 'Wooden nightstand with 2 drawers', price: '₹199', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop', stock: 12, category: 'Bedroom' },
    { id: 3, name: 'Dining Set', description: '6-piece dining set with cushioned chairs', price: '₹1299', image: 'https://m.media-amazon.com/images/I/61MAzfI+4vL.jpg', stock: 5, category: 'Dining Room' },
    { id: 9, name: 'Bar Stools', description: 'Set of 2 adjustable bar stools', price: '₹249', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop', stock: 8, category: 'Dining Room' },
    { id: 4, name: 'Bookshelf', description: '9-tier wooden bookshelf for storage', price: '₹399', image: 'https://d1311wbk6unapo.cloudfront.net/NushopCatalogue/tr:f-webp,w-1200,fo-auto/63d518da8163fe00122d8cbf/cat_img/Decazone_Tree_Bookshelf__Small_Space_Saving_Corner_Bookcase__Rack_for_Study_Room_DIY_Wooden_Book_Stand_with_Storage_Space_for_Holds_Books__CDs__Games__Office__Livingroom__Bedroom__Dark_Brown__9_Tier__B16JJV6AWR_2025-03-25_1.jpg', stock: 12, category: 'Office' },
    { id: 10, name: 'Office Chair', description: 'Ergonomic office chair with lumbar support', price: '₹299', image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=400&fit=crop', stock: 15, category: 'Office' },
    { id: 11, name: 'Storage Cabinet', description: 'Multi-purpose storage cabinet with shelves', price: '₹349', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', stock: 10, category: 'Storage' },
    { id: 12, name: 'Patio Set', description: 'Outdoor dining set for 4 people', price: '₹799', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', stock: 4, category: 'Outdoor' }
  ]

  if (loading) {
    return (
      <div className="category-view">
        <div className="category-header">
          <h1>Loading {category} products...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="category-view">
      <div className="category-header">
        <button className="back-btn" onClick={onBack}>← Back to Categories</button>
        <h1>{category} Furniture</h1>
        <p>{categoryProducts.length} products available</p>
      </div>
      
      <div className="category-products-grid">
        {categoryProducts.map(product => (
          <div key={product.id} className="category-product-card">
            <img 
              src={product.image} 
              alt={product.name} 
              className="category-product-image"
              onClick={() => onProductClick(product)}
            />
            <div className="category-product-info">
              <h3>{product.name}</h3>
              <p className="category-product-description">{product.description}</p>
              <p className="category-product-price">{product.price}</p>
              <p className="category-product-stock">Stock: {product.stock}</p>
              <button 
                className="category-add-to-cart"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryView