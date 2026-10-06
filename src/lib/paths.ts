// Chemins de l'application derrière un sous-chemin (GitHub Pages : /<nom du dépôt>). Vide en local.
// NEXT_PUBLIC_BASE_PATH est lu au build ; next.config.ts l'utilise aussi pour basePath.
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '');

/**
 * Préfixe un chemin absolu du site (image, fichier public, lien rendu hors next/link) avec le sous-chemin.
 * Sans effet sur les liens externes, les ancres, mailto: et les chemins déjà préfixés.
 * Ne pas l'utiliser avec next/link, qui ajoute lui-même le basePath.
 */
export function withBase(path: string): string {
  if (!BASE_PATH || !path.startsWith('/') || path.startsWith('//')) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}
