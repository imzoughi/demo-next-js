Fil d'Ariane « Accueil › Catégorie › Produit » au-dessus du titre de la fiche produit ; en mobile, réduit à un lien de retour vers la catégorie.

## Usage

`h(Avion.Breadcrumb, { items: [{ label: 'Accueil', href: '/' }, { label: 'Chaises', href: '/chaises' }, { label: 'Fauteuil Dandy' }] })`. Le consommateur fournit le chemin ; le dernier élément est la page courante (sans `href`).

- Fiche produit (correction UX), au-dessus du titre, dans ProductDetails.
- À éviter : répéter le fil sous le titre, un dernier élément cliquable, plus de quatre niveaux.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `items` | `[{ label, href?, onClick? }]`, le dernier = page courante | `[]` |

Texte `body-medium` (16 px, contrôle : tout texte interactif ≥ 16 px) en `color-text-brand`, page courante en `color-text-default`, séparateurs `chevron-right` sm, liens de 44 px de haut.

## États

| État | Rendu |
| --- | --- |
| Défaut | liens `color-text-brand` |
| Survol | `color-text-default` + soulignement |
| Focus | contour 2 px `color-focus-ring` |
| Page courante | non cliquable, `aria-current="page"`, tronquée à 40 caractères avec « … » (nom complet dans `title` et lu en entier) |
| Mobile (< 768 px) | seul « ← Catégorie » reste, lu « Retour à Chaises » |

## Accessibilité

- `nav` « Fil d'Ariane » + liste ordonnée ; séparateurs décoratifs.
- Contraste : liens 7,48:1 (clair) et 11,87:1 (sombre) sur `color-surface-default`, 7,11:1 sur `color-surface-subtle`.

## Animations

Ligne **IconButton, TextLink** : couleur et soulignement en `motion-duration-fast` / `motion-ease-standard`, niveau 3, gardé en mode réduit.

## Exemple

```js
h(Avion.Breadcrumb, { items: [{ label: 'Accueil', href: '/' }, { label: 'Chaises', href: '/chaises' }, { label: 'Fauteuil Dandy' }] })
```
