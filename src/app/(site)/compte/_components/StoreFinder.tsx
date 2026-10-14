'use client';

// Magasins : recherche par ville ou code postal, carte Leaflet, statut ouvert / fermé (heure de Paris) et choix d'un
// magasin favori (un seul, gardé en session). La liste est le moyen principal ; la carte la complète.
import { useMemo, useRef, useState, type FormEvent } from 'react';
import { EmptyState } from '@/components/blocks/EmptyState/EmptyState';
import { Button } from '@/components/ui/Button/Button';
import { Icon, type IconName } from '@/components/ui/Icon/Icon';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import { Toast } from '@/components/ui/Toast/Toast';
import { cx } from '@/lib/cx';
import { formatOpeningHours, getStoreStatus } from '@/lib/storeHours';
import { useMinuteClock } from '@/lib/useMinuteClock';
import { plural } from '@/data/plural';
import { useAccount } from './AccountProvider';
import { PageTitle } from './PageTitle';
import { StoreMap, type FocusRequest } from './StoreMap';
import { StoreStatus } from './StoreStatus';
import styles from './compte.module.scss';
import finder from './store-finder.module.scss';

/** Minuscules sans accents ni espaces : « Saint-Étienne » et « saint etienne » se valent. */
/** Icône Lucide par service (le texte du service reste toujours affiché). */
const SERVICE_ICONS: Record<string, IconName> = {
  'Retrait en magasin': 'package',
  'Conseil en aménagement': 'messages-square',
  'Livraison à domicile': 'truck',
  'Atelier de décoration': 'paintbrush',
};

function normalize(v: string): string {
  return v
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[\s-]+/g, '');
}

