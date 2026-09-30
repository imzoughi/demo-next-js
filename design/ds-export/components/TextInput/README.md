Champ de saisie d'une ligne avec label visible au-dessus, aide et message d'erreur ou de succès sous le champ, en variante primary ou opaque (sur fond sombre).

## Usage

`h(Avion.TextInput, { label: 'Adresse e-mail', type: 'email', autoComplete: 'email' })`. Le consommateur fournit `label` (toujours, même masqué), le bon `type` et `autoComplete`, la valeur (`value` + `onChange`, ou `defaultValue`), et les messages `hint`, `error`, `success` calculés par sa validation (à la sortie du champ ou à l'envoi, jamais à chaque frappe).

- Un champ par ligne en mobile ; sur desktop, deux champs courts peuvent partager une ligne (prénom / nom, code postal / ville).
- Placeholder = exemple de format (« vous@exemple.fr », « 75011 »), jamais le label ni une consigne.
- Champs facultatifs marqués `optional` (« (facultatif) ») ; les autres sont obligatoires par défaut.
- À la soumission en erreur : résumé des erreurs en haut du formulaire et focus sur le premier champ en erreur (géré par le formulaire).
- À éviter : label à l'intérieur du champ, message d'erreur en haut seulement, validation pendant la frappe, champ plus haut que `size-button-md`.

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `variant` | `primary` (fond `color-surface-default`, bordure `color-border-input`) · `opaque` (fond `color-action-opaque`, texte `color-text-on-opaque`, bordure `color-border-input-inverse`, sur `color-surface-inverse`) | `primary` |
| `type` | `text` · `email` (clavier e-mail) · `tel` (clavier téléphone) · `numeric` (clavier numérique : code postal, carte, code de sécurité) · `password` | `text` |
| `label` | texte du label, obligatoire | — |
| `hideLabel` | label masqué visuellement, lu par les lecteurs d'écran : **seulement** la lettre d'information du pied de page | `false` |
| `hint` | aide sous le champ (`body-small`, `color-text-brand`) ; les messages d'erreur et de succès passent en `body-medium` | — |
| `error` / `success` | message sous le champ, avec icône `circle-alert` / `check` | — |
| `optional` | ajoute « (facultatif) » | `false` |
| `autoComplete` | `email`, `tel`, `given-name`, `family-name`, `street-address`, `address-line2`, `postal-code`, `address-level2`, `country-name`, `cc-number`, `cc-name`, `cc-exp`, `cc-csc`, `current-password`, `new-password` | — |

Hauteur `size-button-md` (56 px), marges internes `space-5`, texte `body-medium`, écart label → champ → message `space-2`.

## États

| État | primary | opaque |
| --- | --- | --- |
| Défaut | bordure `color-border-input`, placeholder `color-text-placeholder` (70 %) | bordure `color-border-input-inverse`, placeholder `color-text-placeholder-opaque` |
| Survol | bordure `color-text-default` | bordure `color-text-inverse` |
| Focus | contour 2 px `color-focus-ring` décalé de 2 px | `color-focus-ring-inverse` |
| Rempli | texte `color-text-default` | texte `color-text-on-opaque` |
| Désactivé | fond `color-surface-subtle`, bordure `color-border-strong`, texte `color-text-disabled` | `opacity-disabled` |
| Erreur | bordure 2 px `color-feedback-error`, message `color-feedback-error`, `aria-invalid="true"` | `color-feedback-error-inverse` |
| Succès | bordure `color-feedback-success`, message `color-feedback-success` | `color-feedback-success-inverse` |

## Accessibilité

- `label` relié par `for` ; aide et message reliés par `aria-describedby` ; le message est dans une zone `aria-live="polite"`.
- Contrastes : texte 14,34:1 ; placeholder 5,48:1 (clair) et 7,8:1 (sombre) ; placeholder opaque 4,55:1 ; bordure 7,48:1 (≥ 3:1) ; erreur 6,54:1.
- En thème sombre, poser les champs sur `color-surface-default`, jamais sur `color-surface-subtle` (placeholder 4,07:1).
- L'erreur n'est jamais portée par la couleur seule : icône + texte.

## Animations

- Ligne **TextInput, Checkbox, Radio** : bordure et anneau de focus en `motion-duration-fast` / `motion-ease-standard`, niveau 3, gardé en mode réduit.
- Ligne **Message d'erreur / succès** : fondu + décalage `motion-distance-small` en `motion-duration-base` / `motion-ease-enter`, niveau 2 ; en mode réduit, fondu seul en `motion-duration-fast`.

## Exemple

```js
h(Avion.TextInput, { label: 'Code postal', type: 'numeric', autoComplete: 'postal-code', maxLength: 5, placeholder: '75011', error: invalid && 'Code postal invalide' })
h('footer', { className: 'av-on-inverse' }, h(Avion.TextInput, { variant: 'opaque', label: 'Adresse e-mail', hideLabel: true, type: 'email', autoComplete: 'email', placeholder: 'vous@exemple.fr' }))
```
