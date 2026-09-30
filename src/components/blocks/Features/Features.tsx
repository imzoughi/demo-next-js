import { cx } from '@/lib/cx';
import { FeatureCard, type FeatureCardProps } from '../FeatureCard/FeatureCard';
import styles from './Features.module.scss';

export type FeatureItem = Pick<FeatureCardProps, 'icon' | 'title' | 'text'>;

const FEATURES: FeatureItem[] = [
  { icon: 'truck', title: 'Livraison le lendemain', text: 'Commandez avant 15 h et recevez votre commande dès le lendemain.' },
  { icon: 'circle-check', title: 'Fabriqué par de vrais artisans', text: 'Des pièces faites à la main, avec passion et savoir-faire.' },
  { icon: 'credit-card', title: 'Des prix justes', text: 'La qualité de nos matières au meilleur prix, sans intermédiaire.' },
  { icon: 'sprout', title: 'Emballages recyclés', text: 'Nos emballages sont recyclés à 100 % pour limiter notre empreinte.' },
];

export interface FeaturesProps {
  items?: FeatureItem[];
  /** Titre de la section ; false pour aucun. */
  title?: string | false;
  filled?: boolean;
  className?: string;
}

/** Rangée de FeatureCard : 4 colonnes dès 1280 px, 2 dès 768 px, 1 en mobile. */
export function Features({ items = FEATURES, title = 'Ce qui rend notre marque différente', filled, className }: FeaturesProps) {
  return (
    <section className={cx(styles.sec, className)}>
      <div className={styles.secInner}>
        {title !== false ? <h2 className={cx(styles.secTitle, styles.secTitleCenter, 'h3')}>{title}</h2> : null}
        <div className={styles.grid}>
          {items.map((f) => (
            <FeatureCard key={f.title} headingLevel={3} filled={filled} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
