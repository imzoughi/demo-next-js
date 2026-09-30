Page panier : titre, « Continuer mes achats » à côté, colonnes Produit / Quantité / Total, lignes CartItem, sous-total et « Passer la commande » ; EmptyState quand le panier est vide.

## Usage

`h(Avion.ShoppingBasket, { items, onQuantityChange, onRemove, onRemoved, checkoutHref, continueHref })`. Le consommateur gère les articles et le retrait annulable (Toast « … retiré · Annuler », voir CartItem).

- À éviter : un panier sans sortie, un bouton « Vider le panier », un sous-total qui ne suit pas les quantités.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `items` | articles (CartItem) | `[]` |
| `onQuantityChange(id, v)`, `onRemove(id)`, `onRemoved(id)` | actions | — |
| `checkoutHref`, `onCheckout`, `continueHref`, `onContinue` | liens | `/paiement`, `/collection` |

Fond de section `color-surface-subtle`, panneau `color-surface-default` (comme le Figma), titre H1 (style `h2`), OrderSummary « panier » en pied (sous-total, mention des taxes, « Passer la commande »). Colonnes dès 720 px de large, lignes empilées en dessous.

## États

Plein · article retiré (ligne qui se referme, Toast annulable) · vide (EmptyState « Votre panier est vide » + « Découvrir la collection »).

## Accessibilité

H1 unique ; en-têtes de colonnes décoratifs (chaque ligne nomme ses éléments) ; sous-total mis à jour.

## Animations

CartItem (retrait, niveau 2), Stepper, Toast.

## Exemple

```js
h(Avion.ShoppingBasket, { items: items, onQuantityChange: setQty, onRemove: remove, onRemoved: drop })
```
