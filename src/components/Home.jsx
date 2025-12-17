import Hero from './Hero'
import ProductGrid from './ProductGrid'

function Home({ addToCart, removeFromCart, onShopNow, onProductClick }) {
  return (
    <div className="home-page">
      <Hero onShopNow={onShopNow} />
      <ProductGrid addToCart={addToCart} removeFromCart={removeFromCart} onProductClick={onProductClick} />
    </div>
  )
}

export default Home








