import type { NextConfig } from 'next';
import NextBundleAnalyzer from '@next/bundle-analyzer';

// Note: only allow specific hostnames
const defaultConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com'
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_DOMAIN!
      },
      {
        protocol: 'https',
        hostname: 'scontent.flba1-1.fna.fbcdn.net'
      },
      {
        protocol: 'https',
        hostname: 'play-lh.googleusercontent.com'
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
