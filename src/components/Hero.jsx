import './Hero.css'

function Hero({ onShopNow }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>MAKE YOURSELF COMFORTABLE WITH OUR FURNITURE</h1>
          <p><i>Transform your space with our premium furniture collection. Modern designs that blend comfort with style.</i></p>
          <button className="hero-btn" onClick={onShopNow}>Shop Now</button>
        </div>
        <div className="hero-image">
          <div className="furniture-showcase">
            <div className="sofa-display"><img src="https://rukminim2.flixcart.com/image/480/640/xif0q/sofa-sectional/s/a/l/left-facing-235-black-355-polyester-no-95-027-homeify-84-black-original-imahadtvtanxcuvh.jpeg?q=90"/></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero