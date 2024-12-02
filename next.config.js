/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // This ensures server-side features are enabled
}

module.exports = nextConfig // Using CommonJS export instead of ES modules