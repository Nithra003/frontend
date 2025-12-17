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
      console.log('Backend not available, using local data');
      return [];
    }
  },

  // Add new product
  addProduct: async (productData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('API not available');
      return response.json();
    } catch (error) {
      console.log('Backend not available, using local storage');
      return { ...productData, id: Date.now() };
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

  