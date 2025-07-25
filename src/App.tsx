import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundary'
import LoadingSpinner from '@/components/LoadingSpinner'
import Navigation from '@/components/Navigation'
import './App.css'

// Lazy load components for code splitting
const Home = lazy(() => import('@/components/Home'))
const VirtualizedList = lazy(() => import('@/components/VirtualizedList'))
const LazyImages = lazy(() => import('@/components/LazyImages'))
const PerformanceDemo = lazy(() => import('@/components/PerformanceDemo'))

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <Navigation />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/virtualized" element={<VirtualizedList />} />
              <Route path="/lazy-images" element={<LazyImages />} />
              <Route path="/performance" element={<PerformanceDemo />} />
            </Routes>
          </Suspense>
        </main>
      </ErrorBoundary>
    </div>
  )
}

export default App