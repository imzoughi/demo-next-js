import type { Metadata } from 'next';
import { PageHeader } from '@/components/blocks/PageHeader/PageHeader';
import { getProductList } from '@/lib/api';
import { ProductList } from './ProductList';

export const metadata: Metadata = {
  title: 'Tous les produits · Avion',
  description: 'Toute la collection Avion : céramiques, chaises, tables et décoration. Filtrez par catégorie et par matière.',
};

export default async function ListeProduitsPage() {
  const { products, filterGroups, sortOptions } = await getProductList();
  return (
    <main id="contenu">
      <PageHeader title="Tous les produits" />
      <ProductList products={products} groups={filterGroups} sortOptions={sortOptions} />
    </main>
  );
}
