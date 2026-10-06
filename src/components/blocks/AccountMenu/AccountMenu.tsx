'use client';

import { AppLink } from '@/components/ui/AppLink/AppLink';
import { cx } from '@/lib/cx';
import { Icon, type IconName } from '../../ui/Icon/Icon';
import styles from './AccountMenu.module.scss';

export interface AccountMenuItem {
  id: string;
  label: string;
  icon?: IconName;
  href?: string;
}

const ITEMS: AccountMenuItem[] = [
  { id: 'profil', label: 'Profil', icon: 'circle-user' },
  { id: 'commandes', label: 'Commandes', icon: 'package' },
  { id: 'adresses', label: 'Adresses', icon: 'map-pin' },
];

export interface AccountMenuProps {
  items?: AccountMenuItem[];
  /** Id de l'entrée active. */
  active?: string;
  className?: string;
  onSelect?: (id: string) => void;
  onLogout?: () => void;
}

/** Navigation du compte : onglets dès 768 px, liste en mobile. */
export function AccountMenu({ items = ITEMS, active, className, onSelect, onLogout }: AccountMenuProps) {
  return (
    <nav className={cx(styles.sec, className)} aria-label="Mon compte">
      <ul className={styles.list}>
        {items.map((it) => {
          const cur = active === it.id;
          return (
            <li key={it.id}>
              <AppLink
                href={it.href ?? `#${it.id}`}
                className={cx(styles.link, 'body-medium', cur && styles.isCurrent)}
                aria-current={cur ? 'page' : undefined}
                onClick={(e) => {
                  if (onSelect) {
                    e.preventDefault();
                    onSelect(it.id);
                  }
                }}
              >
                <Icon name={it.icon ?? 'chevron-right'} size="md" className={styles.icon} />
                <span>{it.label}</span>
                <Icon name="chevron-right" size="sm" className={styles.chev} />
              </AppLink>
            </li>
          );
        })}
        <li className={styles.out}>
          <button type="button" className={cx(styles.link, styles.logout, 'body-medium')} onClick={onLogout}>
            <Icon name="arrow-left" size="md" className={styles.icon} />
            <span>Déconnexion</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
