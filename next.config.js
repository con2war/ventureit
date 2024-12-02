/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'server', // Force server-side rendering
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
