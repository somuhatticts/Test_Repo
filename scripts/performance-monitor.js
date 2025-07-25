#!/usr/bin/env node

/**
 * Performance Monitoring Script
 * Tracks bundle sizes, build times, and other performance metrics
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const PERFORMANCE_LOG = path.join(__dirname, '..', 'performance-log.json');

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundleSize() {
  if (!fs.existsSync(DIST_DIR)) {
    console.log('❌ Dist directory not found. Run build first.');
    return null;
  }

  const assets = fs.readdirSync(DIST_DIR, { recursive: true })
    .filter(file => typeof file === 'string')
    .map(file => {
      const filePath = path.join(DIST_DIR, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile()) {
        return {
          name: file,
          size: stats.size,
          type: path.extname(file)
        };
      }
      return null;
    })
    .filter(Boolean);

  const jsFiles = assets.filter(asset => asset.type === '.js');
  const cssFiles = assets.filter(asset => asset.type === '.css');
  
  const totalSize = assets.reduce((sum, asset) => sum + asset.size, 0);
  const jsSize = jsFiles.reduce((sum, asset) => sum + asset.size, 0);
  const cssSize = cssFiles.reduce((sum, asset) => sum + asset.size, 0);

  return {
    totalSize,
    jsSize,
    cssSize,
    fileCount: assets.length,
    assets: assets.sort((a, b) => b.size - a.size)
  };
}

function measureBuildTime() {
  console.log('🔨 Measuring build time...');
  const startTime = Date.now();
  
  try {
    execSync('npm run build', { stdio: 'pipe' });
    const buildTime = Date.now() - startTime;
    console.log(`✅ Build completed in ${buildTime}ms`);
    return buildTime;
  } catch (error) {
    console.log('❌ Build failed');
    return null;
  }
}

function generateReport() {
  console.log('📊 Generating Performance Report...\n');
  
  const buildTime = measureBuildTime();
  const bundleAnalysis = analyzeBundleSize();
  
  if (!bundleAnalysis) {
    return;
  }

  const report = {
    timestamp: new Date().toISOString(),
    buildTime,
    bundleAnalysis,
    performance: {
      totalSizeFormatted: formatBytes(bundleAnalysis.totalSize),
      jsSizeFormatted: formatBytes(bundleAnalysis.jsSize),
      cssSizeFormatted: formatBytes(bundleAnalysis.cssSize)
    }
  };

  // Save to log file
  let performanceHistory = [];
  if (fs.existsSync(PERFORMANCE_LOG)) {
    try {
      performanceHistory = JSON.parse(fs.readFileSync(PERFORMANCE_LOG, 'utf8'));
    } catch (error) {
      console.log('⚠️  Could not read performance log');
    }
  }
  
  performanceHistory.push(report);
  
  // Keep only last 50 entries
  if (performanceHistory.length > 50) {
    performanceHistory = performanceHistory.slice(-50);
  }
  
  fs.writeFileSync(PERFORMANCE_LOG, JSON.stringify(performanceHistory, null, 2));

  // Display report
  console.log('📈 Performance Report');
  console.log('====================');
  console.log(`Build Time: ${buildTime}ms`);
  console.log(`Total Bundle Size: ${report.performance.totalSizeFormatted}`);
  console.log(`JavaScript Size: ${report.performance.jsSizeFormatted}`);
  console.log(`CSS Size: ${report.performance.cssSizeFormatted}`);
  console.log(`File Count: ${bundleAnalysis.fileCount}`);
  
  console.log('\n📦 Largest Assets:');
  bundleAnalysis.assets.slice(0, 10).forEach((asset, index) => {
    console.log(`${index + 1}. ${asset.name} - ${formatBytes(asset.size)}`);
  });

  // Performance warnings
  console.log('\n⚠️  Performance Warnings:');
  if (bundleAnalysis.totalSize > 500 * 1024) {
    console.log('- Total bundle size exceeds 500KB');
  }
  if (bundleAnalysis.jsSize > 300 * 1024) {
    console.log('- JavaScript bundle size exceeds 300KB');
  }
  if (buildTime && buildTime > 30000) {
    console.log('- Build time exceeds 30 seconds');
  }
  
  // Performance budget check
  const budgets = {
    totalSize: 500 * 1024, // 500KB
    jsSize: 300 * 1024,    // 300KB
    cssSize: 50 * 1024,    // 50KB
    buildTime: 30000       // 30 seconds
  };

  let budgetPassed = true;
  console.log('\n💰 Performance Budget:');
  
  Object.entries(budgets).forEach(([metric, budget]) => {
    const actual = metric === 'buildTime' ? buildTime : bundleAnalysis[metric];
    const passed = actual <= budget;
    budgetPassed = budgetPassed && passed;
    
    const status = passed ? '✅' : '❌';
    const actualFormatted = metric === 'buildTime' ? 
      `${actual}ms` : formatBytes(actual);
    const budgetFormatted = metric === 'buildTime' ? 
      `${budget}ms` : formatBytes(budget);
    
    console.log(`${status} ${metric}: ${actualFormatted} (budget: ${budgetFormatted})`);
  });

  if (budgetPassed) {
    console.log('\n🎉 All performance budgets passed!');
  } else {
    console.log('\n⚠️  Some performance budgets exceeded');
    process.exit(1);
  }
}

// Run the performance monitoring
if (require.main === module) {
  generateReport();
}

module.exports = {
  analyzeBundleSize,
  measureBuildTime,
  generateReport,
  formatBytes
};