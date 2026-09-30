Pictogramme Lucide en SVG en ligne, taille 16, 20 ou 24 px, qui prend la couleur du texte qui l'entoure.

## Usage

`h(Avion.Icon, { name: 'truck', size: 'lg' })`. Le consommateur fournit `name` (un nom de `Avion.iconNames`, ou de `Avion.socialIconNames` pour le pied de page) et, si l'icône est seule porteuse de sens, `label`. La couleur se règle sur le parent (`color`), jamais sur l'icône.

- À faire : une icône avec son texte (« Livraison le lendemain »), une icône seule dans un IconButton qui porte le nom accessible.
- À éviter : une icône d'une autre source, un emoji, une icône Carbon du groupe Carbon (référence seulement), une couleur écrite en dur, une icône qui remplace un libellé de bouton principal.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `name` | 22 icônes Lucide : `arrow-left`, `check`, `chevron-down`, `chevron-right`, `circle-alert`, `circle-check`, `circle-user`, `credit-card`, `loader-circle`, `lock`, `map-pin`, `menu`, `minus`, `package`, `plus`, `search`, `shopping-cart`, `sliders-horizontal`, `sprout`, `trash-2`, `truck`, `x` ; 6 logos sociaux Carbon : `facebook`, `instagram`, `linkedin`, `pinterest`, `skype`, `twitter` | — |
| `size` | `sm` (`size-icon-sm`, 16), `md` (`size-icon-md`, 20), `lg` (`size-icon-lg`, 24) | `lg` |
| `label` | texte : l'icône devient `role="img"` avec ce nom | absent : décorative, `aria-hidden` |
| `strokeWidth` | trait Lucide | 1,5 (trait fin, proche du Carbon du Figma) |
| `spin` | booléen : rotation de chargement (`loader-circle`) | `false` |

Tailles par contexte : `sm` dans l'en-tête (IconButton, dessin Figma 16 px), les messages sous un champ et les puces ; `md` dans les boutons et les liens ; `lg` pour les pictos de FeatureCard.

## États

- **Décorative** (défaut) : `aria-hidden="true"`, ignorée par les lecteurs d'écran.
- **Nommée** : `label` fourni → `role="img"` + `aria-label`.
- **Couleur héritée** : `color-text-default`, `color-text-brand`, `color-text-inverse` sur fond sombre, `color-feedback-error` et `color-feedback-success` (toujours avec un texte), `color-text-disabled` quand le contrôle parent est inactif.
- **Chargement** : `spin`.

Icon n'a pas de survol ni de focus propres : ils appartiennent au contrôle qui la contient (IconButton, Button, TextLink).

## Accessibilité

- Une icône qui a du sens seule a un nom (`label`), ou son contrôle parent en a un ; jamais les deux.
- Contraste ≥ 3:1 sur son fond : les couleurs de texte du système le garantissent sur les fonds nommés dans leurs notes.
- Zone cliquable : l'icône ne l'est jamais seule ; son contrôle fait au moins `size-target-min` (44 × 44).

## Animations

Aucune ligne propre dans le catalogue. `spin` sert la ligne **Button (chargement)** : rotation continue, un tour en 5 × `motion-duration-fast`, niveau 3 ; en mode réduit, la rotation devient une pulsation d'opacité (4 × `motion-duration-slow`, `motion-ease-standard`). Les changements de couleur suivent la transition du parent.

## Exemple

```js
h('p', null, h(Avion.Icon, { name: 'truck' }), 'Livraison le lendemain')
h(Avion.Icon, { name: 'lock', size: 'md', label: 'Paiement sécurisé' })
h('a', { href: 'https://instagram.com/…', 'aria-label': 'Avion sur Instagram' }, h(Avion.Icon, { name: 'instagram', size: 'md' }))
```
