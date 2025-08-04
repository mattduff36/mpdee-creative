// Jest setup file
import '@testing-library/jest-dom';

// Mock environment variables for testing
process.env.ADMIN_USERNAME = 'test-admin';
process.env.ADMIN_PASSWORD = 'test-password';
process.env.NEXTAUTH_SECRET = 'test-secret-key-for-testing-only';
process.env.DATABASE_URL = 'file:./test.db';

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to ignore specific console methods
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
}; 