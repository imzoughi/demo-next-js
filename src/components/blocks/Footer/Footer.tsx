import type { MouseEventHandler } from 'react';
import { cx } from '@/lib/cx';
import { Icon, type SocialIconName } from '../../ui/Icon/Icon';
import { TextLink } from '../../ui/TextLink/TextLink';
import { EmailSignup } from '../EmailSignup/EmailSignup';
import styles from './Footer.module.scss';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: Array<string | FooterLink>;
}

export interface FooterSocial {
  name: SocialIconName;
  href: string;
}

const COLUMNS: FooterColumn[] = [
  {
    title: 'Menu',
    links: ['Nouveautés', 'Meilleures ventes', 'Vus récemment', 'Populaires cette semaine', 'Tous les produits'],
  },
  { title: 'Catégories', links: ['Vaisselle', 'Mobilier', 'Décoration', 'Pots de plantes', 'Chaises'] },
  {
    title: 'Notre entreprise',
    links: ['À propos', 'Recrutement', 'Nous contacter', 'Confidentialité', 'Politique de retour'],
  },
];

const SOCIALS: FooterSocial[] = (['linkedin', 'facebook', 'instagram', 'skype', 'twitter', 'pinterest'] as const).map((name) => ({
  name,
  href: '#',
}));

const SOCIAL_LABELS: Record<SocialIconName, string> = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  skype: 'Skype',
  twitter: 'X (Twitter)',
  pinterest: 'Pinterest',
};

export interface FooterProps {
  columns?: FooterColumn[];
  socials?: FooterSocial[];
  copyright?: string;
  className?: string;
  onNavigate?: MouseEventHandler<HTMLElement>;
  onSubscribe?: (email: string) => Promise<unknown> | void;
}

/** Pied de page sur fond sombre : trois colonnes de liens, lettre d'information, réseaux sociaux, copyright. */
export function Footer({ columns = COLUMNS, socials = SOCIALS, copyright = '© 2026 Avion', className, onNavigate, onSubscribe }: FooterProps) {
  return (
    <footer className={cx(styles.root, 'av-on-inverse', className)}>
      <div className={cx(styles.inner, 'av-container')}>
        <div className={styles.cols}>
          {columns.map((c) => (
            <nav key={c.title} className={styles.col} aria-label={c.title}>
              <h2 className={cx(styles.title, 'h5')}>{c.title}</h2>
              <ul>
                {c.links.map((l) => {
                  const link = typeof l === 'string' ? { label: l, href: '#' } : l;
                  return (
                    <li key={link.label}>
                      <TextLink tone="inverse" href={link.href} onClick={onNavigate}>
                        {link.label}
                      </TextLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
          <div className={styles.signup}>
            <EmailSignup tone="dark" compact title="Inscrivez-vous à notre lettre d’information" headingLevel={2} onSubscribe={onSubscribe} />
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={cx(styles.copy, 'body-small')}>{copyright}</p>
          <ul className={styles.social} aria-label="Réseaux sociaux">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} className={styles.soc} aria-label={`Avion sur ${SOCIAL_LABELS[s.name]}`} onClick={onNavigate}>
                  <Icon name={s.name} size="md" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
