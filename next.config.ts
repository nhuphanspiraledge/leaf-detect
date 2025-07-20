import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/predict',
        destination: 'http://167.71.210.72:8000/predict',
      },
    ];
  },
};

export default nextConfig;
