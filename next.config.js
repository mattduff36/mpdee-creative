/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration for production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Ensure proper static generation
  trailingSlash: false,
};

module.exports = nextConfig; 