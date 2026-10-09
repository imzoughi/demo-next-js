import { accountData } from './account';
import type { CartLine, Category, FilterGroup, Order, Product, SortOption } from './types';

export const products: Product[] = [
  {
    id: 'fauteuil-dandy',
    name: 'Fauteuil Dandy',
    price: 250,
    image: '/images/img-01.png',
    imageAlt: 'Fauteuil Dandy, coque noire et pieds en chêne',
    href: '/fiche-produit/',
    category: 'Chaises',
    description:
      'Une coque enveloppante en résine, des pieds en chêne massif. Le fauteuil Dandy se glisse dans un salon comme dans un bureau.',
    dimensions: [
      { label: 'Hauteur', value: '75 cm' },
      { label: 'Largeur', value: '65 cm' },
      { label: 'Profondeur', value: '60 cm' },
    ],
    max: 12,
  },
  {
    id: 'canape-poplar',
    name: 'Canapé en velours Poplar',
    price: 980,
    image: '/images/img-04.jpg',
    imageAlt: 'Canapé en velours Poplar, trois places',
    href: '/fiche-produit/',
    category: 'Chaises',
    description: 'Trois places en velours, assise profonde et structure en hêtre. Livré monté, déhoussable.',
    dimensions: [
      { label: 'Hauteur', value: '80 cm' },
      { label: 'Largeur', value: '210 cm' },
      { label: 'Profondeur', value: '95 cm' },
    ],
    max: 4,
  },
  {
    id: 'vase-graystone',
    name: 'Vase Graystone',
    price: 85,
    image: '/images/img-10.png',
    imageAlt: 'Vase Graystone en grès gris',
    href: '/fiche-produit/',
    category: 'Céramiques',
    description: 'Un vase en grès émaillé à la main, dans un gris de pierre. Chaque pièce est unique.',
    dimensions: [
      { label: 'Hauteur', value: '30 cm' },
      { label: 'Largeur', value: '16 cm' },
      { label: 'Profondeur', value: '16 cm' },
    ],
    max: 24,
  },
  {
    id: 'vase-blanc-classique',
    name: 'Vase blanc classique',
    price: 95,
    image: '/images/img-06.png',
    imageAlt: 'Vase blanc classique en céramique',
    href: '/fiche-produit/',
    category: 'Céramiques',
    description: 'Un vase blanc aux lignes simples, en céramique tournée. Étanche, il accueille fleurs fraîches ou séchées.',
    dimensions: [
      { label: 'Hauteur', value: '36 cm' },
      { label: 'Largeur', value: '18 cm' },
      { label: 'Profondeur', value: '18 cm' },
    ],
    max: 18,
  },
  {
    id: 'table-basse-chene',
    name: 'Table basse en chêne massif avec plateau amovible et rangement intégré',
    price: 420,
    image: '/images/img-03.png',
    imageAlt: 'Table basse en chêne massif avec plateau amovible',
    href: '/fiche-produit/',
    category: 'Tables',
    description: 'Un plateau amovible, un rangement intégré, du chêne massif huilé. Elle se transforme en table de service.',
    dimensions: [
      { label: 'Hauteur', value: '42 cm' },
      { label: 'Largeur', value: '110 cm' },
      { label: 'Profondeur', value: '60 cm' },
    ],
    max: 6,
  },
];

export const categories: Category[] = [
  { label: 'Pots de plantes', href: '/liste-produits/' },
  { label: 'Céramiques', href: '/liste-produits/' },
  { label: 'Tables', href: '/liste-produits/' },
  { label: 'Chaises', href: '/liste-produits/' },
  { label: 'Vaisselle', href: '/liste-produits/' },
  { label: 'Couverts', href: '/liste-produits/' },
];

export const filterGroups: FilterGroup[] = [
  {
    id: 'categorie',
    legend: 'Catégorie',
    options: [
      { value: 'ceramiques', label: 'Céramiques', count: 24 },
      { value: 'tables', label: 'Tables', count: 12 },
      { value: 'chaises', label: 'Chaises', count: 18 },
      { value: 'vaisselle', label: 'Vaisselle', count: 0 },
    ],
  },
  {
    id: 'matiere',
    legend: 'Matière',
    options: [
      { value: 'chene', label: 'Chêne', count: 9 },
      { value: 'gres', label: 'Grès', count: 14 },
      { value: 'velours', label: 'Velours', count: 5 },
    ],
  },
];

export const sortOptions: SortOption[] = [
  { value: 'nouveautes', label: 'Nouveautés' },
  { value: 'prix-asc', label: 'Prix croissant' },
  { value: 'prix-desc', label: 'Prix décroissant' },
];

export const cartLines: CartLine[] = [
  {
    id: 'chaise-dandy',
    name: 'Chaise Dandy',
    description: 'Coque noire et pieds en hêtre',
    unitPrice: 250,
    quantity: 1,
    max: 5,
    image: '/images/img-20.jpg',
    imageAlt: 'Chaise Dandy, coque noire et pieds en hêtre, sur fond bleu-vert',
    href: '/fiche-produit/',
  },
  {
    id: 'vase-graystone',
    name: 'Vase Graystone',
    description: 'Grès émaillé gris',
    unitPrice: 85,
    quantity: 2,
    max: 2,
    image: '/images/img-10.png',
    imageAlt: 'Vase Graystone en grès gris',
    href: '/fiche-produit/',
  },
];

// Commandes : une seule source, dans l'espace compte (src/mocks/account.ts).
export const orders: Order[] = accountData.orders;
