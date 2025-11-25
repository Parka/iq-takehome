import type { NextConfig } from "next";

console.log(`VERCEL_URL = https://${process.env.VERCEL_URL}`)
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
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_VERCEL_URL
  }
};

export default nextConfig;
