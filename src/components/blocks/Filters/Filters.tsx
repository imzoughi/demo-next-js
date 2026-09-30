'use client';

import { useEffect, useRef, useState } from 'react';
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
  const activeRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  // Où replacer le focus après un retrait : rang de la puce visée (-1 = bouton du groupe) et groupe d'origine.
  const refocus = useRef<{ index: number; group: string } | null>(null);

  const active = groups.flatMap((g) =>
    (selected[g.id] ?? []).map((v) => ({ group: g.id, value: v, label: g.options.find((o) => o.value === v)?.label ?? v })),
  );
  const sortLabel = sortOptions?.find((o) => o.value === sort)?.label;

  function announce(text: string) {
    setMessage(text);
    onAnnounce?.(text);
  }
  function removeOne(a: (typeof active)[number], i: number) {
    refocus.current = { index: i, group: a.group };
    announce(`Filtre « ${a.label} » retiré`);
    onChange?.({ ...selected, [a.group]: (selected[a.group] ?? []).filter((x) => x !== a.value) });
  }

  // La puce retirée quitte le DOM : le focus irait sur body. On le replace sur la puce suivante (ou la précédente),
  // sinon sur le bouton du groupe (bouton « Filtres » en dessous de 1280 px).
  useEffect(() => {
    const target = refocus.current;
    if (!target) return;
    refocus.current = null;
    const chips = activeRef.current?.querySelectorAll<HTMLButtonElement>('button[aria-label^="Retirer le filtre"]') ?? [];
    const chip = chips[Math.min(target.index, chips.length - 1)];
    if (chip) return chip.focus();
    const gi = groups.findIndex((g) => g.id === target.group);
    const group = groupsRef.current?.querySelectorAll<HTMLButtonElement>('button')[Math.max(gi, 0)];
    const visible = group && group.offsetParent !== null ? group : mobileRef.current?.querySelector<HTMLButtonElement>('button');
    visible?.focus();
  }, [selected, groups]);

  return (
    <section className={cx(styles.sec, styles.root, className)} aria-label="Filtres">
      <div className={styles.secInner}>
        <div className={styles.bar}>
          <div className={styles.groups} ref={groupsRef}>
            {groups.map((g) => {
              const k = (selected[g.id] ?? []).length;
              return (
                <Button key={g.id} type="ghost" size="sm" iconRight="chevron-down" aria-haspopup="dialog" onClick={() => setOpen(g.id)}>
                  {g.legend + (k ? ` (${k})` : '')}
                </Button>
              );
            })}
          </div>
          <div className={styles.mobile} ref={mobileRef}>
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
        <div className={styles.active} ref={activeRef}>
          <p className={cx(styles.count, 'body-medium')} role="status">
            {`${n} produit${n > 1 ? 's' : ''}`}
          </p>
          {active.map((a, i) => (
            <FilterChip key={`${a.group}:${a.value}`} label={a.label} onRemove={() => removeOne(a, i)} />
          ))}
          {active.length > 0 ? (
            <TextLink
              tone="brand"
              onClick={() => {
                // Le lien disparaît avec les puces : le focus revient au premier bouton de groupe visible.
                refocus.current = { index: -1, group: groups[0]?.id ?? '' };
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
