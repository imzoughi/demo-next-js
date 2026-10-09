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

export interface Store {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  /** Une ligne par plage d'horaires. */
  hours: string[];
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
