/** Routes du site (export statique, barre finale). Les 5 autres pages s'y branchent. */
export const routes = {
  home: '/accueil/',
  products: '/liste-produits/',
  product: '/fiche-produit/',
  cart: '/panier/',
  checkout: '/paiement/',
  account: '/compte/',
} as const;

export const announcement = 'Livraison offerte dès 100 € d’achat';

const toProducts = (labels: string[]) => labels.map((label) => ({ label, href: routes.products }));

/** Colonnes du pied de page : les liens de catalogue mènent à la liste produits. */
export const footerColumns = [
  { title: 'Menu', links: toProducts(['Nouveautés', 'Meilleures ventes', 'Vus récemment', 'Populaires cette semaine', 'Tous les produits']) },
  { title: 'Catégories', links: toProducts(['Vaisselle', 'Mobilier', 'Décoration', 'Pots de plantes', 'Chaises']) },
  {
    title: 'Notre entreprise',
    links: ['À propos', 'Recrutement', 'Nous contacter', 'Confidentialité', 'Politique de retour'].map((label) => ({ label, href: '#' })),
  },
];
