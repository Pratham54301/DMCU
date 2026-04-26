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
};

export default nextConfig;
