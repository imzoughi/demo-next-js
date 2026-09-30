// Couche d'accès aux données : des mocks typés exposés comme une vraie API. Le backend remplacera ce fichier.
import { cartLines, categories, filterGroups, orders, products, sortOptions } from '@/mocks/catalog';
import type { CartLine, Category, FilterGroup, Order, Product, SortOption } from '@/mocks/types';

export type { CartLine, Category, FilterGroup, Order, Product, SortOption };

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getFilterGroups(): Promise<FilterGroup[]> {
  return filterGroups;
}

export async function getSortOptions(): Promise<SortOption[]> {
  return sortOptions;
}

export async function getCart(): Promise<CartLine[]> {
  return cartLines;
}

export async function getOrders(): Promise<Order[]> {
  return orders;
}
