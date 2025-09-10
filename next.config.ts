/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ESLint ما رح يوقف البناء على Vercel
  },
};

module.exports = nextConfig;
