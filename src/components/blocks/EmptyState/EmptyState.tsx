import type { MouseEvent } from 'react';
import { cx } from '@/lib/cx';
import { Button, type ButtonType } from '../../ui/Button/Button';
import { Icon, type IconName } from '../../ui/Icon/Icon';
import styles from './EmptyState.module.scss';

const PRESETS = {
  cart: {
    icon: 'shopping-cart',
    title: 'Votre panier est vide',
    text: 'Nos pièces n’attendent que vous : céramiques, chaises, tables et bien plus.',
    action: 'Découvrir la collection',
  },
  results: {
    icon: 'search',
    title: 'Aucun produit ne correspond',
    text: 'Essayez avec moins de filtres ou une autre catégorie.',
    action: 'Effacer les filtres',
  },
} as const;

export interface EmptyStateProps {
  /** Contenus prêts à l'emploi : panier vide, liste sans résultat. */
  kind?: keyof typeof PRESETS;
  icon?: IconName;
  title?: string;
  text?: string;
  action?: { label: string; href?: string; type?: ButtonType; onClick?: (e: MouseEvent<HTMLElement>) => void };
  /** Niveau du titre (2 par défaut). */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

/** État vide : titre, phrase courte, bouton. */
export function EmptyState({ kind, icon, title, text, action, headingLevel = 2, className }: EmptyStateProps) {
  const preset = kind ? PRESETS[kind] : undefined;
  const H = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
  const act = action ?? (preset ? { label: preset.action } : undefined);
  const ico = icon ?? preset?.icon;
  const heading = title ?? preset?.title;
  const body = text ?? preset?.text;
  return (
    <div className={cx(styles.root, className)}>
      {ico ? <Icon name={ico} size="lg" className={styles.icon} /> : null}
      <H className={cx(styles.title, 'h3')}>{heading}</H>
      {body ? <p className={cx(styles.text, 'body-medium')}>{body}</p> : null}
      {act ? (
        <Button type={('type' in act && act.type) || 'primary'} href={'href' in act ? act.href : undefined} onClick={'onClick' in act ? act.onClick : undefined} fullWidth="mobile">
          {act.label}
        </Button>
      ) : null}
    </div>
  );
}
