import './BrandsAnimation.css'

function BrandsAnimation() {
  const brands = [
    { name: 'IKEA', color: '#0051BA' },
    { name: 'Ashley', color: '#8B4513' },
    { name: 'West Elm', color: '#2E8B57' },
    { name: 'Pottery Barn', color: '#CD853F' },
    { name: 'Wayfair', color: '#9932CC' },
    { name: 'CB2', color: '#FF6347' },
    { name: 'Room & Board', color: '#4682B4' },
    { name: 'Article', color: '#FF8C00' }
  ]

  return (
    <div className="brands-animation">
      <div className="brands-scroll">
        {brands.concat(brands).map((brand, index) => (
          <div key={index} className="brand-item" style={{borderLeft: `4px solid ${brand.color}`}}>
            <div className="brand-name" style={{color: brand.color}}>{brand.name}</div>
            <div className="brand-tagline">Furniture Store</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BrandsAnimation