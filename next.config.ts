import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg', 'pg'],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'pg-native': false,
    };

    return config;
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'jrvahgupsifnchwwzflu.supabase.co' },
    ],
  },
};

export default nextConfig;
