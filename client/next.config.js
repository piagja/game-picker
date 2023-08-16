/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.freetogame.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
