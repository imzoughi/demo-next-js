import type { NextConfig } from 'next';

// Hébergement GitHub Pages : export statique (dossier out/).
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
