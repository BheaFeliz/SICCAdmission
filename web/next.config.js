/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['page.js', 'page.jsx'],
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
