/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        pathname: '/plus/img/logos/**',
      },
    ],
    dangerouslyAllowSVG: true
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
