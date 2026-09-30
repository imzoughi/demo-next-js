Panneau de filtres et de tri de la liste produits : plein écran depuis le bas en mobile, panneau à droite dès 768 px, avec « Voir les N résultats » mis à jour en direct et « Tout effacer ».

## Usage

`h(Avion.FiltersSheet, { open, section, onClose, groups, selected, onChange, resultCount, sortOptions, sort, onSortChange, onClear })`. Le consommateur ouvre le panneau depuis les boutons « Filtres » (`section: 'filters'`) et « Tri » (`section: 'sort'`, focus sur le tri), recalcule `resultCount` et les compteurs à chaque changement, et affiche ensuite les FilterChip des filtres actifs.

- Les filtres s'appliquent en direct ; « Voir les N résultats » ferme le panneau.
- Une valeur qui mènerait à 0 produit est désactivée.
- À éviter : un bouton « Appliquer » qui cache le nombre de résultats, des filtres dans le panneau et ailleurs en même temps sur mobile.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `groups` | `[{ id, legend, options: [{ value, label, count }] }]` → fieldsets de Checkbox avec compteur | `[]` |
| `selected`, `onChange` | `{ [groupId]: [values] }` | `{}` |
| `sortOptions`, `sort`, `onSortChange` | Radio « Trier par » | — |
| `resultCount` | N du bouton principal | — |
| `section` | `filters` · `sort` | `filters` |
| `onClear`, `onApply` | « Tout effacer » (ghost) ; bouton principal (par défaut : fermer) | — |

## États

| État | Rendu |
| --- | --- |
| Fermé | rien n'est rendu |
| Ouvert | tri, groupes, pied « Tout effacer » + « Voir les N résultats » |
| Aucun résultat | message « Aucun produit ne correspond à ces filtres. Retirez-en un. », bouton « Aucun résultat » désactivé |
| Aucun filtre | « Tout effacer » désactivé |

## Accessibilité

Celle du Drawer (dialogue « Filtres et tri », focus piégé, croix, Échap, retour au bouton « Filtres » ou « Tri »), plus : fieldsets avec `legend`, compteurs lus avec chaque option, nombre de résultats annoncé dans le bouton (`aria-live`).

## Animations

Ligne **FiltersSheet** du catalogue : glissement depuis le bas (depuis la droite dès 768 px) + voile, `motion-duration-slow`, `motion-ease-enter` / `motion-ease-exit`, niveau 2. Mode réduit : fondu `motion-duration-fast`.

## Exemple

```js
h(Avion.FiltersSheet, { open: !!open, section: open, onClose: close, groups: groups, selected: sel, onChange: setSel, resultCount: n, sortOptions: SORT, sort: sort, onSortChange: setSort, onClear: clear })
```
