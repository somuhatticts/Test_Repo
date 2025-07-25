import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Performance Optimized App',
        short_name: 'PerfApp',
        description: 'A sample app showcasing performance optimizations',
        theme_color: '#646cff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/vite.svg',
            sizes: '32x32',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunk for better caching
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['react-query', 'react-window', 'react-intersection-observer']
        }
      }
    },
    // Enable source maps for production debugging
    sourcemap: true,
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  // Path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Enable compression
    compress: true,
    // Enable HTTP/2
    https: false
  }
})