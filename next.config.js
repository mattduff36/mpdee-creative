/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  trailingSlash: false,
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
};

module.exports = nextConfig; 