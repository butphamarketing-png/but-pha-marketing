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
      // GSC 404 — bài cũ đã gỡ; 301 về bài sống cùng intent
      {
        source: '/blog/chien-luoc-quang-cao-google-ads-hieu-qua-nhat-cho-nam-2023',
        destination: '/blog/google-ads-la-gi',
        permanent: true,
      },
      {
        source: '/blog/tao-chien-luoc-cham-soc-fanpage-facebook-tang-tuong-tac-tuc-thi',
        destination: '/blog/cham-soc-fanpage',
        permanent: true,
      },
      {
        source: '/blog/chien-luoc-content-marketing-cho-doanh-nghiep-nho-tiet-kiem-ng',
        destination: '/blog/content-marketing-la-gi',
        permanent: true,
      },
      {
        source: '/blog/chien-luoc-content-marketing-cho-doanh-nghiep-nho-tiet-kiem-ngan-sach',
        destination: '/blog/content-marketing-la-gi',
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
