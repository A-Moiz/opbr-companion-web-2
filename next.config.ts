import type { NextConfig } from 'next';
import NextBundleAnalyzer from '@next/bundle-analyzer';

console.log('🚀 NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

const supabaseDomain = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const defaultConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.twimg.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.google.com',
        pathname: '/**'
      },
      ...(supabaseDomain
        ? [
            {
              protocol: 'https' as const,
              hostname: supabaseDomain,
              pathname: '/**'
            }
          ]
        : []),
      {
        protocol: 'https',
        hostname: 'scontent.flba1-1.fna.fbcdn.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'bwpgdqzcvqroakybcgjd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**'
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**'
      }
    ]
  }
};

let config: NextConfig = defaultConfig;
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: true,
    openAnalyzer: true
  });
  config = withBundleAnalyzer(defaultConfig);
}

export default config;
