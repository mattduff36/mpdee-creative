const nextJest = require('next/jest')

// Create Jest configuration using Next.js helper
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Custom Jest configuration
const customJestConfig = {
  // Test environment
  testEnvironment: 'jsdom',
  
  // Setup files to run before each test
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  
  // Module name mapping for absolute imports and static assets
  moduleNameMapper: {
    // Handle module aliases (same as your tsconfig paths)
    '^@/(.*)$': '<rootDir>/src/$1',
    
    // Handle static file imports in tests
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': '<rootDir>/src/test/mocks/fileMock.js',
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**/*',
    '!src/generated/**/*',
    '!src/**/node_modules/**',
    '!src/**/*.config.{js,ts}',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Test patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/generated/',
  ],
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Global variables available in tests
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },
  
  // Verbose output
  verbose: true,
  
  // Maximum worker processes
  maxWorkers: '50%',
  
  // Test timeout
  testTimeout: 10000,
}

// Create and export the configuration
module.exports = createJestConfig(customJestConfig) 