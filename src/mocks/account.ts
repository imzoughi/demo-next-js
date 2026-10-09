// Données de démonstration de l'espace compte (aucune vraie authentification).
import type { Order } from './types';

export interface AccountAddress {
  id: string;
  label: string;
  name: string;
  lines: string[];
  isDefault?: boolean;
}

export interface AccountProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface AccountData {
  profile: AccountProfile;
  orders: Order[];
  addresses: AccountAddress[];
}

export const accountData: AccountData = {
  profile: { firstName: 'Camille', lastName: 'Martin', email: 'camille.martin@exemple.fr', phone: '06 12 34 56 78' },
  // Commandes de la plus récente à la plus ancienne. Total = articles + livraison (offerte dès 100 €).
  orders: [
    {
      number: '10530',
      date: '29 septembre 2026',
      status: 'En préparation',
      total: 95,
      items: [{ id: 'vase-graystone', name: 'Vase Graystone', description: 'Grès émaillé gris', unitPrice: 85, quantity: 1, image: '/images/img-10.png', imageAlt: 'Vase Graystone en grès gris', href: '/fiche-produit/' }],
      shipping: 10,
      shippingAddress: { name: 'Camille Martin', lines: ['12 rue des Tilleuls', '69003 Lyon', 'France'] },
      payment: 'Carte bancaire se terminant par 4242',
    },
    {
      number: '10517',
      date: '24 septembre 2026',
      status: 'Expédiée',
      total: 980,
      items: [{ id: 'canape-poplar', name: 'Canapé en velours Poplar', description: 'Velours, trois places', unitPrice: 980, quantity: 1, image: '/images/img-04.jpg', imageAlt: 'Canapé en velours Poplar, trois places', href: '/fiche-produit/' }],
      shipping: 0,
      shippingAddress: { name: 'Camille Martin', lines: ['4 quai de la Fonderie', '69002 Lyon', 'France'] },
      payment: 'Carte bancaire se terminant par 4242',
    },
    {
      number: '10482',
      date: '12 septembre 2026',
      status: 'Livrée',
      total: 335,
      items: [
        { id: 'fauteuil-dandy', name: 'Fauteuil Dandy', description: 'Coque noire, pieds en chêne', unitPrice: 250, quantity: 1, image: '/images/img-01.png', imageAlt: 'Fauteuil Dandy, coque noire et pieds en chêne', href: '/fiche-produit/' },
        { id: 'vase-graystone', name: 'Vase Graystone', description: 'Grès émaillé gris', unitPrice: 85, quantity: 1, image: '/images/img-10.png', imageAlt: 'Vase Graystone en grès gris', href: '/fiche-produit/' },
      ],
      shipping: 0,
      shippingAddress: { name: 'Camille Martin', lines: ['12 rue des Tilleuls', '69003 Lyon', 'France'] },
      payment: 'Carte bancaire se terminant par 4242',
    },
  ],
  addresses: [
    { id: 'domicile', label: 'Domicile', name: 'Camille Martin', lines: ['12 rue des Tilleuls', '69003 Lyon', 'France'], isDefault: true },
    { id: 'bureau', label: 'Bureau', name: 'Camille Martin', lines: ['4 quai de la Fonderie', '69002 Lyon', 'France'] },
  ],
};
