/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["pg", "express"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/admin', destination: '/adminbp', permanent: true },
      { source: '/khachhang', destination: '/cms', permanent: true },
      { source: '/khachhang/:path*', destination: '/cms', permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: '/cms', destination: '/cms/index.html' },
      {
        source: '/cms/:path((?!api/|assets/|index.html).*)',
        destination: '/cms/index.html',
      },
    ];
  },
};

export default nextConfig;
