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
      { source: '/khachhang', destination: '/cms/khach-hang', permanent: true },
      { source: '/khachhang/:path*', destination: '/cms/khach-hang', permanent: true },
      { source: '/adminbp/khachhang', destination: '/cms/khach-hang', permanent: true },
      { source: '/adminbp/khachhang/:path*', destination: '/cms/khach-hang', permanent: true },
      { source: '/cms/khachhang', destination: '/cms/khach-hang', permanent: true },
      { source: '/cms/khachhang/:path*', destination: '/cms/khach-hang', permanent: true },
      { source: '/cms/cms/:path*', destination: '/cms/:path*', permanent: false },
      {
        source: '/blog/thiet-ke-website-tphcm-uy-tin',
        destination: '/blog/thiet-ke-website-tphcm',
        permanent: true,
      },
      {
        source: '/blog/thiet-ke-website-ha-noi-chuyen-nghiep',
        destination: '/blog/thiet-ke-website-ha-noi',
        permanent: true,
      },
      {
        source: '/blog/thiet-ke-website-da-nang-du-lich',
        destination: '/blog/thiet-ke-website-da-nang',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/cms', destination: '/cms/index.html' },
      {
        source: '/cms/:path((?!api/|assets/|index.html|tax).*)',
        destination: '/cms/index.html',
      },
    ];
  },
};

export default nextConfig;
