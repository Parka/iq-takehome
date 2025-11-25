import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.csv': {
        loaders: ['raw-loader'],
        as: '*.js'
      }
    }
  },
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL ?
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      :
      process.env.NEXT_PUBLIC_VERCEL_URL
  }
};

export default nextConfig;
