/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tasks',
        permanent: true
      }
    ]
  }
}

export default nextConfig
