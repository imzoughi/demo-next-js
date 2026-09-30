Étapes numérotées du tunnel de commande (1 Livraison, 2 Paiement, 3 Confirmation), avec étape faite, courante et à venir.

## Usage

`h(Avion.CheckoutProgress, { current: 1, onStepClick: goTo })`. Le consommateur fournit l'index de l'étape courante et, pour revenir en arrière, `onStepClick` (seules les étapes faites sont cliquables).

## Variantes

| Propriété | Valeurs | Défaut |
| --- | --- | --- |
| `steps` | libellés | Livraison, Paiement, Confirmation |
| `current` | index (0 à 2) | 0 |
| `onStepClick(i)` | rend les étapes faites cliquables | — |

Pastilles rondes `radius-pill` de `size-target-min`, libellés `body-medium`, trait `color-border-strong` entre les étapes ; « Étape 2 sur 3 » au-dessus, en `body-medium` comme les numéros (contrôle : texte ≥ 16 px) ; libellés sur une ligne, centrés sous leur pastille, écart `space-2` entre étapes.

## États

| État | Rendu |
| --- | --- |
| Faite | coche, fond `color-surface-hover`, bordure `color-text-default`, cliquable |
| Courante | fond `color-action-primary`, chiffre `color-text-inverse`, `aria-current="step"` |
| À venir | cercle vide, libellé `color-text-brand` |

## Accessibilité

`nav` « Étapes de la commande », liste ordonnée ; état écrit pour les lecteurs d'écran (« terminée », « à venir ») ; pastilles de 44 px.

## Animations

Aucune.

## Exemple

```js
h(Avion.CheckoutProgress, { current: step, onStepClick: setStep })
```
