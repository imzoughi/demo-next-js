'use client';

// BANC D'ESSAI (phase 0) : page retirée, à réassembler par la boucle /decade-front:page liste-produits.

import type { ListedProduct } from '@/lib/api';
import type { FilterGroup, SortOption } from '@/mocks/types';

export function ProductList({ products }: { products: ListedProduct[]; groups: FilterGroup[]; sortOptions: SortOption[] }) {
  return (
    <ul data-bench="a-reconstruire">
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
