import type { HomeContent, Product } from './types';

function item(id: string, name: string, price: number, image: string, imageAlt: string, category: string, description: string, h: string, l: string, p: string, max: number): Product {
  return {
    id,
    name,
    price,
    image,
    imageAlt,
    href: '/fiche-produit/',
    category,
    description,
    dimensions: [
      { label: 'Hauteur', value: h },
      { label: 'Largeur', value: l },
      { label: 'Profondeur', value: p },
    ],
    max,
  };
}

/** Sélection de l'accueil (4 produits, dans l'ordre du Figma). */
export const featuredProducts: Product[] = [
  item('chaise-dandy', 'Chaise Dandy', 250, '/images/img-20.jpg', 'Chaise Dandy, coque noire et pieds en hêtre, sur fond bleu-vert', 'Chaises', 'Une coque noire enveloppante et des pieds en hêtre massif.', '82 cm', '48 cm', '52 cm', 20),
  item('set-vases-rustic', 'Set de vases Rustic', 155, '/images/img-13.jpg', 'Trois vases en terre beige sur un socle en béton', 'Céramiques', 'Trois vases façonnés à la main, dans une terre claire.', '28 cm', '18 cm', '18 cm', 10),
  item('vase-silky', 'Vase Silky', 125, '/images/img-16.jpg', 'Vase Silky en grès gris clair sur fond sombre', 'Céramiques', 'Un vase en grès à l’émail satiné, gris clair.', '26 cm', '14 cm', '14 cm', 15),
  item('suspension-lucy', 'Suspension Lucy', 399, '/images/img-14.jpg', 'Suspension Lucy en métal noir, intérieur doré, sur fond turquoise', 'Décoration', 'Une suspension conique en métal noir à l’intérieur doré.', '25 cm', '38 cm', '38 cm', 8),
];

export const homeContent: HomeContent = {
  hero: {
    title: 'Du mobilier de qualité pour celles et ceux qui aiment le design intemporel',
    text: 'Découvrez la nouvelle collection de printemps.',
    image: '/images/img-17.jpg',
    imageAlt: 'Deux chevets en chêne, une lampe noire et une plante sur un mur rose pâle',
    actionLabel: 'Voir la collection',
    actionHref: '/liste-produits/',
  },
  featuresTitle: 'Ce qui rend notre marque différente',
  featuredTitle: 'Notre sélection du moment',
  story: {
    title: 'Tout a commencé par une petite idée',
    text: 'Notre marque est née début 2014 dans un petit atelier du sud de Londres, avec des débuts locaux et une ambition mondiale.',
    image: '/images/img-12.jpg',
    imageAlt: 'Fauteuil jaune devant un mur clair, avec un lampadaire en laiton',
    actionLabel: 'Voir la collection',
    actionHref: '/liste-produits/',
  },
  newsletter: {
    title: 'Rejoignez le club et profitez d’avantages',
    text: 'Inscrivez-vous à notre lettre d’information pour recevoir des offres exclusives, de nouvelles gammes, des ventes privées et plus encore.',
    benefits: ['Offres exclusives', 'Évènements gratuits', 'Grosses remises'],
  },
};
