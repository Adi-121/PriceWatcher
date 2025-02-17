// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


const nextConfig = {
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages: ['mongoose']
    },
    images: {
      domains: ['m.media-amazon.com']
    }
  }
  
  module.exports = nextConfig