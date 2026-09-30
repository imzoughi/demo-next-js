const EUR = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Prix en euros : « 250 € », « 1 250 € » (espace insécable, pas de centimes quand ils valent zéro). */
export function formatPrice(n: number): string {
  return EUR.format(n);
}

/** Libellé accessible du panier de l'en-tête : « Panier, 2 articles ». */
export function cartLabel(n: number): string {
  return n > 0 ? `Panier, ${n} ${n > 1 ? 'articles' : 'article'}` : 'Panier, vide';
}
