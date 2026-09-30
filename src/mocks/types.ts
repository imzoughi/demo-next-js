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

export interface Order {
  number: string;
  date: string;
  status: 'En préparation' | 'Expédiée' | 'Livrée';
  total: number;
  href?: string;
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

export interface Category {
  label: string;
  href: string;
}
