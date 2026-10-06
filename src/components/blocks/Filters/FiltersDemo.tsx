'use client';
// Exemple interactif des filtres (état local), utilisé par la story ActiveFilters : le « use client » est ici
// pour que le fichier de stories reste importable par le catalogue de la documentation (composant serveur).
import { useState } from 'react';
import { filterGroups, sortOptions } from '@/mocks/catalog';
import { Filters } from './Filters';
import type { FilterSelection } from '../FiltersSheet/FiltersSheet';

export function FiltersDemo() {
  const [selected, setSelected] = useState<FilterSelection>({ categorie: ['ceramiques'], matiere: ['gres'] });
  return <Filters groups={filterGroups} sortOptions={sortOptions} sort="nouveautes" selected={selected} onChange={setSelected} onClear={() => setSelected({})} resultCount={14} />;
}
