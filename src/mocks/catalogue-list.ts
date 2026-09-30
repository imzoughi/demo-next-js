import type { FilterGroup, Product, SortOption } from './types';

/** Produit de la liste : un produit du catalogue et sa matière (pour le filtre). */
export interface ListedProduct extends Pick<Product, 'id' | 'name' | 'price' | 'image' | 'imageAlt' | 'href'> {
  /** Valeur du filtre « Catégorie ». */
  category: string;
  /** Valeur du filtre « Matière ». */
  material: string;
}

const p = (id: string, name: string, price: number, image: string, imageAlt: string, category: string, material: string): ListedProduct => ({
  id,
  name,
  price,
  image,
  imageAlt,
  href: '/fiche-produit/',
  category,
  material,
});

/** Ordre = « Nouveautés ». */
export const listedProducts: ListedProduct[] = [
  p('chaise-dandy', 'Chaise Dandy', 250, '/images/img-20.jpg', 'Chaise Dandy, coque noire et pieds en hêtre, sur fond bleu-vert', 'chaises', 'hetre'),
  p('set-vases-rustic', 'Set de vases Rustic', 155, '/images/img-13.jpg', 'Trois vases en terre beige sur un socle en béton', 'ceramiques', 'terre'),
  p('vase-silky', 'Vase Silky', 125, '/images/img-16.jpg', 'Vase Silky en grès gris clair sur fond sombre', 'ceramiques', 'gres'),
  p('suspension-lucy', 'Suspension Lucy', 399, '/images/img-14.jpg', 'Suspension Lucy en métal noir, intérieur doré, sur fond turquoise', 'decoration', 'metal'),
  p('fauteuil-dandy', 'Fauteuil Dandy', 250, '/images/img-01.png', 'Fauteuil Dandy, coque noire et pieds en chêne', 'chaises', 'chene'),
  p('canape-poplar', 'Canapé en velours Poplar', 980, '/images/img-04.jpg', 'Canapé en velours Poplar, trois places', 'chaises', 'velours'),
  p('vase-graystone', 'Vase Graystone', 85, '/images/img-10.png', 'Vase Graystone en grès gris', 'ceramiques', 'gres'),
  p('vase-blanc-classique', 'Vase blanc classique', 95, '/images/img-06.png', 'Vase blanc classique en céramique', 'ceramiques', 'terre'),
  p('table-basse-chene', 'Table basse en chêne massif avec plateau amovible et rangement intégré', 420, '/images/img-03.png', 'Table basse en chêne massif avec plateau amovible', 'tables', 'chene'),
  p('vase-dune', 'Vase Dune', 110, '/images/img-07.png', 'Trois vases Dune en terre claire sur un socle en béton', 'ceramiques', 'terre'),
  p('suspension-lucy-mini', 'Suspension Lucy mini', 289, '/images/img-14.jpg', 'Suspension Lucy mini en métal noir, intérieur doré', 'decoration', 'metal'),
  p('chaise-dandy-chene', 'Chaise Dandy, pieds en chêne', 275, '/images/img-20.jpg', 'Chaise Dandy avec pieds en chêne, coque noire', 'chaises', 'chene'),
];

const LABELS = {
  categorie: { ceramiques: 'Céramiques', tables: 'Tables', chaises: 'Chaises', decoration: 'Décoration' },
  matiere: { chene: 'Chêne', hetre: 'Hêtre', gres: 'Grès', terre: 'Terre cuite', velours: 'Velours', metal: 'Métal' },
} as const;

function options(group: keyof typeof LABELS, key: 'category' | 'material') {
  return Object.entries(LABELS[group]).map(([value, label]) => ({
    value,
    label,
    count: listedProducts.filter((x) => x[key] === value).length,
  }));
}

export const listFilterGroups: FilterGroup[] = [
  { id: 'categorie', legend: 'Catégorie', options: options('categorie', 'category') },
  { id: 'matiere', legend: 'Matière', options: options('matiere', 'material') },
];

export const listSortOptions: SortOption[] = [
  { value: 'nouveautes', label: 'Nouveautés' },
  { value: 'prix-asc', label: 'Prix croissant' },
  { value: 'prix-desc', label: 'Prix décroissant' },
];
