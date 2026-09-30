# Catalogue d'animations — boutique-demo (niveau « sobre »)

Ajusté depuis le modèle Decade. Le Figma n'a aucune annotation d'animation : les lignes viennent du modèle, limitées aux composants réels du projet.
Niveau « sobre » : durées telles quelles, **aucune apparition au défilement**, aucun carrousel automatique (le hero d'accueil est fixe), aucune parallaxe.
Niveaux en mode « réduire les animations » : 1 retiré · 2 adouci en fondu ≤ 200 ms sans déplacement · 3 gardé. En mode réduit, utiliser `0.01ms` (pas `0s`). Aucune animation ne bloque une action.

| Composant | Déclencheur | Ce qui bouge | Tokens | Niveau |
| --- | --- | --- | --- | --- |
| Button | survol, appui | couleur de fond ; échelle 0,98 à l'appui | instant, standard | 3 (échelle retirée en réduit) |
| Button (chargement) | clic sur « Ajouter au panier » | indicateur de chargement (rotation) puis retour à l'état normal | fast, standard | 3 (rotation remplacée par une pulsation d'opacité en réduit) |
| IconButton, TextLink | survol, focus | couleur, soulignement | fast, standard | 3 |
| TextInput, Checkbox, Radio | focus, erreur | bordure, anneau de focus, message d'erreur qui apparaît | fast, standard | 3 |
| Stepper | appui | couleur du bouton | instant, standard | 3 |
| ProductCard | survol | ombre + soulèvement small | fast, standard | 2 (soulèvement retiré, fondu d'ombre gardé) |
| Drawer, MiniCart | ouverture / fermeture | glissement latéral + voile | slow, enter / exit | 2 |
| FiltersSheet | ouverture / fermeture | glissement depuis le bas + voile | slow, enter / exit | 2 |
| TopNav (menu mobile) | ouverture | glissement latéral + voile (Drawer) | slow, enter / exit | 2 |
| Toast | apparition / disparition | fondu + décalage small | base, enter / exit | 2 |
| FilterChip | retrait | fondu, réagencement sans saut | fast, exit | 3 |
| Badge | changement de quantité | léger fondu de la valeur | fast, standard | 3 |
| Skeleton | attente | pulsation d'opacité | slow | 3 |
| Message d'erreur / succès | validation | fondu + décalage small | base, enter | 2 |
| CartItem | « Retirer » | fondu puis fermeture de la hauteur | base, exit | 2 |

Interdits : apparition au défilement (niveau expressif seulement), parallaxe, défilement détourné, carrousel automatique.
