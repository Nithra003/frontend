import { useState, useEffect } from 'react'
import { productAPI } from '../services/api'
import './ConnectionStatus.css'

function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    checkConnection()
    const interval = setInterval(checkConnection, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const checkConnection = async () => {
    try {
      await productAPI.getAllProducts()
      if (!isOnline) {
        setIsOnline(true)
        setShowStatus(true)
        setTimeout(() => setShowStatus(false), 3000)
      }
    } catch (error) {
      if (isOnline) {
        setIsOnline(false)
        setShowStatus(true)
        setTimeout(() => setShowStatus(false), 5000)
      }
    }
  }

  if (!showStatus) return null

  return (
    <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? (
        <span>✅ Connected to server</span>
      ) : (
        <span>⚠️ Working offline - using local data</span>
      )}
    </div>
  )
}

export default ConnectionStatus