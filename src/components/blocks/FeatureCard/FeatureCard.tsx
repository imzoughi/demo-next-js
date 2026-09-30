import { cx } from '@/lib/cx';
import { Icon, type IconName } from '../../ui/Icon/Icon';
import styles from './FeatureCard.module.scss';

export interface FeatureCardProps {
  icon?: IconName;
  title: string;
  text: string;
  /** Fond Light Grey (true par défaut). */
  filled?: boolean;
  /** Niveau du titre (3 par défaut). */
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

/** Avantage : pictogramme, titre, texte. */
export function FeatureCard({ icon, title, text, filled = true, headingLevel = 3, className }: FeatureCardProps) {
  const H = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
  return (
    <div className={cx(styles.root, filled && styles.filled, className)}>
      {icon ? <Icon name={icon} size="lg" className={styles.icon} /> : null}
      <H className="h4">{title}</H>
      <p className={cx(styles.text, 'body-medium')}>{text}</p>
    </div>
  );
}
