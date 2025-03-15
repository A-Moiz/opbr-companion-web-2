/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**' // ✅ Allows images from any domain
      }
    ]
  }
};

module.exports = nextConfig;
