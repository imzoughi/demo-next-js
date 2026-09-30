Aperçu du panier dans un Drawer, ouvert après « Ajouter au panier » et depuis l'icône panier : articles, sous-total, « Voir le panier » et « Commander ».

## Usage

`h(Avion.MiniCart, { open, onClose, items, loading, notice, onQuantityChange, onRemove, onRemoved })`. Composé uniquement du kit : Drawer, CartItem (`context: 'drawer'`), Stepper, TextLink, Button, EmptyState, Skeleton. Le consommateur fournit les articles, ouvre le panneau à la fin de l'ajout (le bouton « Ajouter au panier » passe d'abord en chargement) et gère le retrait :

- `onRemove(id)` : passer l'article en `removing` et donner `notice: { message: 'Article retiré', actionLabel: 'Annuler', onAction, onDismiss }` ;
- `onRemoved(id)` : le retirer de la liste ; `onAction` : le remettre à sa place.

Le Toast « Article retiré · Annuler » s'affiche **dans** le panneau (Toast `position: 'static'`), pour rester joignable au clavier pendant que le focus est piégé ; il disparaît après `motion-duration-toast` (6 s) (pause au survol et au focus) et appelle `onDismiss`.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `items` | `[{ id, name, unitPrice, quantity, max, image, imageAlt, removing? }]` | `[]` |
| `loading` | squelettes + `aria-busy` | `false` |
| `notice` | `{ message, actionLabel?, onAction?, onDismiss?, tone? }` : Toast dans le panneau après un retrait | — |
| `cartHref`, `checkoutHref`, `collectionHref`, `onBrowse` | liens des boutons | `/panier`, `/paiement`, `/collection` |

Titre « Votre panier (2) » (nombre d'articles), sous-total en `price`, mention « Taxes et livraison calculées au paiement » en `body-small`, puis `secondary` « Voir le panier » et `primary` « Commander » côte à côte (empilés sous 375 px).

## États

| État | Rendu |
| --- | --- |
| Plein | liste de CartItem, pied fixe |
| Vide | EmptyState panier (« Votre panier est vide », « Découvrir la collection »), pas de pied |
| Chargement | deux squelettes image + lignes, titre « Votre panier » |
| Article retiré | ligne qui se referme, Toast « Article retiré · Annuler », sous-total et titre mis à jour |

## Accessibilité

Celle du Drawer (dialogue nommé « Votre panier (2) », focus piégé, Échap, retour au bouton d'origine), plus : sous-total dans une zone `aria-live`, Toast de retrait `role="status"`.

## Animations

Lignes **Drawer, MiniCart** (glissement + voile, `motion-duration-slow`, niveau 2) et **CartItem** (retrait, niveau 2) ; Toast (ligne **Toast**, niveau 2). Mode réduit : fondus `motion-duration-fast`.

## Exemple

```js
h(Avion.MiniCart, { open: open, items: items, notice: notice, onClose: close, onQuantityChange: setQty, onRemove: remove, onRemoved: drop })
```
