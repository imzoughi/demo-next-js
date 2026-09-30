État vide d'une liste (panier vide, liste sans résultat) : pictogramme, titre, phrase courte et un bouton qui propose la suite.

## Usage

`h(Avion.EmptyState, { kind: 'cart', action: { label: 'Découvrir la collection', href: '/collection' } })`. Le consommateur choisit `kind` (textes prêts à l'emploi) ou fournit `title`, `text` et `action`, et règle `headingLevel` selon la page (un seul `h1` par page).

- Panier vide : « Votre panier est vide » + « Découvrir la collection ».
- Liste sans résultat : « Aucun produit ne correspond » + « Effacer les filtres » (les FilterChip restent visibles au-dessus).
- À éviter : un état vide sans action, une illustration, un ton culpabilisant, une deuxième action principale.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `kind` | `cart` (icône `shopping-cart`) · `results` (icône `search`) | — |
| `title`, `text` | remplacent les textes du `kind` | — |
| `action` | `{ label, href?, onClick?, type? }` → Button (primary par défaut), pleine largeur en mobile | celle du `kind` |
| `icon` | nom Lucide, `lg`, `color-text-brand` | celle du `kind` |
| `headingLevel` | 2 à 4 (le style reste `h3`) | 2 |

Fond `color-surface-subtle`, centré, écarts `space-4`, marges `space-8` (mobile) et `space-9` (dès 768 px) ; texte `body-medium` limité à 45 caractères par ligne.

## États

Statique. Le bouton porte ses propres états (Button).

## Accessibilité

- Titre de niveau réel (`h2`, `h3`) pour la navigation par titres ; pictogramme décoratif.
- Contrastes : texte 13,62:1 (clair) et 7,48:1 (sombre) sur `color-surface-subtle`.
- Après « Effacer les filtres », annoncer le nouveau nombre de produits.

## Animations

Aucune ligne dans le catalogue : pas d'animation propre.

## Exemple

```js
items.length ? h(ShoppingBasket, { items: items }) : h(Avion.EmptyState, { kind: 'cart', headingLevel: 2, action: { label: 'Découvrir la collection', href: '/collection' } })
```
