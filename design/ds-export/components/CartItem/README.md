Ligne d'article du panier et du mini-panier : image, nom, description, prix unitaire, Stepper, total de ligne et « Retirer ».

## Usage

`h(Avion.CartItem, { context: 'page', name, description, unitPrice, quantity, max, image, imageAlt, onQuantityChange, onRemove })` dans une liste `ul`. Le consommateur fournit les données, gère la quantité, et pour un retrait :

1. à `onRemove`, garde l'article et son index, passe `removing: true` et affiche « … retiré · Annuler » (Toast sur la page panier, message dans le MiniCart) ;
2. à `onRemoved` (fin de l'animation), retire l'article de la liste ;
3. à « Annuler », le remet à son index.

- À éviter : une quantité 0 pour retirer, une ligne sans image, un prix sans « € ».

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `context` | `page` : colonnes Produit / Quantité / Total quand son conteneur fait 720 px ou plus (container query : poser la liste dans un élément `container-type: inline-size`, ce que fait ShoppingBasket), nom `h4`, description · `drawer` : image, nom `h5`, prix, Stepper + total, « Retirer » | `page` |
| `name`, `description`, `unitPrice`, `quantity`, `max` | données ; prix formatés par `Avion.formatPrice` (« 1 250 € ») | — |
| `image`, `imageAlt` | image 4:5, largeur `size-cart-thumb` (drawer) ou `size-cart-thumb-lg` (page) | — |
| `href` | le nom devient un lien vers la fiche | — |
| `removing` | lance le retrait animé | `false` |

## États

| État | Rendu |
| --- | --- |
| Défaut | ligne séparée par `color-border-default` |
| Quantité au maximum | + désactivé, « Stock maximum atteint » en `color-text-brand` |
| Retrait en cours | fondu puis fermeture de la hauteur ; message annulable côté consommateur |
| Nom long | passe à la ligne, la ligne grandit sans casser la grille |

## Accessibilité

- Stepper nommé « Quantité, Vase Graystone » ; « Retirer » nommé « Retirer Vase Graystone du panier ».
- Le total de ligne est précédé de « Total : » (masqué visuellement).
- Après un retrait, remettre le focus sur l'article suivant ou le titre du panier.

## Animations

Ligne **CartItem** du catalogue : fondu en `motion-duration-base` / `motion-ease-exit`, puis fermeture de la hauteur, niveau 2. Mode réduit : fondu `motion-duration-fast`, hauteur fermée sans transition (`motion-duration-reduced`). La fin de l'animation déclenche `onRemoved`.

## Exemple

```js
h('ul', null, items.map(function (i) { return h(Avion.CartItem, Object.assign({ key: i.id, context: 'page', onRemove: function () { remove(i.id); }, onRemoved: function () { drop(i.id); } }, i)); }))
```
