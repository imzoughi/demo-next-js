import type { NextConfig } from 'next';

// Hébergement GitHub Pages : export statique (dossier out/), servi sous /<nom du dépôt>.
// NEXT_PUBLIC_BASE_PATH (ex. /demo-next-js) est défini au build par le workflow ; vide en local.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  serverExternalPackages: ['@storybook/react', 'storybook'],
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
