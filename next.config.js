/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: { 
    unoptimized: true,
    domains: ['johndoe-omega.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'johndoe-omega.vercel.app',
      },
    ],
  },
  devIndicators: false,
  allowedDevOrigins: [
    "*.macaly.dev",
    "*.macaly.app",
    "*.macaly-app.com",
    "*.macaly-user-data.dev",
  ],
};

module.exports = nextConfig;
