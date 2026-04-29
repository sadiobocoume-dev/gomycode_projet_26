import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // Domaines externes autorisés pour next/image
    // Sans cette config, Next.js bloque les images pour des raisons de sécurité
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
}


export default nextConfig;
