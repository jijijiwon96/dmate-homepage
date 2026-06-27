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
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
      {
        protocol: 'https',
        hostname: 'img.logo.dev',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
    // 썸네일 화질 개선: 90% 품질 허용 + 고해상도 사이즈 확보
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 600, 720],
    minimumCacheTTL: 3600,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['dmate.kr', 'www.dmate.kr', '*.vercel.app'],
      bodySizeLimit: '6mb',
    },
  },
};

export default nextConfig;
