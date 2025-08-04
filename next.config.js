/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration for production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Ensure proper static generation
  trailingSlash: false,
  
  // Configuration for PDF generation and file handling
  webpack: (config, { isServer }) => {
    // Handle canvas for PDF generation
    if (isServer) {
      config.externals.push('canvas');
    }
    
    // Handle node modules that might be needed for PDF/email
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    
    return config;
  },
  
  // API routes configuration
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Allow larger payloads for PDF uploads
    },
    responseLimit: '10mb', // Allow larger responses for PDF downloads
  },
  
  // Experimental features for better performance
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
};

module.exports = nextConfig; 