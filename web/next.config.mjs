/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL || "http://localhost:4000";

const nextConfig = {
  reactStrictMode: true,
  // Proxy /api/* to the Express server so the browser never deals with CORS.
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/api/:path*` }];
  },
};

export default nextConfig;
