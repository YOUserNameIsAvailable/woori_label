/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'react-contentbuilder.vercel.app',
      'builder.smart-ui.pro',
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
