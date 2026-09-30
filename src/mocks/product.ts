import { featuredProducts } from './home';
import type { Product } from './types';

/** Fiche de démonstration : la chaise Dandy (la même que sur l'accueil). */
export const productPage: Product = {
  id: 'chaise-dandy',
  name: 'Chaise Dandy',
  price: 250,
  image: '/images/img-20.jpg',
  imageAlt: 'Chaise Dandy, coque noire et pieds en hêtre, sur fond bleu-vert',
  href: '/fiche-produit/',
  category: 'Chaises',
  description:
    'Un design intemporel, l’une de nos pièces les plus populaires et les plus emblématiques. La chaise Dandy s’accorde à tous les intérieurs, avec ses pieds en hêtre et son assise en cuir d’agneau.',
  dimensions: [
    { label: 'Hauteur', value: '110 cm' },
    { label: 'Largeur', value: '75 cm' },
    { label: 'Profondeur', value: '50 cm' },
  ],
  max: 5,
};

/** Suggestions « Vous aimerez aussi » : trois autres produits de la sélection. */
export const relatedProducts: Product[] = featuredProducts.filter((p) => p.id !== productPage.id).slice(0, 3);

export const productPageContent = {
  relatedTitle: 'Vous aimerez aussi',
  breadcrumbHome: 'Accueil',
};
