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
      { source: '/khachhang', destination: '/cms/khachhang', permanent: true },
      { source: '/khachhang/:path*', destination: '/cms/khachhang', permanent: true },
      { source: '/adminbp/khachhang', destination: '/cms/khachhang', permanent: true },
      { source: '/adminbp/khachhang/:path*', destination: '/cms/khachhang', permanent: true },
      { source: '/cms/cms/:path*', destination: '/cms/:path*', permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: '/cms', destination: '/cms/index.html' },
      {
        source: '/cms/:path((?!api/|assets/|index.html|khachhang|tax).*)',
        destination: '/cms/index.html',
      },
    ];
  },
};

export default nextConfig;
