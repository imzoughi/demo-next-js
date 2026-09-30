import Image from 'next/image';
import { cx } from '@/lib/cx';
import styles from './PageHeader.module.scss';

export interface PageHeaderProps {
  /** Le H1 de la page (un seul par page). */
  title: string;
  text?: string;
  /** Image de fond (voile color-scrim) ; sans image, titre centré. */
  image?: string;
  className?: string;
}

/** En-tête de page : H1 sur image (voile) ou sans image. */
export function PageHeader({ title, text, image, className }: PageHeaderProps) {
  return (
    <header className={cx(styles.sec, styles.root, image && styles.image, className)}>
      {image ? <Image className={styles.img} src={image} alt="" fill priority sizes="100vw" /> : null}
      <div className={cx(styles.secInner, styles.inner)}>
        <h1 className="h1">{title}</h1>
        {text ? <p className={cx(styles.text, 'body-large')}>{text}</p> : null}
      </div>
    </header>
  );
}
