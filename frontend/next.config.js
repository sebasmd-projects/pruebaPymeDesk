/** @type {import('next').NextConfig} */

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  }
}