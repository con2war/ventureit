/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }
    return config
  },
  images: {
    domains: [
      '34ui3vqlhxrdl0zd.public.blob.vercel-storage.com',
      'images.unsplash.com',
      'plus.unsplash.com'
    ],
  },
}

module.exports = nextConfig