import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'dmate.kr',
        pathname: '/src/uploads/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['dmate.kr', 'www.dmate.kr', '*.vercel.app'],
      bodySizeLimit: '6mb',
    },
  },
};

export default nextConfig;
