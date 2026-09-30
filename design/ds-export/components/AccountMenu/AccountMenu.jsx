/* Avion — boutique-demo · AccountMenu (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Icon from '../Icon/Icon.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— AccountMenu : onglets en desktop, liste en mobile ——— */
const ACCOUNT_ITEMS = [
  {
    id: 'profil',
    label: 'Profil',
    icon: 'circle-user',
  },
  {
    id: 'commandes',
    label: 'Commandes',
    icon: 'package',
  },
  {
    id: 'adresses',
    label: 'Adresses',
    icon: 'map-pin',
  },
];
function AccountMenu(props) {
  var items = props.items || ACCOUNT_ITEMS;
  return (
    <nav className={cx('av-sec', 'av-account', props.className)} aria-label="Mon compte">
      <ul className="av-account__list">
        {items.map(function (it) {
          var cur = props.active === it.id;
          return (
            <li key={it.id}>
              <a
                href={it.href || '#' + it.id}
                className={cx('av-account__link body-medium', cur && 'is-current')}
                aria-current={cur ? 'page' : undefined}
                onClick={function (e) {
                  if (props.onSelect) {
                    e.preventDefault();
                    props.onSelect(it.id);
                  }
                }}
              >
                <Icon name={it.icon || 'chevron-right'} size="md" className="av-account__icon" />
                <span>{it.label}</span>
                <Icon name="chevron-right" size="sm" className="av-account__chev" />
              </a>
            </li>
          );
        })}
        <li className="av-account__out">
          <button
            type="button"
            className="av-account__link av-account__logout body-medium"
            onClick={props.onLogout}
          >
            <Icon name="arrow-left" size="md" className="av-account__icon" />
            <span>Déconnexion</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default AccountMenu;
