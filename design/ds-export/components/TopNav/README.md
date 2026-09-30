En-tête du site, de hauteur constante sur tous les gabarits : desktop avec recherche, logo centré, panier et compte, puis la rangée de catégories ; mobile identique sur toutes les pages (logo, recherche, panier avec pastille, menu).

## Usage

`h(Avion.TopNav, { activeCategory: 'Céramiques', cartCount: 2, onCart: openMiniCart, onSearch: openSearch })`. Le consommateur fournit la catégorie courante, le nombre d'articles, les actions (recherche, panier : ouvre le MiniCart ou mène au panier, compte) et `sticky` s'il veut l'en-tête collant. Le menu mobile (Drawer à gauche) est géré par le composant.

- Toujours le même en-tête, **y compris sur la page panier** (correction UX : l'icône panier y manquait en mobile).
- Banner au-dessus, jamais entre la barre et les catégories.
- À éviter : une hauteur différente selon la page, une catégorie supplémentaire en capitales, une icône sans zone de 44 px.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `categories` | `[{ label, href }]` | Pots de plantes, Céramiques, Tables, Chaises, Vaisselle, Couverts |
| `activeCategory` | libellé de la catégorie courante | — |
| `current` | `'home'` sur l'accueil (logo en `aria-current`) | — |
| `cartCount` | nombre d'articles (Badge, nom « Panier, 2 articles ») | 0 |
| `onSearch`, `onCart`, `onAccount`, `onNavigate` | actions ; sans `onCart` / `onAccount`, liens `cartHref` / `accountHref` | — |
| `sticky` | collant en haut (`z-sticky`) | `false` |

Gabarits :

| Largeur | Barre (`size-header-bar`, 72 px) | Catégories (`size-header-nav`, 56 px) |
| --- | --- | --- |
| < 768 | logo à gauche ; recherche, panier, menu à droite | dans le menu (Drawer à gauche) |
| 768 à 1279 (compact) | recherche · logo centré · panier, compte | rangée centrée, écart `space-5` |
| ≥ 1280 | idem | rangée centrée, écart `space-6` |

## États

| État | Rendu |
| --- | --- |
| Catégorie | `body-medium` en `color-text-brand` |
| Survol | `color-text-default`, trait de 1 px sous le lien |
| Catégorie active | `color-text-default`, trait de 2 px, `aria-current="page"` |
| Focus | contour 2 px `color-focus-ring` (à l'intérieur pour les catégories) |
| Menu mobile ouvert | Drawer gauche « Menu » ; bouton `aria-expanded="true"` |

Icônes : IconButton 44 × 44 px autour des pictos de 16 px du Figma ; Badge sur le panier.

## Accessibilité

- `header` ; catégories dans un `nav` « Catégories » ; logo « Avion, accueil ».
- Nom du panier avec le nombre d'articles (`Avion.cartLabel`).
- Menu mobile : focus piégé, Échap, retour du focus sur « Ouvrir le menu ».

## Animations

- Catégories, icônes : ligne **IconButton, TextLink**, `motion-duration-fast` / `motion-ease-standard`, niveau 3.
- Menu mobile : ligne **TopNav (menu mobile)**, glissement latéral + voile (Drawer), `motion-duration-slow`, `motion-ease-enter` / `motion-ease-exit`, niveau 2 ; mode réduit : fondu `motion-duration-fast`.

## Exemple

```js
h(Avion.TopNav, { sticky: true, activeCategory: 'Chaises', cartCount: count, onCart: function () { setMiniCart(true); }, cartExpanded: miniCart })
```
