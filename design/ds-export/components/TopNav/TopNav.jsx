/* Avion — boutique-demo · TopNav (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Badge from '../Badge/Badge.jsx';
import Drawer from '../Drawer/Drawer.jsx';
import IconButton from '../IconButton/IconButton.jsx';
import Logo from '../Logo/Logo.jsx';
import TextLink from '../TextLink/TextLink.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
function cartLabel(n) {
  return n > 0 ? 'Panier, ' + n + (n > 1 ? ' articles' : ' article') : 'Panier, vide';
}
/* ——— TopNav : même hauteur partout ; mobile identique sur toutes les pages ——— */
const CATEGORIES = [
  {
    label: 'Pots de plantes',
    href: '/pots-de-plantes',
  },
  {
    label: 'Céramiques',
    href: '/ceramiques',
  },
  {
    label: 'Tables',
    href: '/tables',
  },
  {
    label: 'Chaises',
    href: '/chaises',
  },
  {
    label: 'Vaisselle',
    href: '/vaisselle',
  },
  {
    label: 'Couverts',
    href: '/couverts',
  },
];
function TopNav(props) {
  var cats = props.categories || CATEGORIES;
  var st = React.useState(false),
    menu = st[0],
    setMenu = st[1];
  var n = props.cartCount || 0;
  function cart() {
    return (
      <IconButton
        icon="shopping-cart"
        label={cartLabel(n)}
        href={props.onCart ? undefined : props.cartHref || '/panier'}
        onClick={props.onCart}
        expanded={props.cartExpanded}
      >
        <Badge count={n} />
      </IconButton>
    );
  }
  var search = <IconButton icon="search" label="Rechercher" onClick={props.onSearch} />;
  function catLinks(cls) {
    return cats.map(function (c) {
      var cur = props.activeCategory === c.label;
      return (
        <li key={c.label}>
          <a
            href={c.href}
            className={cx(cls, cur && 'is-current')}
            aria-current={cur ? 'page' : undefined}
            onClick={
              props.onNavigate
                ? function (e) {
                    props.onNavigate(e, c);
                  }
                : undefined
            }
          >
            {c.label}
          </a>
        </li>
      );
    });
  }
  return (
    <header className={cx('av-topnav', props.sticky && 'av-topnav--sticky', props.className)}>
      <div className="av-topnav__bar av-container">
        <div className="av-topnav__start">{search}</div>
        <div className="av-topnav__logo">
          <Logo
            href={props.homeHref || '/'}
            current={props.current === 'home'}
            onClick={
              props.onNavigate
                ? function (e) {
                    props.onNavigate(e, {
                      label: 'Accueil',
                    });
                  }
                : undefined
            }
          />
        </div>
        <div className="av-topnav__end">
          <span className="av-topnav__search-m">{search}</span>
          {cart()}
          <span className="av-topnav__account">
            <IconButton
              icon="circle-user"
              label="Mon compte"
              href={props.onAccount ? undefined : props.accountHref || '/compte'}
              onClick={props.onAccount}
            />
          </span>
          <span className="av-topnav__menu">
            <IconButton
              icon="menu"
              label="Ouvrir le menu"
              expanded={menu}
              onClick={function () {
                setMenu(true);
              }}
            />
          </span>
        </div>
      </div>
      <nav className="av-topnav__cats" aria-label="Catégories">
        <ul className="av-topnav__list av-container">{catLinks('av-topnav__cat body-medium')}</ul>
      </nav>
      <Drawer
        open={menu}
        onClose={function () {
          setMenu(false);
        }}
        side="left"
        title="Menu"
        closeLabel="Fermer le menu"
        className="av-topnav__drawer"
      >
        <nav aria-label="Catégories">
          <ul className="av-topnav__mlist">{catLinks('av-topnav__mcat h4')}</ul>
        </nav>
        <ul className="av-topnav__mlist av-topnav__mlist--sub">
          <li>
            <TextLink href={props.accountHref || '/compte'} iconLeft="circle-user">
              Mon compte
            </TextLink>
          </li>
          <li>
            <TextLink href={props.cartHref || '/panier'} iconLeft="shopping-cart">
              {cartLabel(n)}
            </TextLink>
          </li>
        </ul>
      </Drawer>
    </header>
  );
}

export default TopNav;
