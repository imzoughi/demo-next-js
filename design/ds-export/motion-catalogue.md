# Catalogue de mouvement

Niveau **sobre**. Toute animation se construit avec les tokens `motion-duration-*`, `motion-ease-*`, `motion-distance-*` et `motion-stagger` ; aucune durée, courbe ou distance écrite en dur. Tokens : famille `motion` de tokens.json.

## Règles

- Autorisé : changements d'état sur place, ouverture et fermeture des couches, retours de validation.
- Interdit : apparition au défilement, parallaxe, défilement détourné, carrousel automatique (le hero d'accueil est fixe), tout mouvement automatique de plus de 5 s sans bouton pause.
- Boucles bornées : une animation qui se répète (chargement, Skeleton) est jouée une seule fois sur `motion-duration-loop` (4,8 s, ≤ 5 s) puis s'arrête ; aucune boucle `infinite`.
- Aucune animation ne bloque une action : un clic pendant une transition est pris en compte.
- Entrée à l'écran : `motion-ease-enter` ; sortie : `motion-ease-exit` ; changement sur place : `motion-ease-standard`.

## Mode « réduire les animations »

Sous `@media (prefers-reduced-motion: reduce)`, chaque composant applique son niveau :

| Niveau | Réduit | Durée |
| --- | --- | --- |
| 1 | retiré | `motion-duration-reduced` (0.01ms, pas 0s) |
| 2 | fondu court, sans déplacement ni échelle | `motion-duration-fast` (160 ms, ≤ 200 ms) |
| 3 | gardé tel quel (échelle et rotation retirées) | inchangée |

Le catalogue sobre n'a aucune ligne de niveau 1. Icon n'a pas de ligne propre : son option `spin` porte la rotation de **Button (chargement)**, et le Logo suit la ligne **IconButton, TextLink**.

## Catalogue

| Composant | Déclencheur | Ce qui bouge | Tokens | Niveau | Version réduite |
| --- | --- | --- | --- | --- | --- |
| Button | survol, appui | couleur de fond ; échelle `motion-scale-press` (0,98) à l'appui | instant, standard | 3 | couleur gardée, échelle retirée |
| Button (chargement) | clic sur « Ajouter au panier » | indicateur en rotation (6 tours sur `motion-duration-loop`, puis arrêt) et retour à l'état normal | loop, standard | 3 | rotation remplacée par 3 pulsations d'opacité (`opacity-pulse`) sur `motion-duration-loop` |
| IconButton, TextLink, Logo | survol, focus | couleur, soulignement | fast, standard | 3 | gardé |
| TextInput, Checkbox, Radio | focus, erreur | bordure, anneau de focus, message d'erreur | fast, standard | 3 | gardé |
| Stepper | appui | couleur du bouton | instant, standard | 3 | gardé |
| ProductCard | survol, appui | ombre + soulèvement `motion-distance-small` ; retombe à l'appui | fast, standard | 2 | soulèvement retiré, fondu d'ombre gardé |
| Drawer, MiniCart | ouverture / fermeture | glissement latéral + voile | slow, enter / exit | 2 | fondu du panneau et du voile, `motion-duration-fast` |
| FiltersSheet | ouverture / fermeture | glissement depuis le bas + voile | slow, enter / exit | 2 | fondu, `motion-duration-fast` |
| TopNav (menu mobile) | ouverture | glissement latéral + voile (Drawer) | slow, enter / exit | 2 | fondu, `motion-duration-fast` |
| Toast | apparition / disparition (disparition auto après `motion-duration-toast`, 6 s, en pause au survol et au focus ; bouton Fermer) | fondu + décalage `motion-distance-small` | base, enter / exit | 2 | fondu seul, `motion-duration-fast` |
| FilterChip | retrait | fondu, réagencement sans saut | fast, exit | 3 | gardé |
| Badge | changement de quantité | léger fondu de la valeur | fast, standard | 3 | gardé |
| Skeleton | attente | 3 pulsations d'opacité (`opacity-pulse`) sur `motion-duration-loop`, puis arrêt | loop, standard | 3 | opacité fixe (demande du pilote, plus stricte que le catalogue) |
| Message d'erreur / succès | validation | fondu + décalage `motion-distance-small` | base, enter | 2 | fondu seul, `motion-duration-fast` |
| CartItem | « Retirer » | fondu puis fermeture de la hauteur | base, exit | 2 | fondu `motion-duration-fast`, hauteur fermée sans transition |
