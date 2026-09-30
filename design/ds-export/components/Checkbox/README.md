Case à cocher dont toute la ligne (case, libellé, compteur) est cliquable sur au moins 44 px de haut, pour les filtres et les options de formulaire.

## Usage

`h(Avion.Checkbox, { label: 'Céramiques', count: 9, checked, onChange })`. Le consommateur fournit `label`, l'état (`checked` + `onChange`, ou `defaultChecked`), `count` pour un filtre, `error` pour une case obligatoire. Grouper les cases dans un `fieldset` avec `legend` (« Catégorie »).

- Filtres : une ligne par valeur, compteur de produits à droite ; une valeur sans produit est désactivée.
- Formulaires : « Adresse de facturation identique », « Se souvenir de moi », acceptation des conditions.
- À éviter : une case pour un choix exclusif (Radio), une case qui déclenche une action immédiate lourde, un libellé à la forme négative.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `label` | libellé (`body-medium`) | — |
| `count` | nombre à droite (`color-text-brand`), lu « 9 produits » | — |
| `hint` | précision sous le libellé (`body-small`) | — |
| `error` | message sous la ligne | — |
| `checked` / `defaultChecked` / `disabled` | natifs | — |

Case `size-control-box` (16 px, dessin Figma), bordure `color-border-input`, angles droits ; ligne `size-target-min`, écart case → libellé `space-3`.

## États

| État | Rendu |
| --- | --- |
| Défaut | case `color-surface-default`, bordure `color-border-input` |
| Survol (toute la ligne) | bordure 2 px `color-text-default` |
| Focus | contour 2 px `color-focus-ring` décalé de 2 px autour de la case |
| Cochée | fond `color-brand-primary`, coche `check` en `color-text-inverse` (comme le Figma) |
| Désactivée | `opacity-disabled` sur la ligne |
| Erreur | bordure 2 px `color-feedback-error` + message sous la ligne |

## Accessibilité

- Vraie case native (`input type="checkbox"`) sous la case dessinée : Espace coche, le label couvre la ligne.
- Bordure 7,48:1 (clair) et 8,6:1 (sombre) ; case cochée 7,48:1 / 11,87:1 sur le fond.
- Le compteur est lu avec le libellé (« Céramiques, 9 produits »). Annoncer le nouveau total du filtre dans une zone `aria-live`.

## Animations

Ligne **TextInput, Checkbox, Radio** : fond, bordure et anneau en `motion-duration-fast` / `motion-ease-standard`, niveau 3, gardé en mode réduit ; message d'erreur selon la ligne **Message d'erreur / succès**.

## Exemple

```js
h('fieldset', null, h('legend', { className: 'h5' }, 'Catégorie'),
  h(Avion.Checkbox, { label: 'Céramiques', count: 9, checked: sel.ceramiques, onChange: toggle }))
```
