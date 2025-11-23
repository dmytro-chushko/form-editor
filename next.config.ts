import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg', 'pg'],
};

export default nextConfig;
