/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration for production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig; 