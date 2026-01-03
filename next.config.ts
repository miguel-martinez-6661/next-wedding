import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.smartslides.com",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      }
    ],
  },
};

export default nextConfig;
