/** @type {import('next').NextConfig} */
import { buildLocalSeoNextRedirects } from './lib/local-seo-redirects.mjs';

const nextConfig = {
  serverExternalPackages: ["pg", "express"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.butphamarketing.com" },
      { protocol: "https", hostname: "butphamarketing.com" },
      { protocol: "https", hostname: "ogfiaimloatwttcrwmub.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async redirects() {
    return [
      ...buildLocalSeoNextRedirects(),
      { source: '/admin', destination: '/adminbp', permanent: true },
      { source: '/khachhang', destination: '/cms/khach-hang', permanent: true },
      { source: '/khachhang/:path*', destination: '/cms/khach-hang', permanent: true },
      { source: '/adminbp/khachhang', destination: '/cms/khach-hang', permanent: true },
      { source: '/adminbp/khachhang/:path*', destination: '/cms/khach-hang', permanent: true },
      { source: '/cms/khachhang', destination: '/cms/khach-hang', permanent: true },
      { source: '/cms/khachhang/:path*', destination: '/cms/khach-hang', permanent: true },
      { source: '/cms/cms/:path*', destination: '/cms/:path*', permanent: false },
      {
        source: '/website/thiet-ke-website',
        destination: '/website',
        permanent: true,
      },
      {
        source: '/website/van-hanh',
        destination: '/website/van-hanh-website',
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
