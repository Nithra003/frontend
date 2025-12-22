import { useState, useEffect } from 'react'
import { wishlistAPI, ordersAPI } from './services/api'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Products from './components/Products'
import Services from './components/Services'
import Contact from './components/Contact'
import Orders from './components/Orders'
import Wishlist from './components/Wishlist'
import SingleProduct from './components/SingleProduct'
import CategoryView from './components/CategoryView'
import Cart from './components/Cart'
import Auth from './components/Auth'
import BrandsAnimation from './components/BrandsAnimation'
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
  const [orders, setOrders] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Load data on app start
  useEffect(() => {
    loadWishlist()
    loadOrders()
    loadCart()
  }, [])

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const loadWishlist = async () => {
    const wishlist = await wishlistAPI.getWishlist()
    setWishlistItems(wishlist)
  }

  const loadOrders = async () => {
    const orders = await ordersAPI.getOrders()
    setOrders(orders)
  }

  const addOrder = async (orderItems, total) => {
    const newOrder = {
      items: orderItems,
      total: total,
      date: new Date().toLocaleDateString(),
      orderId: Date.now().toString()
    }
    
    // Try to save to backend first
    try {
      const savedOrder = await ordersAPI.addOrder(newOrder)
      if (savedOrder) {
        console.log('✅ Order saved to database')
        const updatedOrders = [...orders, savedOrder]
        setOrders(updatedOrders)
        return
      }
    } catch (error) {
      console.log('❌ Failed to save order to database, using localStorage')
    }
    
    // Fallback to localStorage
    const updatedOrders = [...orders, newOrder]
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
  }

  const addToWishlist = (product) => {
    const productId = product.id || product._id
    const isAlreadyInWishlist = wishlistItems.find(item => (item.id || item._id) === productId)
    let updatedWishlist
    if (isAlreadyInWishlist) {
      // Remove from wishlist
      updatedWishlist = wishlistItems.filter(item => (item.id || item._id) !== productId)
    } else {
      // Add to wishlist
      updatedWishlist = [...wishlistItems, { ...product, id: productId }]
    }
    setWishlistItems(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
  }

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => (item.id || item._id) !== productId)
    setWishlistItems(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
  }

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

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
  }

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleShopNow = () => {
    setCurrentPage('products')
  }

  const handleProductClick = (product) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedProduct(product)
      setCurrentPage('single-product')
      setIsLoading(false)
    }, 2000)
  }

  const handleBackToProducts = () => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedProduct(null)
      setCurrentPage('products')
      setIsLoading(false)
    }, 1500)
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
      case 'home': return <Home addToCart={addToCart} onShopNow={handleShopNow} onProductClick={handleProductClick} addToWishlist={addToWishlist} wishlistItems={wishlistItems} />
      case 'about': return <About />
      case 'products': return <Products addToCart={addToCart} onProductClick={handleProductClick} onCategoryClick={handleCategoryClick} searchQuery={searchQuery} addToWishlist={addToWishlist} wishlistItems={wishlistItems} />
      case 'services': return <Services />
      case 'contact': return <Contact />
      case 'orders': return <Orders orders={orders} />
      case 'wishlist': return <Wishlist wishlistItems={wishlistItems} removeFromWishlist={removeFromWishlist} addToCart={addToCart} onProductClick={handleProductClick} />
      case 'single-product': return selectedProduct ? <SingleProduct product={selectedProduct} onBack={handleBackToProducts} addToCart={addToCart} /> : <Products addToCart={addToCart} onProductClick={handleProductClick} onCategoryClick={handleCategoryClick} searchQuery={searchQuery} />
      case 'category-view': return selectedCategory ? <CategoryView category={selectedCategory} onBack={handleBackToCategories} onProductClick={handleProductClick} addToCart={addToCart} /> : <Products addToCart={addToCart} onProductClick={handleProductClick} onCategoryClick={handleCategoryClick} searchQuery={searchQuery} />
      default: return <Home addToCart={addToCart} onShopNow={handleShopNow} onProductClick={handleProductClick} />
    }
  }

  return (
    <div className="app">
      {isLoading && <LoadingAnimation />}
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
          clearCart={clearCart}
          addOrder={addOrder}
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
