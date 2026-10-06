import Image from 'next/image';
import { withBase } from '@/lib/paths';
import { cx } from '@/lib/cx';
import styles from './PageHeader.module.scss';

export interface PageHeaderProps {
  /** Le H1 de la page (un seul par page). */
  title: string;
  text?: string;
  /** Image de fond (voile color-scrim) ; sans image, titre centré. */
  image?: string;
  className?: string;
  /** Niveau du titre : 1 par défaut (titre de la page) ; plus bas quand le bloc est montré dans une fiche de documentation. */
  headingLevel?: 1 | 2 | 3 | 4;
}

/** En-tête de page : H1 sur image (voile) ou sans image. */
export function PageHeader({ title, text, image, className, headingLevel = 1 }: PageHeaderProps) {
  const H = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4';
  return (
    <header className={cx(styles.sec, styles.root, image && styles.image, className)}>
      {image ? <Image className={styles.img} src={withBase(image)} alt="" fill priority sizes="100vw" /> : null}
      <div className={cx(styles.secInner, styles.inner)}>
        <H className="h1">{title}</H>
        {text ? <p className={cx(styles.text, 'body-large')}>{text}</p> : null}
      </div>
    </header>
  );
}
