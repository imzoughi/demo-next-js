'use client';

import { useRef, type MouseEvent } from 'react';
import type { FilterGroup, SortOption } from '@/mocks/types';
import { cx } from '@/lib/cx';
import { useSafeId } from '@/lib/useSafeId';
import { Button } from '../../ui/Button/Button';
import { Checkbox } from '../../ui/Checkbox/Checkbox';
import { Drawer } from '../../ui/Drawer/Drawer';
import { Icon } from '../../ui/Icon/Icon';
import { Radio } from '../../ui/Radio/Radio';
import styles from './FiltersSheet.module.scss';

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
export function FiltersSheet({
  open,
  groups = [],
  selected = {},
  sortOptions = [],
  sort,
  resultCount: n,
  section,
  static: isStatic,
  className,
  onClose,
  onClosed,
  onApply,
  onClear,
  onChange,
  onSortChange,
}: FiltersSheetProps) {
  const focusRef = useRef<HTMLFieldSetElement>(null);
  const sortName = useSafeId('sort');
  const nActive = Object.values(selected).reduce((k, v) => k + v.length, 0);

  function toggle(group: string, value: string, on: boolean) {
    const cur = selected[group] ?? [];
    onChange?.({ ...selected, [group]: on ? [...cur, value] : cur.filter((x) => x !== value) });
  }

  /** Le bouton s'inactive après le clic : le focus passe avant sur le 1er groupe du dialogue. */
  function clear(e: MouseEvent<HTMLElement>) {
    e.currentTarget.closest<HTMLElement>('[role="dialog"]')?.querySelector<HTMLElement>('fieldset')?.focus();
    onClear?.();
  }

  const footer = (
    <div className={styles.actions}>
      <Button type="ghost" disabled={!nActive} onClick={clear}>
        Tout effacer
      </Button>
      <Button disabled={n === 0} onClick={onApply ?? onClose} fullWidth aria-live="polite">
        {n === 0 ? 'Aucun résultat' : `Voir les ${n} résultat${n > 1 ? 's' : ''}`}
      </Button>
    </div>
  );

  return (
    <Drawer
      open={open}
      static={isStatic}
      onClose={onClose}
      onClosed={onClosed}
      side="sheet"
      title="Filtres et tri"
      footer={footer}
      className={cx(styles.root, className)}
      initialFocus={section && section !== 'filters' ? focusRef : undefined}
    >
      {n === 0 ? (
        <p className={cx(styles.none, 'body-medium')} role="status">
          <Icon name="circle-alert" size="sm" />
          Aucun produit ne correspond à ces filtres. Retirez-en un.
        </p>
      ) : null}
      {sortOptions.length > 0 ? (
        <fieldset className={styles.group} ref={section === 'sort' ? focusRef : undefined} tabIndex={-1}>
          <legend className="h5">Trier par</legend>
          {sortOptions.map((o) => (
            <Radio
              key={o.value}
              name={sortName}
              value={o.value}
              label={o.label}
              checked={sort === o.value}
              onChange={() => onSortChange?.(o.value)}
            />
          ))}
        </fieldset>
      ) : null}
      {groups.map((g) => (
        <fieldset key={g.id} className={styles.group} ref={section === g.id ? focusRef : undefined} tabIndex={-1}>
          <legend className="h5">{g.legend}</legend>
          {g.options.map((o) => {
            const on = (selected[g.id] ?? []).includes(o.value);
            return (
              <Checkbox
                key={o.value}
                label={o.label}
                count={o.count}
                checked={on}
                disabled={!on && o.count === 0}
                onChange={(e) => toggle(g.id, o.value, e.target.checked)}
              />
            );
          })}
        </fieldset>
      ))}
    </Drawer>
  );
}
