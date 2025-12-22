const API_BASE_URL = 'http://localhost:5000/api';

export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('API not available');
      const data = await response.json();
      console.log('✅ Backend connected - loaded products from MongoDB');
      return data;
    } catch (error) {
      console.log('❌ Backend not available, using local data');
      return [];
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      if (!response.ok) throw new Error('API not available');
      return response.json();
    } catch (error) {
      // Silently fall back to local data for category filtering
      return [];
    }
  },

  // Add new product
  addProduct: async (productData) => {
    try {
      console.log('Sending to backend:', productData);
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Backend response:', result);
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Get single product
  getProduct: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error('API not available');
      return response.json();
    } catch (error) {
      console.log('Backend not available');
      return null;
    }
  }
};

export const wishlistAPI = {
  // Get wishlist
  getWishlist: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist`);
      if (!response.ok) throw new Error('API not available');
      return response.json();
    } catch (error) {
      console.log('Backend not available, using localStorage');
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    }
  },

  // Add to wishlist
  addToWishlist: async (product) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!response.ok) throw new Error('API not available');
      return response.json();
    } catch (error) {
      console.log('Backend not available, using localStorage');
      return null;
    }
  },

  // Remove from wishlist
  removeFromWishlist: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('API not available');
      return response.json();
    } catch (error) {
      console.log('Backend not available, using localStorage');
      return null;
    }
  }
};

export const ordersAPI = {
  // Get orders
  getOrders: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) throw new Error('API not available');
      return response.json();
    } catch (error) {
      console.log('Backend not available, using localStorage');
      const saved = localStorage.getItem('orders');
      return saved ? JSON.parse(saved) : [];
    }
  },

  // Add order
  addOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (!response.ok) throw new Error('API not available');
      const result = await response.json();
      console.log('✅ Order saved to MongoDB:', result);
      return result;
    } catch (error) {
      console.log('❌ Backend not available for orders, using localStorage');
      return null;
    }
  }
};