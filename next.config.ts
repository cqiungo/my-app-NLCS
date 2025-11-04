import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com', // 👈 thêm dòng này
      },
      {
        protocol: 'https',
        hostname: 'icon2.cleanpng.com', // 👈 thêm dòng này
      },
      {
        protocol: 'https',
        hostname: 'e7.pngegg.com', // 👈 thêm dòng này
      },
      {
        protocol: 'https',
        hostname: 'iconlogovector.com', // 👈 thêm dòng này
      },
      {
        protocol: 'https',
        hostname: 'logolook.net', // 👈 thêm dòng này
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // 👈 thêm dòng này
      },
    ],
  },
};

export default nextConfig;
