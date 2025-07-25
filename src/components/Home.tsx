import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Performance Optimization Demo</h1>
        <p className="hero-description">
          This application demonstrates various performance optimization techniques 
          for modern web applications, focusing on bundle size reduction, load time 
          improvements, and runtime performance optimizations.
        </p>
      </header>

      <section className="optimization-grid">
        <div className="card">
          <h3>🚀 Code Splitting</h3>
          <p>
            Lazy loading components with React.lazy() and Suspense to reduce 
            initial bundle size and improve Time to Interactive (TTI).
          </p>
          <ul>
            <li>Route-based code splitting</li>
            <li>Component-level lazy loading</li>
            <li>Dynamic imports for heavy libraries</li>
          </ul>
        </div>

        <div className="card">
          <h3>📦 Bundle Optimization</h3>
          <p>
            Vite configuration with optimized chunking, tree shaking, and 
            compression to minimize bundle size and maximize caching efficiency.
          </p>
          <ul>
            <li>Manual chunk splitting</li>
            <li>Vendor code separation</li>
            <li>Terser minification</li>
          </ul>
        </div>

        <div className="card">
          <h3>🖼️ Image Optimization</h3>
          <p>
            Lazy loading images with intersection observer, proper sizing, 
            and modern formats to reduce bandwidth and improve loading times.
          </p>
          <ul>
            <li>Intersection Observer API</li>
            <li>Responsive images</li>
            <li>Progressive loading</li>
          </ul>
        </div>

        <div className="card">
          <h3>📋 Virtualization</h3>
          <p>
            Virtual scrolling for large lists to maintain smooth performance 
            regardless of data size by only rendering visible items.
          </p>
          <ul>
            <li>React Window integration</li>
            <li>Dynamic item sizing</li>
            <li>Memory optimization</li>
          </ul>
        </div>

        <div className="card">
          <h3>💾 Caching Strategy</h3>
          <p>
            React Query for intelligent data caching, background updates, 
            and optimistic updates to improve perceived performance.
          </p>
          <ul>
            <li>Stale-while-revalidate</li>
            <li>Background refetching</li>
            <li>Query deduplication</li>
          </ul>
        </div>

        <div className="card">
          <h3>📱 Progressive Web App</h3>
          <p>
            Service worker implementation for offline functionality, 
            background sync, and improved loading performance.
          </p>
          <ul>
            <li>Workbox integration</li>
            <li>Runtime caching</li>
            <li>Offline fallbacks</li>
          </ul>
        </div>
      </section>

      <section className="performance-metrics">
        <h2>Key Performance Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">&lt; 1s</div>
            <div className="metric-label">First Contentful Paint</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">&lt; 2.5s</div>
            <div className="metric-label">Largest Contentful Paint</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">&lt; 100ms</div>
            <div className="metric-label">First Input Delay</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">&lt; 0.1</div>
            <div className="metric-label">Cumulative Layout Shift</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home