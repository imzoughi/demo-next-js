'use client';

import { useSyncExternalStore } from 'react';

const MINUTE = 60_000;

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, MINUTE);
  return () => window.clearInterval(id);
}

function getSnapshot(): number {
  return Math.floor(Date.now() / MINUTE) * MINUTE;
}

/**
 * Horloge rafraîchie chaque minute. Rendu serveur et hydratation : `null` (aucune heure inventée),
 * puis l'heure réelle du navigateur dès le montage : pas d'écart d'hydratation.
 */
export function useMinuteClock(): number | null {
  const ts: number | null = useSyncExternalStore(subscribe, getSnapshot, () => null);
  return ts;
}
