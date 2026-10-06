import { AppLink } from '@/components/ui/AppLink/AppLink';
import type { MouseEvent, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './TextLink.module.scss';

export interface TextLinkProps {
  tone?: 'default' | 'brand' | 'inverse';
  /** Dans une phrase : hérite de la taille du texte, toujours souligné. */
  inline?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  /** Sans href, rendu en bouton d'aspect lien (« Retirer »). */
  href?: string;
  className?: string;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  'aria-label'?: string;
}

/** Lien texte, ou bouton d'aspect lien quand il n'a pas de href. */
export function TextLink({
  tone = 'default',
  inline,
  iconLeft,
  iconRight,
  href,
  className,
  children,
  onClick,
  ...rest
}: TextLinkProps) {
  const cls = cx(styles.root, !inline && 'body-medium', tone !== 'default' && styles[tone], inline && styles.inline, className);
  const content = (
    <>
      {iconLeft ? <Icon name={iconLeft} size="md" /> : null}
      <span>{children}</span>
      {iconRight ? <Icon name={iconRight} size="md" /> : null}
    </>
  );
  if (href) {
    return (
      <AppLink {...rest} className={cls} href={href} onClick={onClick}>
        {content}
      </AppLink>
    );
  }
  return (
    <button {...rest} type="button" className={cls} onClick={onClick}>
      {content}
    </button>
  );
}
