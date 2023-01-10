/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'catstagram.lofty.codes',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
}
