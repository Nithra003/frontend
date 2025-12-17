import './Services.css'

function Services() {
  const services = [
    {
      icon: '🚚',
      title: 'Free Delivery',
      description: 'Free delivery on orders over $500. Fast and reliable shipping to your doorstep.'
    },
    {
      icon: '🔧',
      title: 'Assembly Service',
      description: 'Professional assembly service available. Our experts will set up your furniture perfectly.'
    },
    {
      icon: '🏠',
      title: 'Interior Design',
      description: 'Personalized interior design consultation to help you create your dream space.'
    },
    {
      icon: '↩️',
      title: '30-Day Returns',
      description: 'Not satisfied? Return any item within 30 days for a full refund, no questions asked.'
    },
    {
      icon: '🛡️',
      title: 'Warranty',
      description: 'All our furniture comes with comprehensive warranty coverage for your peace of mind.'
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you with any questions or concerns.'
    }
  ]

  return (
    <div className="services-page">
      <div className="container">
        <div className="services-header">
          <h1>Our Services</h1>
          <p>We provide comprehensive services to make your furniture shopping experience exceptional</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h2>Need Help Choosing?</h2>
          <p>Our furniture experts are here to help you find the perfect pieces for your space.</p>
          <button className="contact-btn">Contact Our Experts</button>
        </div>
      </div>
    </div>
  )
}

export default Services