'use client';

// Magasins : recherche par ville ou code postal, choix d'un magasin favori (un seul, gardé en session).
import { useRef, useState, type FormEvent } from 'react';
import { EmptyState } from '@/components/blocks/EmptyState/EmptyState';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import { Toast } from '@/components/ui/Toast/Toast';
import { cx } from '@/lib/cx';
import { plural } from '@/data/plural';
import { useAccount } from './AccountProvider';
import { PageTitle } from './PageTitle';
import styles from './compte.module.scss';

/** Minuscules sans accents ni espaces : « Saint-Étienne » et « saint etienne » se valent. */
function normalize(v: string): string {
  return v
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[\s-]+/g, '');
}

export function StoreFinder() {
  const { stores, favoriteStoreId, setFavoriteStore } = useAccount();
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState({ open: false, message: '' });
  const rootRef = useRef<HTMLDivElement>(null);

  const q = normalize(query);
  const results = q ? stores.filter((s) => normalize(s.city).includes(q) || normalize(s.postalCode).startsWith(q)) : stores;

  function choose(id: string, name: string) {
    const removing = id === favoriteStoreId;
    setFavoriteStore(removing ? null : id);
    setToast({ open: true, message: removing ? `${name} n’est plus votre magasin favori.` : `${name} est maintenant votre magasin favori.` });
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

      {results.length === 0 ? (
        <EmptyState
          icon="search"
          title="Aucun magasin ne correspond"
          text="Vérifiez l’orthographe de la ville ou essayez un autre code postal."
          headingLevel={2}
          action={{ label: 'Effacer la recherche', type: 'secondary', onClick: clear }}
        />
      ) : (
        <ul className={styles.storeList}>
          {results.map((s) => {
            const favorite = s.id === favoriteStoreId;
            return (
              <li key={s.id} className={cx(styles.card, styles.storeCard, favorite && styles.isFavorite)}>
                <h2 className="h4">{s.name}</h2>
                {favorite ? (
                  <p className={cx(styles.favorite, 'body-medium')}>
                    <Icon name="circle-check" size="sm" />
                    Votre magasin favori
                  </p>
                ) : null}
                <address className="body-medium">
                  <span className={styles.line}>{s.address}</span>
                  <span className={styles.line}>{`${s.postalCode} ${s.city}`}</span>
                </address>
                <ul className={cx(styles.plain, 'body-medium')} aria-label="Horaires">
                  {s.hours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="body-medium">
                  <span className="av-visually-hidden">Téléphone : </span>
                  <a className={styles.phone} href={`tel:${s.phone.replace(/\s/g, '')}`}>
                    {s.phone}
                  </a>
                </p>
                <ul className={cx(styles.plain, 'body-small')} aria-label="Services">
                  {s.services.map((sv) => (
                    <li key={sv}>{sv}</li>
                  ))}
                </ul>
                <div className={styles.cardAction}>
                  <Button type={favorite ? 'ghost' : 'secondary'} size="sm" onClick={() => choose(s.id, s.name)}>
                    {favorite ? 'Retirer des favoris' : 'Choisir comme favori'}
                    <span className="av-visually-hidden">{` : ${s.name}`}</span>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Toast open={toast.open} tone="success" message={toast.message} onDismiss={() => setToast((t) => ({ ...t, open: false }))} />
    </div>
  );
}
