Message bref et non bloquant (« Ajouté au panier », « Article retiré · Annuler ») annoncé par `role="status"`, qui disparaît seul après `motion-duration-toast` (6 s), en pause au survol et au focus.

## Usage

`h(Avion.Toast, { open, tone: 'info', message: 'Article retiré', action: { label: 'Annuler', onClick: undo }, onDismiss })`. Le consommateur garde **une seule** instance par page (la zone `role="status"` doit exister avant le message pour être annoncée), change `message` et `open`, et fournit `action` quand l'opération est réversible.

- Confirmer une action faite ailleurs : ajout au panier (avec l'ouverture du MiniCart), retrait d'article, inscription.
- Un message à la fois : un nouveau remplace le précédent (changer la `key` ou le `message`).
- À éviter : une erreur de champ (elle va sous le champ), une information indispensable, plus d'une action, un Toast sans « Annuler » pour une suppression.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `tone` | `info` (fond `color-surface-inverse`) · `success` (même fond, icône `check` en `color-feedback-success-inverse`) · `error` (fond `color-feedback-error`, icône `circle-alert`) | `info` |
| `message` | texte court, casse de phrase, sans point final | — |
| `action` | `{ label: 'Annuler', onClick }` : bouton souligné, ferme le Toast | — |
| `duration` | ms avant disparition ; `0` = reste affiché | token `motion-duration-toast` (6000) |
| `position` | `fixed` (bas à droite dès 768 px, bas pleine largeur en mobile, `z-toast`) · `static` (dans la page) | `fixed` |
| `onDismiss` | appelé après la disparition | — |

Texte `body-medium` en `color-text-inverse`, hauteur ≥ `size-button-md`, largeur ≤ 44 caractères, ombre `shadow-overlay`, angles droits.

## États

| État | Rendu |
| --- | --- |
| Apparition | fondu + montée de `motion-distance-small` |
| Visible | compte à rebours de `duration` |
| En pause | au survol et quand le focus est dans le Toast : le compte s'arrête et reprend à la sortie |
| Fermeture | croix « Fermer le message » (44 × 44), action, ou fin du compte |
| Survol des boutons | fond `color-brand-primary` (sur `error` : `color-surface-inverse`) |
| Focus | contour 2 px `color-focus-ring-inverse` à l'intérieur du bouton |

## Accessibilité

- Zone `role="status"`, `aria-live="polite"`, `aria-atomic="true"` : le message est lu sans voler le focus.
- Contrastes : 14,34:1 (info, success), 6,54:1 clair et 8,4:1 sombre (error) ; icône succès 9,12:1.
- `motion-duration-toast` (6 s) minimum, pause au survol et au focus, fermeture manuelle : l'utilisateur garde le contrôle du temps.
- « Annuler » est aussi joignable au clavier : Tab depuis la page, le Toast est dans l'ordre de lecture.

## Animations

Ligne **Toast** du catalogue, niveau 2 : entrée en `motion-duration-base` / `motion-ease-enter`, sortie en `motion-duration-base` / `motion-ease-exit`, décalage `motion-distance-small`. Mode réduit : fondu seul en `motion-duration-fast`, sans déplacement. La fin de l'animation (et non une durée écrite en dur) déclenche `onDismiss`.

## Exemple

```js
h(Avion.Toast, { open: !!toast, tone: 'success', message: 'Ajouté au panier', onDismiss: function () { setToast(null); } })
```