export function StoreFinder() {
  const { stores, favoriteStoreId, setFavoriteStore } = useAccount();
  const now = useMinuteClock();
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState({ open: false, message: '' });
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [focusRequest, setFocusRequest] = useState<FocusRequest | null>(null);
  const [mapNote, setMapNote] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  const q = normalize(query);
  const results = useMemo(() => (q ? stores.filter((s) => normalize(s.city).includes(q) || normalize(s.postalCode).startsWith(q)) : stores), [stores, q]);
  const selectedId = results.some((s) => s.id === pickedId) ? pickedId : null;

  function choose(id: string, name: string) {
    const removing = id === favoriteStoreId;
    setFavoriteStore(removing ? null : id);
    setToast({ open: true, message: removing ? `${name} n’est plus votre magasin favori.` : `${name} est maintenant votre magasin favori.` });
  }

  /** Clic sur un repère : la carte de la liste est mise en avant et ramenée dans l'écran. */
  function selectFromMap(id: string) {
    setPickedId(id);
    const card = document.getElementById(`magasin-${id}`);
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    card?.scrollIntoView({ block: 'center', behavior: calm ? 'auto' : 'smooth' });
  }

  function chooseFromMap(id: string) {
    const store = stores.find((s) => s.id === id);
    if (store) choose(id, store.name);
  }

  function showOnMap(id: string, name: string) {
    setPickedId(id);
    setFocusRequest((r) => ({ id, n: (r?.n ?? 0) + 1 }));
    setMapNote(`La carte est centrée sur ${name}.`);
  }

  function clear() {
    setQuery('');
    rootRef.current?.querySelector<HTMLInputElement>('input')?.focus();
  }

  return (
    <div ref={rootRef}>
      <PageTitle title="Mon magasin">Cherchez un magasin par ville ou par code postal, puis choisissez votre magasin favori.</PageTitle>

      <form className={styles.search} role="search" aria-label="Rechercher un magasin" onSubmit={(e: FormEvent) => e.preventDefault()}>
        <TextInput
          label="Ville ou code postal"
          type="text"
          name="recherche"
          autoComplete="off"
          placeholder="Lyon ou 69002"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <p className={cx(styles.count, 'body-medium')} role="status">
        {results.length === 0
          ? 'Aucun magasin trouvé.'
          : `${plural(results.length, 'magasin trouvé', 'magasins trouvés')}${q ? '' : ' au total'}.`}
      </p>
      <p className="av-visually-hidden" role="status">
        {mapNote}
      </p>

      <div className={finder.finder}>
        <div className={finder.mapCol}>
          <StoreMap
            stores={results}
            favoriteId={favoriteStoreId}
            selectedId={selectedId}
            focusRequest={focusRequest}
            now={now}
            onSelect={selectFromMap}
            onChoose={chooseFromMap}
          />
        </div>

        <div className={finder.listCol}>
          {results.length === 0 ? (
            <EmptyState
              icon="search"
              title="Aucun magasin ne correspond"
              text="Vérifiez l’orthographe de la ville ou essayez un autre code postal."
              headingLevel={2}
              action={{ label: 'Effacer la recherche', type: 'secondary', onClick: clear }}
            />
          ) : (
            <ul className={cx(styles.storeList, finder.listSingle)}>
              {results.map((s) => {
                const favorite = s.id === favoriteStoreId;
                const selected = s.id === selectedId;
                return (
                  <li key={s.id} id={`magasin-${s.id}`} className={cx(styles.card, styles.storeCard, favorite && styles.isFavorite, selected && finder.isSelected)}>
                    <h2 className="h4">
                      {s.name}
                      {selected ? <span className="av-visually-hidden"> (sélectionné sur la carte)</span> : null}
                    </h2>
                    <StoreStatus status={now === null ? null : getStoreStatus(s.openingHours, new Date(now))} />
                    {favorite ? (
                      <p className={cx(styles.favorite, 'body-medium')}>
                        <Icon name="circle-check" size="sm" />
                        Votre magasin favori
                      </p>
                    ) : null}
                    <address className={cx(finder.infoRow, 'body-medium')}>
                      <Icon name="map-pin" size="sm" className={finder.infoIcon} />
                      <span>
                        <span className={styles.line}>{s.address}</span>
                        <span className={styles.line}>{`${s.postalCode} ${s.city}`}</span>
                      </span>
                    </address>
                    <div className={cx(finder.infoRow, 'body-medium')}>
                      <Icon name="clock" size="sm" className={finder.infoIcon} />
                      <ul className={styles.plain} aria-label="Horaires">
                        {formatOpeningHours(s.openingHours).map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </div>
                    <p className={cx(finder.infoRow, 'body-medium')}>
                      <Icon name="phone" size="sm" className={finder.infoIcon} />
                      <span>
                        <span className="av-visually-hidden">Téléphone : </span>
                        <a className={styles.phone} href={`tel:${s.phone.replace(/\s/g, '')}`}>
                          {s.phone}
                        </a>
                      </span>
                    </p>
                    <ul className={cx(styles.plain, 'body-small')} aria-label="Services">
                      {s.services.map((sv) => (
                        <li key={sv} className={finder.infoRow}>
                          <Icon name={SERVICE_ICONS[sv] ?? 'check'} size="sm" className={finder.infoIcon} />
                          <span>{sv}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={finder.cardActions}>
                      <Button type={favorite ? 'secondary' : 'primary'} size="sm" fullWidth="mobile" className={favorite ? finder.outlined : undefined} iconRight={favorite ? 'check' : 'star'} onClick={() => choose(s.id, s.name)}>
                        {favorite ? 'Magasin favori' : 'Choisir ce magasin'}
                        <span className="av-visually-hidden">{favorite ? ` : ${s.name}, activer pour retirer des favoris` : ` : ${s.name}`}</span>
                      </Button>
                      <Button type="secondary" size="sm" fullWidth="mobile" className={finder.outlined} iconRight="map-pin" onClick={() => showOnMap(s.id, s.name)}>
                        Voir sur la carte
                        <span className="av-visually-hidden">{` : ${s.name}`}</span>
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <Toast open={toast.open} tone="success" message={toast.message} onDismiss={() => setToast((t) => ({ ...t, open: false }))} />
    </div>
  );
}
