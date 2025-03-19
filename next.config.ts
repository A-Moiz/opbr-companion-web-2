import type { NextConfig } from 'next';

// Note: only allow specific hostnames
const nextConfig: NextConfig = {
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

export default nextConfig;
