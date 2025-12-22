import './Header.css'
import logoImage from '../assets/InterioX.logo.jpg'

function Header({ currentPage, setCurrentPage, cartCount, onCartClick, onSearch, user, onLoginClick, onLogout }) {
  const handleNavClick = (page) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="logo" onClick={() => handleNavClick('home')}>
          <img src={logoImage} alt="InterioX" className="logo-image" />
        </div>
        <nav className="nav">
          <button 
            className={currentPage === 'home' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            className={currentPage === 'about' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => handleNavClick('about')}
          >
            About
          </button>
          <button 
            className={currentPage === 'products' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => handleNavClick('products')}
          >
            Products
          </button>
          <button 
            className={currentPage === 'services' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => handleNavClick('services')}
          >
            Services
          </button>
          <button 
            className={currentPage === 'contact' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => handleNavClick('contact')}
          >
            Contact
          </button>
          <button 
            className={currentPage === 'orders' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => handleNavClick('orders')}
          >
            Orders
          </button>
          <button 
            className={currentPage === 'wishlist' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => handleNavClick('wishlist')}
          >
            Wishlist
          </button>
        </nav>
        <div className="header-actions">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
              onChange={handleSearchChange}
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="cart-container">
            <button className="cart-btn" onClick={onCartClick}>🛒</button>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
          {user ? (
            <div className="user-menu">
              <span className="user-name">Hi, {user.name}</span>
              <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <button className="login-btn" onClick={onLoginClick}>Login</button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header