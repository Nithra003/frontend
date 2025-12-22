import { useState, useEffect } from 'react'
import './Hero.css'


function Hero({ onShopNow }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 7)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 10000) // Resume after 10 seconds
  }
  return (
    <section className="hero">
      <div className="brand-logo">
        <div className="logo-icon">IX</div>
        <div className="logo-text">InterioX</div>
      </div>
      
      <div className="hero-slides-container" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
        <div className="hero-slide">
          <div className="hero-content">
            <div className="hero-text">
              <h1>MAKE YOURSELF COMFORTABLE WITH OUR FURNITURE</h1>
              <p><i>Transform your space with our premium furniture collection.</i></p>
              <button className="hero-btn" onClick={onShopNow}>Shop Now</button>
            </div>
          </div>
        </div>
        <div className="hero-slide">
          <div className="hero-content">
            <div className="hero-text">
              <h1>MEGA SALE - UP TO 60% OFF</h1>
              <p><i>Premium bedroom furniture at unbeatable prices. Limited time offer!</i></p>
              <button className="hero-btn slide-2-btn" onClick={onShopNow}>Grab Deal</button>
            </div>
          </div>
        </div>
        <div className="hero-slide">
          <div className="hero-content">
            <div className="hero-text">
              <h1>LUXURY DINING COLLECTION</h1>
              <p><i>Elegant dining sets starting from ₹25,999. Free home delivery!</i></p>
              <button className="hero-btn slide-3-btn" onClick={onShopNow}>
                <span className="btn-offer">FREE SHIP</span>
                Shop Dining
              </button>
            </div>
          </div>
        </div>
        <div className="hero-slide">
          <div className="hero-content">
            <div className="hero-text">
              <h1>OFFICE FURNITURE BONANZA</h1>
              <p><i>Complete office setup packages with 40% discount. Bulk orders welcome!</i></p><br /><br />
              <button className="hero-btn slide-4-btn" onClick={onShopNow}>Office Deals</button>
            </div>
          </div>
        </div>
        <div className="hero-slide">
          <div className="hero-content">
            <div className="hero-text">
              <h1>FESTIVE SPECIAL OFFERS</h1><br /><br />
              <p><i>Celebrate with new furniture! Extra 25% off on storage solutions.</i></p><br /><br />
              <button className="hero-btn slide-5-btn" onClick={onShopNow}>Festival Sale</button>
            </div>
          </div>
        </div>
        <div className="hero-slide">
          <div className="hero-content">
            <div className="hero-text">
              <h1>BEDROOM MAKEOVER SALE</h1>
              <p><i>Complete bedroom sets with mattress included. Transform your sleep space!</i></p>
              <button className="hero-btn slide-6-btn" onClick={onShopNow}>Bedroom Sets</button>
            </div>
          </div>
        </div>
        <div className="hero-slide">
          <div className="hero-content">
            <div className="hero-text">
              <h1>TV UNIT COLLECTION</h1>
              <p><i>Modern entertainment centers and TV stands. Perfect for your living room setup!</i></p>
              <button className="hero-btn slide-7-btn" onClick={onShopNow}>TV Units</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="swiper-pagination">
        {[0, 1, 2, 3, 4, 5, 6].map(index => (
          <div 
            key={index}
            className={`swiper-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  )
}

export default Hero