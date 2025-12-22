import Hero from './Hero'
import ProductGrid from './ProductGrid'
import BrandsAnimation from './BrandsAnimation'

function Home({ addToCart, removeFromCart, onShopNow, onProductClick, addToWishlist, wishlistItems }) {
  return (
    <div className="home-page">
      <Hero onShopNow={onShopNow} />
      <BrandsAnimation />
      <ProductGrid 
        addToCart={addToCart} 
        removeFromCart={removeFromCart} 
        onProductClick={onProductClick} 
        addToWishlist={addToWishlist}
        wishlistItems={wishlistItems}
      />
    </div>
  )
}

export default Home








