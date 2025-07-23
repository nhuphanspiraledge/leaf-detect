import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/predict',
        destination: 'http://167.71.210.72:8000/predict',
      },
      {
        source: '/predict/history/quynhnhu',
        destination: 'http://167.71.210.72:8000/predict/history/quynhnhu',
      },
      {
        source: '/chat/history/quynhnhu',
        destination: 'http://167.71.210.72:8000/chat/history/quynhnhu',
      },
      {
        source: '/chat',
        destination: 'http://167.71.210.72:8000/chat',
      },
      {
        source: '/predict/history/detail/:id',
        destination: 'http://167.71.210.72:8000/predict/history/detail/:id',
      },
    ];
  },
};

export default nextConfig;
