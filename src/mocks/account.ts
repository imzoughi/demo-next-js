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
  orders: [
    { number: '10530', date: '29 septembre 2026', status: 'En préparation', total: 95 },
    { number: '10517', date: '24 septembre 2026', status: 'Expédiée', total: 980 },
    { number: '10482', date: '12 septembre 2026', status: 'Livrée', total: 335 },
  ],
  addresses: [
    { id: 'domicile', label: 'Domicile', name: 'Camille Martin', lines: ['12 rue des Tilleuls', '69003 Lyon', 'France'], isDefault: true },
    { id: 'bureau', label: 'Bureau', name: 'Camille Martin', lines: ['4 quai de la Fonderie', '69002 Lyon', 'France'] },
  ],
};
