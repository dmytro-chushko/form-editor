import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg', 'pg'],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'pg-native': false,
    };

    return config;
  },
};

export default nextConfig;
