'use client';

// Liste filtrable : filtres, tri, puces et « Tout effacer » côté client sur les mocks.
import { useMemo, useState } from 'react';
import { Filters } from '@/components/blocks/Filters/Filters';
import type { FilterSelection } from '@/components/blocks/FiltersSheet/FiltersSheet';
import { Listings } from '@/components/blocks/Listings/Listings';
import type { ListedProduct } from '@/lib/api';
import type { FilterGroup, SortOption } from '@/mocks/types';

const FIELD: Record<string, 'category' | 'material'> = { categorie: 'category', matiere: 'material' };

export function ProductList({ products, groups, sortOptions }: { products: ListedProduct[]; groups: FilterGroup[]; sortOptions: SortOption[] }) {
  const [selected, setSelected] = useState<FilterSelection>({});
  const [sort, setSort] = useState(sortOptions[0]?.value ?? 'nouveautes');

  const visible = useMemo(() => {
    const list = products.filter((x) =>
      Object.entries(selected).every(([g, values]) => values.length === 0 || values.includes(x[FIELD[g]])),
    );
    if (sort === 'prix-asc') return list.toSorted((a, b) => a.price - b.price);
    if (sort === 'prix-desc') return list.toSorted((a, b) => b.price - a.price);
    return list;
  }, [products, selected, sort]);

  const clear = () => setSelected({});

  return (
    <>
      <Filters
        groups={groups}
        selected={selected}
        resultCount={visible.length}
        sortOptions={sortOptions}
        sort={sort}
        onChange={setSelected}
        onSortChange={setSort}
        onClear={clear}
      />
      <Listings
        products={visible}
        mobileColumns={2}
        spacing="tight"
        priorityFirst
        action={false}
        empty={{ action: { label: 'Effacer les filtres', type: 'primary', onClick: clear } }}
      />
    </>
  );
}
