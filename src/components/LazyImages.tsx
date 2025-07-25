import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  width = 300, 
  height = 200, 
  className = '' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true, // Only trigger once when image comes into view
  })

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  return (
    <div 
      ref={ref}
      className={`lazy-image-container ${className}`}
      style={{ width, height }}
    >
      {inView && (
        <>
          {!isLoaded && !hasError && (
            <div className="image-placeholder">
              <div className="loading-skeleton" />
              <span className="loading-text">Loading...</span>
            </div>
          )}
          
          {hasError ? (
            <div className="image-error">
              <span>Failed to load image</span>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              onLoad={handleLoad}
              onError={handleError}
              className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
              loading="lazy" // Native lazy loading as fallback
            />
          )}
        </>
      )}
      
      {!inView && (
        <div className="image-placeholder">
          <div className="placeholder-content">
            <span>Image will load when visible</span>
          </div>
        </div>
      )}
    </div>
  )
}

const LazyImages: React.FC = () => {
  // Generate a list of images for demonstration
  const images = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    src: `https://picsum.photos/300/200?random=${index + 1}`,
    alt: `Random image ${index + 1}`,
  }))

  return (
    <div className="lazy-images-page">
      <header className="page-header">
        <h1>Lazy Loading Images Demo</h1>
        <p>
          Images are loaded only when they come into the viewport, reducing 
          initial page load time and bandwidth usage.
        </p>
      </header>

      <div className="performance-benefits">
        <div className="benefit-card">
          <h3>🚀 Faster Initial Load</h3>
          <p>Only above-the-fold images are loaded initially</p>
        </div>
        <div className="benefit-card">
          <h3>📱 Reduced Bandwidth</h3>
          <p>Images load only when needed, saving data</p>
        </div>
        <div className="benefit-card">
          <h3>⚡ Better Performance</h3>
          <p>Intersection Observer API for efficient detection</p>
        </div>
      </div>

      <div className="images-grid">
        {images.map((image) => (
          <LazyImage
            key={image.id}
            src={image.src}
            alt={image.alt}
            className="grid-image"
          />
        ))}
      </div>

      <div className="optimization-details">
        <h3>Implementation Details:</h3>
        <ul>
          <li><strong>Intersection Observer:</strong> Efficiently detects when images enter viewport</li>
          <li><strong>Progressive Enhancement:</strong> Falls back to native lazy loading</li>
          <li><strong>Loading States:</strong> Shows skeleton loaders while images load</li>
          <li><strong>Error Handling:</strong> Graceful fallback for failed image loads</li>
          <li><strong>Trigger Once:</strong> Observer disconnects after first trigger for performance</li>
        </ul>
      </div>
    </div>
  )
}

export default LazyImages