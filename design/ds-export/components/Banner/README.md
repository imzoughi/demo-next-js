Bandeau d'annonce fermable au-dessus de l'en-tête (« Livraison offerte dès 50 € avec le code PRINTEMPS »).

## Usage

`h(Avion.Banner, { onDismiss: remember }, 'Livraison offerte dès 50 € avec le code PRINTEMPS')`. Le consommateur fournit le message (une phrase, casse de phrase), l'icône éventuelle et mémorise la fermeture pour la session. Contrôlé avec `open`, sinon le bandeau se retire seul.

- Accueil et fiche produit (anatomie des pages), jamais plus d'un bandeau.
- À éviter : un défilement automatique de plusieurs messages, un compte à rebours, un bandeau non fermable.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `children` | message (un lien `a` possible, souligné) | — |
| `icon` | nom Lucide, ou `false` | `truck` |
| `dismissible` | croix « Fermer l'annonce » | `true` |
| `open` / `onDismiss` | contrôle et fermeture | — |

Fond `color-surface-inverse`, texte `body-medium` (16 px, contrôle : c'est un message à lire) en `color-text-inverse`, hauteur ≥ `size-target-min`, `z-banner`.

## États

| État | Rendu |
| --- | --- |
| Défaut | message centré, croix à droite |
| Focus | contour 2 px `color-focus-ring-inverse` sur la croix |
| Survol de la croix | fond `color-brand-primary` |
| Fermé | retiré ; le focus passe à l'élément suivant (le logo) |
| Mobile | le message passe à la ligne, la croix reste accessible |

## Accessibilité

- `section` « Annonce » ; croix de 44 × 44 px nommée.
- Contraste : 14,34:1 dans les deux thèmes.
- Après fermeture, le focus ne se perd pas.

## Animations

Aucune ligne dans le catalogue : la fermeture est immédiate, sans animation.

## Exemple

```js
!seen && h(Avion.Banner, { onDismiss: function () { sessionStorage.setItem('annonce', '1'); setSeen(true); } }, 'Livraison offerte dès 50 € avec le code PRINTEMPS')
```
