Récapitulatif de commande : lignes d'articles, sous-total, livraison et total, en contexte panier ou paiement, repliable en mobile.

## Usage

`h(Avion.OrderSummary, { context: 'paiement', lines, shipping })`. Le consommateur fournit les lignes et le coût de livraison (0 = « Gratuite », absent = « Calculée à l'étape suivante »).

- Paiement : à droite du formulaire en desktop, replié en haut en mobile (`collapsible`).
- Panier : sous les articles (utilisé par ShoppingBasket), avec l'action « Passer la commande ».

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `context` | `paiement` (lignes, livraison, total, fond `color-surface-subtle`) · `panier` (sous-total, mention des taxes) | `panier` |
| `lines` | `[{ name, price, quantity }]` | `[]` |
| `subtotal`, `shipping` | montants | calculé, — |
| `collapsible` | bouton « Afficher le récapitulatif » + total | `false` |
| `action`, `title` | bouton ; titre (`h4`) ou `false` | — |
| `loading` | lignes en Skeleton | `false` |

Total en `price`, montants en chiffres tabulaires alignés à droite.

## États

Défaut · replié / déplié (`aria-expanded`) · chargement.

## Accessibilité

`section` « Récapitulatif de commande », liste de définitions pour les montants, bouton de repli relié par `aria-controls`.

## Animations

Aucune (le repli est immédiat).

## Exemple

```js
h(Avion.OrderSummary, { context: 'paiement', lines: lines, shipping: express ? 9 : 0, collapsible: isMobile })
```
