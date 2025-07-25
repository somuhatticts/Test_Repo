import React from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Loading...' 
}) => {
  const sizeClasses = {
    small: 'loading-small',
    medium: 'loading-medium',
    large: 'loading-large'
  }

  return (
    <div className="loading-container">
      <div className={`loading ${sizeClasses[size]}`} aria-label="Loading" />
      {message && <p className="loading-message">{message}</p>}
    </div>
  )
}

export default LoadingSpinner