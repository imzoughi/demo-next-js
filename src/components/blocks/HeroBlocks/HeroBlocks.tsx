import type { MouseEventHandler } from 'react';
import Image from 'next/image';
import { cx } from '@/lib/cx';
import { Button } from '../../ui/Button/Button';
import styles from './HeroBlocks.module.scss';

export interface HeroBlocksProps {
  title: string;
  text?: string;
  image: string;
  imageAlt?: string;
  /** dark : texte blanc sur fond sombre à côté de l'image ; card : encart clair posé sur l'image. */
  variant?: 'dark' | 'card';
  action?: { label: string; href: string; onClick?: MouseEventHandler<HTMLElement> };
  /** Niveau du titre (1 par défaut : titre de la page). */
  headingLevel?: 1 | 2;
  className?: string;
}

/** Hero d'accueil : titre, texte, action, image. Jamais de carrousel. */
export function HeroBlocks({
  title,
  text,
  image,
  imageAlt = '',
  variant = 'dark',
  action = { label: 'Voir la collection', href: '/collection' },
  headingLevel = 1,
  className,
}: HeroBlocksProps) {
  const H = `h${headingLevel}` as 'h1' | 'h2';
  return (
    <section className={cx(styles.sec, styles[variant], className)}>
      <div className={styles.inner}>
        <div className={cx(styles.text, variant === 'dark' && 'av-on-inverse')}>
          <H className="h2">{title}</H>
          {text ? <p className={cx(styles.lead, 'body-large')}>{text}</p> : null}
          <Button type={variant === 'dark' ? 'white' : 'secondary'} href={action.href} onClick={action.onClick} fullWidth="mobile" className={styles.cta}>
            {action.label}
          </Button>
        </div>
        <div className={styles.media}>
          <Image src={image} alt={imageAlt} width={1440} height={960} priority sizes="100vw" />
        </div>
      </div>
    </section>
  );
}
