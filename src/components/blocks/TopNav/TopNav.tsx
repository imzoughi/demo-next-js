'use client';

import { useState, type MouseEvent } from 'react';
import { categories as defaultCategories } from '@/mocks/catalog';
import type { Category } from '@/mocks/types';
import { cx } from '@/lib/cx';
import { cartLabel } from '@/lib/format';
import { Badge } from '../../ui/Badge/Badge';
import { Drawer } from '../../ui/Drawer/Drawer';
import { IconButton } from '../../ui/IconButton/IconButton';
import { Logo } from '../../ui/Logo/Logo';
import { TextLink } from '../../ui/TextLink/TextLink';
import styles from './TopNav.module.scss';

export interface TopNavProps {
  categories?: Category[];
  /** Libellé de la catégorie courante. */
  activeCategory?: string;
  /** home : le logo porte aria-current="page". */
  current?: 'home';
  cartCount?: number;
  /** Ouvre le MiniCart au lieu de suivre le lien du panier. */
  cartExpanded?: boolean;
  sticky?: boolean;
  homeHref?: string;
  cartHref?: string;
  accountHref?: string;
  className?: string;
  onCart?: () => void;
  onSearch?: () => void;
  onAccount?: () => void;
  onNavigate?: (e: MouseEvent<HTMLElement>, target: { label: string; href?: string }) => void;
}

/** En-tête : recherche, logo centré, panier avec Badge, compte, catégories ; en mobile, le menu ouvre un Drawer. */
export function TopNav({
  categories = defaultCategories,
  activeCategory,
  current,
  cartCount = 0,
  cartExpanded,
  sticky,
  homeHref = '/',
  cartHref = '/panier',
  accountHref = '/compte',
  className,
  onCart,
  onSearch,
  onAccount,
  onNavigate,
}: TopNavProps) {
  const [menu, setMenu] = useState(false);

  const search = <IconButton icon="search" label="Rechercher" onClick={onSearch} />;

  function catLinks(cls: string) {
    return categories.map((c) => {
      const cur = activeCategory === c.label;
      return (
        <li key={c.label}>
          <a
            href={c.href}
            className={cx(cls, cur && styles.isCurrent)}
            aria-current={cur ? 'page' : undefined}
            onClick={onNavigate ? (e) => onNavigate(e, c) : undefined}
          >
            {c.label}
          </a>
        </li>
      );
    });
  }

  return (
    <header className={cx(styles.root, sticky && styles.sticky, className)}>
      <div className={cx(styles.bar, 'av-container')}>
        <div className={styles.start}>{search}</div>
        <div className={styles.logo}>
          <Logo href={homeHref} current={current === 'home'} onClick={onNavigate ? (e) => onNavigate(e, { label: 'Accueil', href: homeHref }) : undefined} />
        </div>
        <div className={styles.end}>
          <span className={styles.searchM}>{search}</span>
          <IconButton
            icon="shopping-cart"
            label={cartLabel(cartCount)}
            href={onCart ? undefined : cartHref}
            onClick={onCart}
            expanded={cartExpanded}
          >
            <Badge count={cartCount} />
          </IconButton>
          <span className={styles.account}>
            <IconButton icon="circle-user" label="Mon compte" href={onAccount ? undefined : accountHref} onClick={onAccount} />
          </span>
          <span className={styles.menu}>
            <IconButton icon="menu" label="Ouvrir le menu" expanded={menu} onClick={() => setMenu(true)} />
          </span>
        </div>
      </div>
      <nav className={styles.cats} aria-label="Catégories de la boutique">
        <ul className={cx(styles.list, 'av-container')}>{catLinks(cx(styles.cat, 'body-medium'))}</ul>
      </nav>
      <Drawer open={menu} onClose={() => setMenu(false)} side="left" title="Menu" closeLabel="Fermer le menu">
        <nav aria-label="Catégories du menu">
          <ul className={styles.mlist}>{catLinks(cx(styles.mcat, 'h4'))}</ul>
        </nav>
        <ul className={cx(styles.mlist, styles.mlistSub)}>
          <li>
            <TextLink href={accountHref} iconLeft="circle-user">
              Mon compte
            </TextLink>
          </li>
          <li>
            <TextLink href={cartHref} iconLeft="shopping-cart">
              {cartLabel(cartCount)}
            </TextLink>
          </li>
        </ul>
      </Drawer>
    </header>
  );
}
