import './About.css'

function About() {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          <h1>About Our Furniture Store</h1>
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                For over 20 years, we've been crafting beautiful, comfortable furniture 
                that transforms houses into homes. Our passion for quality and design 
                drives everything we do.
              </p>
              <h2>Our Mission</h2>
              <p>
                To provide exceptional furniture that combines style, comfort, and 
                durability at prices that make beautiful living accessible to everyone.
              </p>
              <div className="stats">
                <div className="stat">
                  <h3>10,000+</h3>
                  <p>Happy Customers</p>
                </div>
                <div className="stat">
                  <h3>500+</h3>
                  <p>Products</p>
                </div>
                <div className="stat">
                  <h3>20+</h3>
                  <p>Years Experience</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">🏠</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About