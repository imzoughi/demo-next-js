Sélecteur de quantité (−, valeur, +) aux boutons de 44 × 44 px, borné entre 1 et le stock maximum, qui annonce la nouvelle valeur aux lecteurs d'écran.

## Usage

`h(Avion.Stepper, { label: 'Quantité, Fauteuil Dandy', min: 1, max: 3, value, onChange })`. Le consommateur fournit `max` (le stock disponible), la valeur et `onChange`, et le nom du produit dans `label` quand plusieurs Stepper se suivent (panier, mini-panier). Afficher à côté une phrase de stock quand le maximum est atteint.

- Fiche produit, CartItem du panier et du mini-panier.
- Retirer un article passe par « Retirer » (TextLink), jamais par une quantité à 0 : `min` vaut 1.
- À éviter : un champ numérique libre, un Stepper sans borne haute.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `min` / `max` | bornes | 1 / 99 |
| `value` + `onChange(v)`, ou `defaultValue` | valeur contrôlée ou non | `min` |
| `label` | nom du groupe, lu avec la valeur | « Quantité » |
| `disabled` | tout le Stepper inactif | `false` |

Fond `color-surface-subtle` (comme le Figma), boutons `size-target-min`, signes `minus` / `plus` en `color-text-default`, valeur `body-medium` en chiffres tabulaires, largeur `space-7`.

## États

| État | Rendu |
| --- | --- |
| Défaut | signes `color-text-default` (14,34:1 ; le Figma était à 1,2:1) |
| Survol | fond du bouton `color-action-secondary-hover` |
| Focus | contour 2 px `color-focus-ring` décalé de 2 px sur le bouton |
| Appui | fond `color-action-secondary-hover`, signe `color-text-brand` |
| − au minimum, + au maximum | `opacity-disabled` (40 %), `aria-disabled` : le bouton garde le focus |
| Désactivé | les deux boutons `disabled`, valeur `color-text-disabled` |

## Accessibilité

- `role="group"` nommé par `label` ; boutons « Diminuer la quantité » / « Augmenter la quantité ».
- La valeur est annoncée dans une zone `aria-live="polite"` (« Quantité : 3, stock maximum atteint »).
- Aux bornes, `aria-disabled` plutôt que `disabled` pour que le focus clavier ne saute pas.

## Animations

Ligne **Stepper** du catalogue : couleur du bouton en `motion-duration-instant` / `motion-ease-standard`, niveau 3, gardé en mode réduit.

## Exemple

```js
h(Avion.Stepper, { label: 'Quantité, Vase Graystone', min: 1, max: stock, value: qty, onChange: setQty })
```
