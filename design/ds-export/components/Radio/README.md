Bouton radio pour un choix unique (mode de livraison, moyen de paiement), sur le même gabarit que la case à cocher ; composant nouveau, absent du Figma (écart validé).

## Usage

`h(Avion.Radio, { name: 'livraison', value: 'express', label: 'Express', hint: '24 h · 9 €', checked, onChange })`. Le consommateur regroupe les options dans un `fieldset` avec `legend`, leur donne le même `name`, gère la valeur sélectionnée, et présélectionne l'option par défaut (la moins chère, « Standard »).

- Deux à cinq options visibles ; au-delà, une liste déroulante.
- `hint` porte le délai et le prix (« 3 à 5 jours · gratuit »). Mettre à jour le total de la commande quand le choix change.
- À éviter : un radio seul, un radio sans option présélectionnée dans le tunnel, un radio pour des choix multiples (Checkbox).

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `name`, `value` | groupe et valeur | — |
| `label` | libellé (`body-medium`) | — |
| `hint` | précision sous le libellé (`body-medium`, `color-text-brand` : délai et prix de livraison servent au choix) | — |
| `error` | message sous la ligne (à mettre sur la dernière option ou sous le `fieldset`) | — |
| `checked` / `defaultChecked` / `disabled` | natifs | — |

Rond `size-control-box` (16 px), `radius-pill` (seul élément rond des formulaires), bordure `color-border-input` ; ligne ≥ `size-target-min`.

## États

| État | Rendu |
| --- | --- |
| Défaut | rond vide, bordure `color-border-input` |
| Survol (toute la ligne) | bordure 2 px `color-text-default` |
| Focus | contour 2 px `color-focus-ring` décalé de 2 px |
| Sélectionné | rond `color-brand-primary` avec anneau intérieur `space-1` en `color-surface-default` |
| Désactivé | `opacity-disabled` |
| Erreur | bordure 2 px `color-feedback-error` + message |

## Accessibilité

- Radios natifs : Tab entre dans le groupe, les flèches changent la sélection.
- `fieldset` + `legend` donnent le nom du groupe (« Mode de livraison »).
- Contrastes identiques à Checkbox.

## Animations

Ligne **TextInput, Checkbox, Radio** : `motion-duration-fast` / `motion-ease-standard`, niveau 3, gardé en mode réduit.

## Exemple

```js
h('fieldset', null, h('legend', { className: 'h5' }, 'Mode de livraison'),
  h(Avion.Radio, { name: 'livraison', value: 'standard', label: 'Standard', hint: '3 à 5 jours · gratuit', checked: v === 'standard', onChange: pick }),
  h(Avion.Radio, { name: 'livraison', value: 'express', label: 'Express', hint: '24 h · 9 €', checked: v === 'express', onChange: pick }))
```
