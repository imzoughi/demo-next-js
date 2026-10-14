// Magasins de démonstration (adresses fictives, coordonnées réalistes des villes). La couche src/lib/api les expose.
import type { DayHours, Store, TimeRange } from './types';

const range = (open: string, close: string): TimeRange => ({ open, close });

/** Sept jours de 0 (dimanche) à 6 (samedi) : un jour absent de `days` est fermé. */
function week(days: Record<number, TimeRange[]>): DayHours[] {
  return [0, 1, 2, 3, 4, 5, 6].map((day) => ({ day, ranges: days[day] ?? [] }));
}

const MON_SAT = [1, 2, 3, 4, 5, 6];
const TUE_SAT = [2, 3, 4, 5, 6];

/** Même plage sur les jours listés, plus des jours particuliers (`extra`, ex. le dimanche). */
function daily(days: number[], r: TimeRange, extra: Record<number, TimeRange[]> = {}): DayHours[] {
  return week({ ...Object.fromEntries(days.map((d) => [d, [r]])), ...extra });
}

export const stores: Store[] = [
  {
    id: 'lyon-presquile',
    name: 'Avion Lyon Presqu’île',
    address: '18 rue de la République',
    postalCode: '69002',
    city: 'Lyon',
    lat: 45.764,
    lng: 4.8357,
    openingHours: daily(MON_SAT, range('10:00', '19:00'), { 0: [range('11:00', '18:00')] }),
    phone: '04 78 00 12 01',
    services: ['Retrait en magasin', 'Conseil en aménagement', 'Livraison à domicile'],
  },
  {
    id: 'paris-marais',
    name: 'Avion Paris Marais',
    address: '27 rue de Turenne',
    postalCode: '75003',
    city: 'Paris',
    lat: 48.8601,
    lng: 2.3629,
    openingHours: daily(MON_SAT, range('10:00', '19:00'), { 0: [range('12:00', '18:00')] }),
    phone: '01 42 00 12 02',
    services: ['Retrait en magasin', 'Conseil en aménagement', 'Atelier de décoration'],
  },
  {
    id: 'bordeaux-chartrons',
    name: 'Avion Bordeaux Chartrons',
    address: '9 cours Balguerie-Stuttenberg',
    postalCode: '33300',
    city: 'Bordeaux',
    lat: 44.8541,
    lng: -0.57,
    openingHours: daily(MON_SAT, range('10:00', '19:00')),
    phone: '05 56 00 12 03',
    services: ['Retrait en magasin', 'Livraison à domicile'],
  },
  {
    id: 'nantes-bouffay',
    name: 'Avion Nantes Bouffay',
    address: '5 rue de Verdun',
    postalCode: '44000',
    city: 'Nantes',
    lat: 47.215,
    lng: -1.556,
    openingHours: daily(TUE_SAT, range('10:00', '19:00')),
    phone: '02 40 00 12 04',
    services: ['Retrait en magasin', 'Conseil en aménagement'],
  },
  {
    id: 'lille-vieux-lille',
    name: 'Avion Lille Vieux-Lille',
    address: '14 rue de la Monnaie',
    postalCode: '59800',
    city: 'Lille',
    lat: 50.645,
    lng: 3.065,
    openingHours: daily(MON_SAT, range('10:00', '19:00'), { 0: [range('11:00', '17:00')] }),
    phone: '03 20 00 12 05',
    services: ['Retrait en magasin', 'Livraison à domicile', 'Atelier de décoration'],
  },
  {
    id: 'marseille-vieux-port',
    name: 'Avion Marseille Vieux-Port',
    address: '31 quai de Rive Neuve',
    postalCode: '13007',
    city: 'Marseille',
    lat: 43.2905,
    lng: 5.372,
    openingHours: daily(MON_SAT, range('10:00', '19:00')),
    phone: '04 91 00 12 06',
    services: ['Retrait en magasin', 'Conseil en aménagement'],
  },
  {
    id: 'strasbourg-centre',
    name: 'Avion Strasbourg Centre',
    address: '6 rue des Orfèvres',
    postalCode: '67000',
    city: 'Strasbourg',
    lat: 48.5835,
    lng: 7.749,
    openingHours: daily(TUE_SAT, range('10:00', '18:30')),
    phone: '03 88 00 12 07',
    services: ['Retrait en magasin', 'Livraison à domicile'],
  },
];
