import type { CSSProperties } from 'react';
import { cx } from '@/lib/cx';
import styles from './Skeleton.module.scss';

export interface SkeletonProps {
  /** image : bloc au ratio ; line : lignes de texte ; card : image + deux lignes. */
  shape?: 'card' | 'line' | 'image';
  /** Ratio de l'image remplacée (4 / 5 par défaut). */
  ratio?: string;
  /** Nombre de lignes (shape line). */
  lines?: number;
  /** Largeur d'une ligne unique. */
  width?: string;
  className?: string;
}

/** Squelette de chargement au ratio de l'élément remplacé ; trois pulsations d'opacité puis arrêt. Décoratif (aria-hidden). */
export function Skeleton({ shape = 'line', ratio = '4 / 5', lines = 1, width, className }: SkeletonProps) {
  const imageStyle: CSSProperties = { aspectRatio: ratio };
  let body;
  if (shape === 'image') {
    body = <span className={cx(styles.skel, styles.skelImage)} style={imageStyle} />;
  } else if (shape === 'card') {
    body = (
      <span className={styles.card}>
        <span className={cx(styles.skel, styles.skelImage)} style={imageStyle} />
        <span className={cx(styles.skel, styles.skelLine, styles.skelTitle)} />
        <span className={cx(styles.skel, styles.skelLine, styles.skelShort)} />
      </span>
    );
  } else {
    body = (
      <span className={styles.lines}>
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            className={cx(styles.skel, styles.skelLine, i === lines - 1 && lines > 1 && styles.skelShort)}
            style={width && lines === 1 ? { width } : undefined}
          />
        ))}
      </span>
    );
  }
  return (
    <span className={cx(styles.wrap, className)} aria-hidden="true">
      {body}
    </span>
  );
}
