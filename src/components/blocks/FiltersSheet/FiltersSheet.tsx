'use client';

// BANC D'ESSAI (phase 0) : implémentation retirée, à reconstruire par la boucle /decade-front:ds-component.
// Les props et les stories sont conservées : elles servent de cahier des charges et de tests.

import type { FilterGroup, SortOption } from '@/mocks/types';
import { Drawer } from '../../ui/Drawer/Drawer';

/** Valeurs cochées par groupe : { categorie: ['tables'] }. */
export type FilterSelection = Record<string, string[]>;

export interface FiltersSheetProps {
  open: boolean;
  groups?: FilterGroup[];
  selected?: FilterSelection;
  sortOptions?: SortOption[];
  sort?: string;
  /** Nombre de résultats avec les filtres choisis. */
  resultCount: number;
  /** Section qui reçoit le focus à l'ouverture : 'sort' ou l'id d'un groupe. */
  section?: string | null;
  static?: boolean;
  className?: string;
  onClose?: () => void;
  onClosed?: () => void;
  onApply?: () => void;
  onClear?: () => void;
  onChange?: (selected: FilterSelection) => void;
  onSortChange?: (value: string) => void;
}

/** Filtres et tri en panneau : depuis le bas en mobile, à droite dès 768 px. */
export function FiltersSheet({ open, resultCount, className, onClose }: FiltersSheetProps) {
  return (
    <Drawer open={open} title="Filtres" className={className} onClose={onClose}>
      <p>{resultCount} résultats</p>
    </Drawer>
  );
}
