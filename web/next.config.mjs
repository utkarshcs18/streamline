/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // If an external backend is defined (e.g. Express on Railway/Render), proxy to it.
  // Otherwise, Next.js handles /api routes internally via App Router route handlers.
  async rewrites() {
    if (!process.env.API_URL) return [];
    return [{ source: "/api/:path*", destination: `${process.env.API_URL}/api/:path*` }];
  },
};

export default nextConfig;
