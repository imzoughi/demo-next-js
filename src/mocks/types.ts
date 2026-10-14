/** Types du domaine boutique : la couche src/lib/api les expose, le backend les remplacera à l'identique. */
export interface Dimension {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  /** Prix en euros. */
  price: number;
  image: string;
  imageAlt: string;
  href: string;
  category: string;
  description: string;
  dimensions: Dimension[];
  /** Stock disponible. */
  max: number;
}

export interface CartLine {
  id: string;
  name: string;
  description?: string;
  unitPrice: number;
  quantity: number;
  max: number;
  image: string;
  imageAlt: string;
  href?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  description?: string;
  /** Prix unitaire en euros. */
  unitPrice: number;
  quantity: number;
  image: string;
  imageAlt: string;
  href?: string;
}

export interface OrderAddress {
  name: string;
  lines: string[];
}

export interface Order {
  number: string;
  date: string;
  status: 'En préparation' | 'Expédiée' | 'Livrée';
  /** Total payé en euros : articles + frais de livraison. */
  total: number;
  href?: string;
  items: OrderItem[];
  /** Frais de livraison en euros (0 = offerts). */
  shipping: number;
  shippingAddress: OrderAddress;
  /** Mode de paiement affiché tel quel (« Carte bancaire se terminant par 4242 »). */
  payment: string;
}

/** Plage d'ouverture sur une journée, heures locales « HH:MM » (24 h). */
export interface TimeRange {
  open: string;
  close: string;
}

/** Horaires d'un jour : 0 = dimanche … 6 = samedi (convention de Date.getDay). Aucune plage = fermé. */
export interface DayHours {
  day: number;
  ranges: TimeRange[];
}

export interface Store {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  /** Latitude et longitude en degrés décimaux (WGS 84). */
  lat: number;
  lng: number;
  /** Horaires par jour (heure de Paris), sept entrées de 0 à 6. */
  openingHours: DayHours[];
  phone: string;
  services: string[];
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface FilterGroup {
  id: string;
  legend: string;
  options: FilterOption[];
}

export interface SortOption {
  value: string;
  label: string;
}

export interface HomeContent {
  hero: { title: string; text: string; image: string; imageAlt: string; actionLabel: string; actionHref: string };
  featuresTitle: string;
  featuredTitle: string;
  story: { title: string; text: string; image: string; imageAlt: string; actionLabel: string; actionHref: string };
  newsletter: { title: string; text: string; benefits: string[] };
}

export interface Category {
  label: string;
  href: string;
}

/** Adresse postale du compte (livraison ou facturation). */
export interface PostalAddress {
  firstName: string;
  lastName: string;
  address: string;
  /** Complément d'adresse : bâtiment, étage, digicode (facultatif). */
  addressLine2: string;
  postalCode: string;
  city: string;
  country: string;
  /** Facultatif pour la facturation. */
  phone: string;
}

/** Carnet d'adresses du compte : livraison, facturation, et option « facturation identique ». */
export interface AddressBook {
  shipping: PostalAddress;
  billing: PostalAddress;
  billingSameAsShipping: boolean;
}
