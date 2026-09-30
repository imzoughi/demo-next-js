Fiche produit en pile verticale : fil d'Ariane, titre (H1), prix, description, dimensions, quantité et « Ajouter au panier », sans aucune position absolue.

## Usage

`h(Avion.ProductDetails, { product, breadcrumb, onAdd })`. Le consommateur fournit le produit (`name`, `price`, `description`, `dimensions`, `image`, `max`), le chemin du fil d'Ariane et `onAdd(quantité)` qui renvoie une promesse : le bouton reste en chargement jusqu'à sa résolution, puis le consommateur ouvre le MiniCart.

- À éviter : réintroduire des blocs posés à la main, un deuxième H1, un bouton d'ajout sans état de chargement.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `product` | `{ name, price, description, dimensions: [{ label, value }], image, imageAlt, max }` | — |
| `breadcrumb` | items de Breadcrumb | — |
| `onAdd(qty)` | promesse | — |
| `onFavorite` | ajoute « Enregistrer dans mes favoris » (Ghost) | — |

Rythme (correction UX) : titre → prix `space-4` (16), blocs `space-6` (24), séparateur et actions `space-6` à `space-7`. Fond de section `color-surface-subtle`, Stepper sur `color-surface-default` (comme le Figma), image 4:5. Gabarits : ≥ 768 px, image à gauche (collante) et pile à droite ; mobile, image pleine largeur puis pile, boutons pleine largeur.

## États

| État | Rendu |
| --- | --- |
| Défaut | quantité 1 |
| Stock maximum | + désactivé et « Stock maximum atteint : 3 exemplaires disponibles. » |
| Ajout | Button en chargement (« Ajout en cours »), puis MiniCart ouvert |

## Accessibilité

Titre H1 ; Stepper nommé « Quantité, Fauteuil Dandy » ; dimensions en liste de définitions.

## Animations

Button (chargement), Stepper, puis ouverture du MiniCart (ligne **Drawer, MiniCart**).

## Exemple

```js
h(Avion.ProductDetails, { product: dandy, breadcrumb: crumbs, onAdd: function (q) { return cart.add('dandy', q).then(openMiniCart); } })
```
