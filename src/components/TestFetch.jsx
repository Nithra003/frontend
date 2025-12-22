import { useEffect } from 'react'

function TestFetch() {
  useEffect(() => {
    // Simple fetch test
    fetch('http://localhost:5000/api/products')
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <p>Check console for API response</p>
    </div>
  )
}

export default TestFetch