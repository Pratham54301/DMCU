/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5002',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.*.*',
        pathname: '/**',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/comics',
        destination: '/comic',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5002/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
