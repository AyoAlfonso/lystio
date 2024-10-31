import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.lystio.co'], // Add allowed domains here
  },
 env: {
      NEXT_LOCAL_MAPBOX_TOKEN: process.env.NEXT_LOCAL_MAPBOX_TOKEN,
    }
};

export default nextConfig;
