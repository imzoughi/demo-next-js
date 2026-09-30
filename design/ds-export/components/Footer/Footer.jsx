/* Avion — boutique-demo · Footer (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import EmailSignup from '../EmailSignup/EmailSignup.jsx';
import Icon from '../Icon/Icon.jsx';
import TextLink from '../TextLink/TextLink.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Footer ——— */
const FOOTER_COLS = [
  {
    title: 'Menu',
    links: [
      'Nouveautés',
      'Meilleures ventes',
      'Vus récemment',
      'Populaires cette semaine',
      'Tous les produits',
    ],
  },
  {
    title: 'Catégories',
    links: ['Vaisselle', 'Mobilier', 'Décoration', 'Pots de plantes', 'Chaises'],
  },
  {
    title: 'Notre entreprise',
    links: ['À propos', 'Recrutement', 'Nous contacter', 'Confidentialité', 'Politique de retour'],
  },
];
const SOCIAL_LABELS = {
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  skype: 'Skype',
  twitter: 'X (Twitter)',
  pinterest: 'Pinterest',
};
function Footer(props) {
  var cols = props.columns || FOOTER_COLS;
  var socials =
    props.socials ||
    ['linkedin', 'facebook', 'instagram', 'skype', 'twitter', 'pinterest'].map(function (k) {
      return {
        name: k,
        href: '#',
      };
    });
  return (
    <footer className={cx('av-footer', 'av-on-inverse', props.className)}>
      <div className="av-footer__inner av-container">
        <div className="av-footer__cols">
          {cols.map(function (c) {
            return (
              <nav key={c.title} className="av-footer__col" aria-label={c.title}>
                <h2 className="av-footer__title h5">{c.title}</h2>
                <ul>
                  {c.links.map(function (l) {
                    var o =
                      typeof l === 'string'
                        ? {
                            label: l,
                            href: '#',
                          }
                        : l;
                    return (
                      <li key={o.label}>
                        <TextLink tone="inverse" href={o.href} onClick={props.onNavigate}>
                          {o.label}
                        </TextLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            );
          })}
          <div className="av-footer__signup">
            <EmailSignup
              tone="dark"
              compact={true}
              title="Inscrivez-vous à notre lettre d’information"
              onSubscribe={props.onSubscribe}
            />
          </div>
        </div>
        <div className="av-footer__bottom">
          <p className="av-footer__copy body-small">{props.copyright || '© 2026 Avion'}</p>
          <ul className="av-footer__social" aria-label="Réseaux sociaux">
            {socials.map(function (so) {
              return (
                <li key={so.name}>
                  <a
                    href={so.href}
                    className="av-footer__soc"
                    aria-label={'Avion sur ' + (SOCIAL_LABELS[so.name] || so.name)}
                    onClick={props.onNavigate}
                  >
                    <Icon name={so.name} size="md" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
