/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig  // Using CommonJS export instead of ES modules