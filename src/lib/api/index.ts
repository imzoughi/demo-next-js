// Couche d'accès aux données : des mocks typés exposés comme une vraie API. Le backend remplacera ce fichier.
import { accountData, type AccountAddress, type AccountData, type AccountProfile } from '@/mocks/account';
import { cartLines, categories, filterGroups, orders, products, sortOptions } from '@/mocks/catalog';
import { listFilterGroups, listSortOptions, listedProducts, type ListedProduct } from '@/mocks/catalogue-list';
import { featuredProducts, homeContent } from '@/mocks/home';
import { productPage, productPageContent, relatedProducts } from '@/mocks/product';
import type { CartLine, Category, FilterGroup, HomeContent, Order, Product, SortOption } from '@/mocks/types';

export type { CartLine, Category, FilterGroup, HomeContent, Order, Product, SortOption };

export async function getFeaturedProducts(): Promise<Product[]> {
  return featuredProducts;
}

export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}

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

export type { AccountAddress, AccountData, AccountProfile, ListedProduct };

/** Espace compte de démonstration : profil, commandes et adresses (aucune authentification réelle). */
export async function getAccount(): Promise<AccountData> {
  return accountData;
}

/** Liste produits : produits, groupes de filtres et options de tri de la page liste-produits. */
export async function getProductList() {
  return { products: listedProducts, filterGroups: listFilterGroups, sortOptions: listSortOptions };
}

/** Données de la fiche produit de démonstration : produit, suggestions et textes. */
export async function getProductPage(): Promise<{ product: Product; related: Product[]; relatedTitle: string; breadcrumbHome: string }> {
  return { product: productPage, related: relatedProducts, relatedTitle: productPageContent.relatedTitle, breadcrumbHome: productPageContent.breadcrumbHome };
}
