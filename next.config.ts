import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  //reactStrictMode: false,
  allowedDevOrigins: ["192.168.11.115"],
};

export default nextConfig;
