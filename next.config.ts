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
        source: '/predict/history/yenly',
        destination: 'http://167.71.210.72:8000/predict/history/yenly',
      },
      {
        source: '/chat/history/yenly',
        destination: 'http://167.71.210.72:8000/chat/history/yenly',
      },
      {
        source: '/chat',
        destination: 'http://167.71.210.72:8000/chat',
      },
      {
        source: '/predict/history/detail/:id',
        destination: 'http://167.71.210.72:8000/predict/history/detail/:id',
      },
      {
        source: '/predict/history/detail/:id/export',
        destination: 'http://167.71.210.72:8000/predict/history/detail/:id/export',
      },
    ];
  },
};

export default nextConfig;
