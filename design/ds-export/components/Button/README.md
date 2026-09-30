Bouton d'action à angles droits en cinq types (primary, secondary, white, opaque, ghost) et deux tailles, avec états de survol, focus, appui, désactivé et chargement.

## Usage

`h(Avion.Button, { type: 'primary' }, 'Ajouter au panier')`. Le consommateur fournit le libellé (verbe à l'infinitif, casse de phrase), `onClick` ou `href` (le bouton devient un lien : « Voir la collection »), et gère `loading` pendant l'action.

- Une seule action `primary` par zone. Les actions secondaires sont `secondary` ou `ghost`.
- `white` et `opaque` se posent **uniquement** sur `color-surface-inverse` (hero, bloc « histoire », pied de page). Sur le fond sombre du hero, l'action principale est `white` (écart validé : le Figma y mettait `opaque`).
- En mobile, l'action principale passe en pleine largeur : `fullWidth: 'mobile'`.
- À éviter : deux `primary` côte à côte, un libellé en capitales, une icône à gauche, un bouton pour naviguer dans un texte (utiliser TextLink).

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `type` | `primary` (`color-action-primary`, libellé `color-text-inverse`) · `secondary` (`color-action-secondary`, libellé `color-text-default`) · `white` (`color-action-white`, `color-text-on-white`) · `opaque` (`color-action-opaque`, `color-text-on-opaque`) · `ghost` (transparent, `color-text-default`) | `primary` |
| `size` | `md` (`size-button-md`, 56 px, marges `space-6`) · `sm` (`size-button-sm`, 48 px, marges `space-5`) | `md` |
| `iconRight` | `true` (chevron-down, comme le kit) ou un nom d'icône Lucide ; icône md, écart `space-4` | aucune |
| `fullWidth` | `true` · `'mobile'` (sous `breakpoint-md`) | `false` |
| `loading` / `loadingLabel` | chargement ; libellé optionnel pendant l'attente (« Ajout en cours ») | `false` |
| `disabled` | désactivé | `false` |
| `href` | rend un `<a>` | — |
| `htmlType` | `button`, `submit`, `reset` | `button` |

Libellé en `body-medium` (Manrope 16 px).

## États

| État | Rendu |
| --- | --- |
| Défaut | fond du type |
| Survol | `color-action-*-hover` (ghost : `color-surface-hover`) |
| Focus | contour 2 px `color-focus-ring` décalé de 2 px ; `color-focus-ring-inverse` dans un conteneur `av-on-inverse` |
| Actif | échelle `motion-scale-press` (0,98) |
| Désactivé | `opacity-disabled` (0,4, kit Figma), curseur interdit, attribut `disabled` |
| Chargement | indicateur `loader-circle` en rotation à gauche du libellé, `aria-busy="true"` et `aria-disabled="true"` : le bouton garde le focus, les clics sont ignorés, la couleur ne s'estompe pas |

## Accessibilité

- Contrastes du libellé : primary 14,34:1 (clair et sombre), secondary 13,62:1 clair / 7,48:1 sombre, white 14,34:1, opaque 5,16:1, ghost 14,34:1 ; au survol ≥ 5,16:1 partout.
- Zone ≥ 48 px de haut. Un bouton `href` désactivé perd son `href` et reçoit `aria-disabled`.
- Pendant le chargement, annoncer le résultat ailleurs (Toast « Ajouté au panier », ouverture du MiniCart).

## Animations

Lignes **Button** et **Button (chargement)** du catalogue, niveau 3 :

- couleur de fond en `motion-duration-instant` / `motion-ease-standard` ; échelle `motion-scale-press` à l'appui ; indicateur de chargement : 6 tours sur `motion-duration-loop` (4,8 s) puis arrêt, le libellé « Ajout en cours » porte l'état ;
- indicateur : rotation (Icon `spin`, 5 × `motion-duration-fast` par tour).
- Mode réduit : couleur gardée, échelle retirée, rotation remplacée par une pulsation d'opacité.

## Exemple

```js
h(Avion.Button, { loading: adding, loadingLabel: 'Ajout en cours', fullWidth: 'mobile', onClick: add }, 'Ajouter au panier')
h(Avion.Button, { type: 'secondary', href: '/panier' }, 'Voir le panier')
h('section', { className: 'av-on-inverse' }, h(Avion.Button, { type: 'white', href: '/collection' }, 'Voir la collection'))
```
