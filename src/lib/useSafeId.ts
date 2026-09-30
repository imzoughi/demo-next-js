import { useId } from 'react';

/** Identifiant unique utilisable dans un sélecteur CSS et un attribut id (useId sans les caractères spéciaux). */
export function useSafeId(prefix: string): string {
  return `${prefix}-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
}
