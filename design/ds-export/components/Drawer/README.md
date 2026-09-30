Panneau modal générique (droite, bas ou gauche) avec voile, titre et croix : focus piégé, fermeture par la croix, Échap et clic sur le voile, retour du focus au déclencheur.

## Usage

`h(Avion.Drawer, { open, onClose, title: 'Votre panier', footer }, contenu)`. Le consommateur fournit `open` et `onClose` (il décide de fermer), le `title` (nom du dialogue), le contenu et un `footer` fixe pour les actions. Le Drawer s'occupe du voile, du focus, d'Échap, du blocage du défilement de la page et du retour du focus au bouton qui l'a ouvert (mettre `aria-expanded` sur ce bouton).

- Base de MiniCart, FiltersSheet et du menu mobile de TopNav (`side: 'left'`).
- À éviter : un Drawer dans un Drawer, un Drawer sans titre, une action principale hors du `footer`.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `side` | `right` (largeur `size-drawer`) · `bottom` · `left` | `right` |
| `fullScreenMobile` | plein écran sous 768 px (bas : pleine hauteur) | `true` |
| `title`, `closeLabel` | titre `h4` ; nom de la croix | —, « Fermer » |
| `footer` | zone d'actions fixe en bas | — |
| `initialFocus` | ref de l'élément à focaliser à l'ouverture (sinon le panneau, lu avec son titre) | — |
| `busy` | `aria-busy` pendant un chargement | `false` |
| `onClosed` | appelé après l'animation de fermeture | — |
| `static` | rendu dans son conteneur (positionné), sans piège ni blocage : documentation et maquettes seulement | `false` |

Panneau `color-surface-default`, ombre `shadow-overlay`, angles droits, voile `color-overlay` ; couches `z-overlay` et `z-drawer` ; marges `space-5`.

## États

Fermé (rien n'est rendu) · ouverture · ouvert · fermeture (l'animation se termine avant le retour du focus).

## Accessibilité

- `role="dialog"`, `aria-modal="true"`, nommé par son titre ; le focus entre dans le panneau à l'ouverture.
- Tab et Maj+Tab restent dans le panneau ; un focus qui en sort (élément retiré, Toast) y revient.
- Échap ferme depuis n'importe où tant que le panneau est ouvert ; la croix fait 44 × 44 px.

## Animations

Ligne **Drawer, MiniCart** du catalogue : glissement du panneau + fondu du voile en `motion-duration-slow`, `motion-ease-enter` à l'ouverture et `motion-ease-exit` à la fermeture, niveau 2. Mode réduit : fondu seul en `motion-duration-fast`, sans déplacement.

## Exemple

```js
h(Avion.Drawer, { open: open, onClose: function () { setOpen(false); }, title: 'Informations de livraison', footer: h(Avion.Button, { fullWidth: true, onClick: close }, 'J’ai compris') }, contenu)
```
