import { useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Products from './components/Products'
import Services from './components/Services'
import Contact from './components/Contact'
import SingleProduct from './components/SingleProduct'
import CategoryView from './components/CategoryView'
import Cart from './components/Cart'
import Auth from './components/Auth'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cartItems, setCartItems] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showCart, setShowCart] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState(null)
  const [showAuth, setShowAuth] = useState(false)

  const addToCart = (product) => {
    setCartItems(prev => {
      const productId = product.id || product._id
      const existingItem = prev.find(item => (item.id || item._id) === productId)
      if (existingItem) {
        return prev.map(item => 
          (item.id || item._id) === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { ...product, id: productId, quantity: 1 }]
      }
    })
  }

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(prev => 
        prev.map(item => 
          (item.id || item._id) === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    }
  }

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => (item.id || item._id) !== productId))
  }

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleShopNow = () => {
    setCurrentPage('products')
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setCurrentPage('single-product')
  }

  const handleBackToProducts = () => {
    setSelectedProduct(null)
    setCurrentPage('products')
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setCurrentPage('category-view')
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setCurrentPage('products')
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query && currentPage !== 'products') {
      setCurrentPage('products')
    }
  }

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home addToCart={addToCart} onShopNow={handleShopNow} onProductClick={handleProductClick} />
      case 'about': return <About />
      case 'products': return <Products addToCart={addToCart} onProductClick={handleProductClick} onCategoryClick={handleCategoryClick} searchQuery={searchQuery} />
      case 'services': return <Services />
      case 'contact': return <Contact />
      case 'single-product': return selectedProduct ? <SingleProduct product={selectedProduct} onBack={handleBackToProducts} addToCart={addToCart} /> : <Products addToCart={addToCart} onProductClick={handleProductClick} onCategoryClick={handleCategoryClick} searchQuery={searchQuery} />
      case 'category-view': return selectedCategory ? <CategoryView category={selectedCategory} onBack={handleBackToCategories} onProductClick={handleProductClick} addToCart={addToCart} /> : <Products addToCart={addToCart} onProductClick={handleProductClick} onCategoryClick={handleCategoryClick} searchQuery={searchQuery} />
      default: return <Home addToCart={addToCart} onShopNow={handleShopNow} onProductClick={handleProductClick} />
    }
  }

  return (
    <div className="app">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartCount={getTotalCartItems()} 
        onCartClick={() => setShowCart(true)} 
        onSearch={handleSearch}
        user={user}
        onLoginClick={() => setShowAuth(true)}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      {showCart && (
        <Cart 
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          updateQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
        />
      )}
      {showAuth && (
        <Auth 
          onLogin={handleLogin}
          onClose={() => setShowAuth(false)}
        />
      )}

    </div>
  )
}

export default App
