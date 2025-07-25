import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useQuery } from 'react-query'

// Simulated heavy computation
const heavyComputation = (n: number): number => {
  let result = 0
  for (let i = 0; i < n * 1000000; i++) {
    result += Math.random()
  }
  return result
}

// Simulated API call
const fetchData = async (id: number): Promise<{ id: number; data: string; timestamp: number }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    id,
    data: `Data for item ${id}`,
    timestamp: Date.now()
  }
}

// Component that demonstrates expensive operations
const ExpensiveComponent: React.FC<{ count: number }> = React.memo(({ count }) => {
  const expensiveValue = useMemo(() => {
    console.log('Expensive computation running...')
    return heavyComputation(count)
  }, [count])

  return (
    <div className="expensive-component">
      <h4>Expensive Computation Result</h4>
      <p>Input: {count}</p>
      <p>Result: {expensiveValue.toFixed(2)}</p>
      <p className="memo-note">
        ✅ This component uses React.memo and useMemo to prevent unnecessary recalculations
      </p>
    </div>
  )
})

ExpensiveComponent.displayName = 'ExpensiveComponent'

const PerformanceDemo: React.FC = () => {
  const [count, setCount] = useState(1)
  const [dataId, setDataId] = useState(1)
  const [renderCount, setRenderCount] = useState(0)
  const [performanceMetrics, setPerformanceMetrics] = useState<{
    renderTime: number
    memoryUsage: number
  }>({ renderTime: 0, memoryUsage: 0 })

  // Memoized callback to prevent unnecessary re-renders
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const handleDecrement = useCallback(() => {
    setCount(prev => Math.max(1, prev - 1))
  }, [])

  // React Query for data fetching with caching
  const { data, isLoading, error, refetch } = useQuery(
    ['data', dataId],
    () => fetchData(dataId),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    }
  )

  // Performance monitoring
  useEffect(() => {
    const startTime = performance.now()
    setRenderCount(prev => prev + 1)

    // Measure render time
    const endTime = performance.now()
    const renderTime = endTime - startTime

    // Get memory usage (if available)
    const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0

    setPerformanceMetrics({
      renderTime,
      memoryUsage: memoryUsage / 1024 / 1024 // Convert to MB
    })
  })

  return (
    <div className="performance-demo-page">
      <header className="page-header">
        <h1>Performance Optimization Demo</h1>
        <p>
          This page demonstrates various React performance optimization techniques 
          and shows real-time performance metrics.
        </p>
      </header>

      <div className="performance-metrics">
        <h2>Real-time Performance Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">{renderCount}</div>
            <div className="metric-label">Total Renders</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{performanceMetrics.renderTime.toFixed(2)}ms</div>
            <div className="metric-label">Last Render Time</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{performanceMetrics.memoryUsage.toFixed(2)}MB</div>
            <div className="metric-label">Memory Usage</div>
          </div>
        </div>
      </div>

      <div className="demo-sections">
        <section className="performance-section">
          <h2>Memoization Demo</h2>
          <p>
            This section demonstrates React.memo, useMemo, and useCallback 
            to prevent unnecessary re-renders and computations.
          </p>
          
          <div className="controls">
            <button className="btn" onClick={handleDecrement}>
              Decrease Count
            </button>
            <span className="count-display">Count: {count}</span>
            <button className="btn" onClick={handleIncrement}>
              Increase Count
            </button>
          </div>

          <ExpensiveComponent count={count} />
        </section>

        <section className="performance-section">
          <h2>Data Fetching with Caching</h2>
          <p>
            React Query provides intelligent caching, background updates, 
            and optimistic updates for better perceived performance.
          </p>
          
          <div className="controls">
            <button 
              className="btn" 
              onClick={() => setDataId(prev => prev + 1)}
            >
              Fetch Next Data
            </button>
            <button 
              className="btn" 
              onClick={() => refetch()}
              disabled={isLoading}
            >
              Refetch Current
            </button>
          </div>

          <div className="data-display">
            {isLoading && <div className="loading">Loading data...</div>}
            {error && <div className="error">Error loading data</div>}
            {data && (
              <div className="data-result">
                <h4>Cached Data (ID: {data.id})</h4>
                <p>{data.data}</p>
                <p className="timestamp">
                  Fetched at: {new Date(data.timestamp).toLocaleTimeString()}
                </p>
                <p className="cache-note">
                  ✅ This data is cached for 5 minutes and will be served instantly on repeat requests
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="performance-section">
          <h2>Optimization Techniques Used</h2>
          <div className="techniques-grid">
            <div className="technique-card">
              <h4>React.memo</h4>
              <p>Prevents re-rendering of components when props haven't changed</p>
            </div>
            <div className="technique-card">
              <h4>useMemo</h4>
              <p>Memoizes expensive computations to avoid recalculation</p>
            </div>
            <div className="technique-card">
              <h4>useCallback</h4>
              <p>Memoizes functions to prevent unnecessary re-renders of child components</p>
            </div>
            <div className="technique-card">
              <h4>React Query</h4>
              <p>Intelligent caching and background synchronization of server state</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PerformanceDemo