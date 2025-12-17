import { useState } from 'react';
import { productAPI } from '../services/api';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    try {
      const allProducts = await productAPI.getAllProducts();
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
      setSearched(true);
    } catch (error) {
      console.error('Search error:', error);
      setProducts([]);
      setSearched(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
        />
        <button type="submit">Search</button>
      </form>

      {searched && (
        <div>
          {products.length > 0 ? (
            <div>
              {products.map(product => (
                <div key={product._id}>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Not found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;