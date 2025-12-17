import { useState } from 'react'
import './ProductForm.css'

function ProductForm({ onAddProduct, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    category: 'Living Room'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!formData.name || !formData.price || !formData.stock) {
      setError('Please fill in all required fields')
      return
    }
    
    if (parseFloat(formData.price) <= 0) {
      setError('Price must be greater than 0')
      return
    }
    
    if (parseInt(formData.stock) < 0) {
      setError('Stock cannot be negative')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const productData = {
        ...formData,
        price: formData.price.toString(),
        stock: parseInt(formData.stock),
        image: formData.image || 'https://via.placeholder.com/300x200?text=No+Image'
      }
      await onAddProduct(productData)
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        stock: '',
        category: 'Living Room'
      })
      onClose()
    } catch (error) {
      setError('Failed to add product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h3>Add New Product</h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price (without $)"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={formData.stock}
            onChange={handleChange}
            required
          />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Living Room">Living Room</option>
            <option value="Dining Room">Dining Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Office">Office</option>
          </select>
          <div className="form-buttons">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>
            <button type="button" onClick={onClose} disabled={isSubmitting}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm