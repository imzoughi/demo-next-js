// Badge « Ouvert » / « Fermé » : icône et texte complet (jamais la couleur seule). Vide tant que l'heure n'est pas connue
// (rendu serveur et hydratation) : la place reste réservée pour éviter un saut de mise en page.
import { Icon } from '@/components/ui/Icon/Icon';
import { cx } from '@/lib/cx';
import type { StoreStatus as Status } from '@/lib/storeHours';
import styles from './store-finder.module.scss';

export function StoreStatus({ status }: { status: Status | null }) {
  return (
    <div className={styles.statusSlot}>
      {status ? (
        <p className={cx(styles.status, status.open ? styles.statusOpen : styles.statusClosed, 'body-medium')}>
          <Icon name={status.open ? 'circle-check' : 'x'} size="sm" />
          <span>{status.label}</span>
        </p>
      ) : null}
    </div>
  );
}
