'use client';

import { useState } from 'react';
import type { FilterGroup, SortOption } from '@/mocks/types';
import { cx } from '@/lib/cx';
import { Button } from '../../ui/Button/Button';
import { FilterChip } from '../../ui/FilterChip/FilterChip';
import { TextLink } from '../../ui/TextLink/TextLink';
import { FiltersSheet, type FilterSelection } from '../FiltersSheet/FiltersSheet';
import styles from './Filters.module.scss';

export interface FiltersProps {
  groups?: FilterGroup[];
  selected?: FilterSelection;
  resultCount: number;
  sortOptions?: SortOption[];
  sort?: string;
  className?: string;
  onChange?: (selected: FilterSelection) => void;
  onSortChange?: (value: string) => void;
  onClear?: () => void;
  /** Reçoit chaque annonce (« Filtre … retiré ») en plus de la zone vocale interne. */
  onAnnounce?: (message: string) => void;
}

/** Barre de filtres : groupes (dès 1280 px), compteur, puces actives, « Tout effacer », panneau FiltersSheet. */
export function Filters({
  groups = [],
  selected = {},
  resultCount: n,
  sortOptions,
  sort,
  className,
  onChange,
  onSortChange,
  onClear,
  onAnnounce,
}: FiltersProps) {
  const [open, setOpen] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const active = groups.flatMap((g) =>
    (selected[g.id] ?? []).map((v) => ({ group: g.id, value: v, label: g.options.find((o) => o.value === v)?.label ?? v })),
  );
  const sortLabel = sortOptions?.find((o) => o.value === sort)?.label;

  function announce(text: string) {
    setMessage(text);
    onAnnounce?.(text);
  }
  function removeOne(a: (typeof active)[number]) {
    announce(`Filtre « ${a.label} » retiré`);
    onChange?.({ ...selected, [a.group]: (selected[a.group] ?? []).filter((x) => x !== a.value) });
  }

  return (
    <section className={cx(styles.sec, styles.root, className)} aria-label="Filtres">
      <div className={styles.secInner}>
        <div className={styles.bar}>
          <div className={styles.groups}>
            {groups.map((g) => {
              const k = (selected[g.id] ?? []).length;
              return (
                <Button key={g.id} type="ghost" size="sm" iconRight="chevron-down" aria-haspopup="dialog" onClick={() => setOpen(g.id)}>
                  {g.legend + (k ? ` (${k})` : '')}
                </Button>
              );
            })}
          </div>
          <div className={styles.mobile}>
            <Button type="secondary" size="sm" iconRight="sliders-horizontal" aria-haspopup="dialog" onClick={() => setOpen('filters')}>
              {`Filtres${active.length ? ` (${active.length})` : ''}`}
            </Button>
            <Button type="secondary" size="sm" iconRight="chevron-down" aria-haspopup="dialog" onClick={() => setOpen('sort')}>
              Tri
            </Button>
          </div>
          {sortOptions ? (
            <div className={styles.sort}>
              <Button type="ghost" size="sm" iconRight="chevron-down" aria-haspopup="dialog" onClick={() => setOpen('sort')}>
                {`Trier par : ${sortLabel ? sortLabel.charAt(0).toLocaleLowerCase('fr') + sortLabel.slice(1) : ''}`}
              </Button>
            </div>
          ) : null}
        </div>
        <div className={styles.active}>
          <p className={cx(styles.count, 'body-medium')} role="status">
            {`${n} produit${n > 1 ? 's' : ''}`}
          </p>
          {active.map((a) => (
            <FilterChip key={`${a.group}:${a.value}`} label={a.label} onRemove={() => removeOne(a)} />
          ))}
          {active.length > 0 ? (
            <TextLink
              tone="brand"
              onClick={() => {
                announce('Tous les filtres ont été effacés');
                onClear?.();
              }}
            >
              Tout effacer
            </TextLink>
          ) : null}
          <span className="av-visually-hidden" aria-live="polite">
            {message}
          </span>
        </div>
      </div>
      <FiltersSheet
        open={open !== null}
        section={open}
        onClose={() => setOpen(null)}
        groups={groups}
        selected={selected}
        onChange={onChange}
        resultCount={n}
        sortOptions={sortOptions}
        sort={sort}
        onSortChange={onSortChange}
        onClear={onClear}
      />
    </section>
  );
}
