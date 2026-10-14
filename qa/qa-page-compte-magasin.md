# QA page « compte-magasin » : VERT (tour 2, 14 octobre 2026) — tour 1 : ROUGE

Contrôle indépendant, site construit (`out/`), 375 / 768 / 1280 / 1440 px, thèmes clair et sombre (`data-theme="dark"` sur `<html>`), mouvement normal et réduit. Rapport précédent (VERT, passe 10) remplacé ; il relevait trois remarques, rejouées ci-dessous.

| Contrôle | Statut | Détail |
| --- | --- | --- |
| lint / typecheck / build / docs:check | VERT | `npm run check` : 0 erreur, docs:check VERT (44 pages) |
| 1. « Voir sur la carte » : repère centré | VERT | écart au centre ≤ 1 px aux 4 largeurs, normal et réduit |
| 1. Carte entièrement visible | VERT | carte entre la barre collante (72 px) et le bas de l'écran aux 4 largeurs |
| 1. Bulle lisible, non coupée en haut | ROUGE à 375 px | haut OK (22 px de marge en 375/768, 54 px en 1280/1440). Mais à 375 px la bulle (335 px) est plus large que la carte (325 px) : coupée de 5 px à gauche et à droite, et recouverte par les boutons de zoom (+ / −) : « Avion » du titre et le début de l'adresse illisibles (« 55300 » au lieu de « 33300 ») |
| 2. Clic sur un repère | VERT | repère centré (≤ 1 px) ; fiche de la liste centrée dans la zone sous la barre (écart 0 px) aux 4 largeurs, normal et réduit |
| 3. Icônes Lucide | VERT | 9 icônes par carte, toutes `aria-hidden`, texte toujours présent, 16 px (lignes) et 20 px (boutons), alignées sur la 1re ligne ; clock, phone, messages-square, paintbrush visibles. Ui/Icon : 6 noms ajoutés, `iconNames` alimente la story AllLucide et la fiche `/docs/composants/icon` (messages-square, paintbrush, receipt présents) ; docs:check VERT |
| 4. Boutons : contraste | VERT | clair : primary 14,3:1, secondary 13,6:1 ; sombre : primary 14,3:1, secondary (liste) 7,5:1, favori 7,5:1 (liseré en plus). Bulle : 14,3:1 dans les deux thèmes |
| 4. Favori | VERT | « Magasin favori » + coche ; libellé accessible « Magasin favori : <nom>, activer pour retirer des favoris » ; un clic le retire |
| 4. Pleine largeur 375 px | VERT | boutons 277 px dans une carte de 327 px, aucun débordement ni défilement horizontal |
| Axe 4 largeurs × 2 thèmes (+ réduit) | VERT | 0 violation, bulle ouverte |
| Console / hydratation | VERT | aucune erreur ni avertissement (tuiles réseau exclues) |
| Mouvement réduit | VERT | pas d'animation de carte, centrage juste |
| Régressions recherche / favori / statut | VERT | « lyon » : 1 carte, 1 repère ; « zzz » : état vide ; statut ouvert / fermé affiché |
| Couleurs en dur | VERT | aucune dans `compte/` (scss, tsx) |
| Remarque : Échap ferme la bulle | NON CORRIGÉ | Échap ne ferme pas la bulle (même focus sur la croix) |
| Remarque : heading-order | NON CORRIGÉ | `h3` de la bulle placé après le `h1` sans `h2` (ordre du DOM) |
| Remarque : croix en sombre | PASSE (limite) | 3,11:1 (≥ 3:1) ; la règle `color` du SCSS ne s'applique pas (sélecteur sur le même élément que `.map`), c'est le gris Leaflet #757575 qui s'affiche |
| Performance | NON MESURÉ | hors périmètre de cette reprise |

## Écarts bloquants
1. 375 px : la bulle déborde de la carte et passe sous les boutons de zoom. Correction attendue : `maxWidth` de la bulle ≤ largeur de la carte moins ses marges (ex. `calc(100% - …)` ou option Leaflet adaptée à la taille de la carte), et soit décaler les contrôles de zoom, soit les placer au-dessus sans recouvrir la bulle (ex. zoom en bas à droite ou z-index sous la bulle). Vérifier titre et adresse entiers lisibles à 375 px.

## Remarques non bloquantes
2. Échap devrait fermer la bulle (écouteur `keydown` sur la région).
3. Titre de la bulle en `h2` (ou `p`) pour respecter l'ordre des titres.
4. Rendre effectif le style de la croix : cibler `.map :global(.leaflet-popup-close-button)` pour utiliser le token (sombre : mieux que 3,11:1).

---
## Tour 2 : VERT

Contrôle indépendant du site reconstruit, 375 / 768 / 1280 / 1440 px, clair et sombre, mouvement normal et réduit.

| Contrôle | Statut | Détail |
| --- | --- | --- |
| npm run check (lint, typecheck, build, docs:check) | VERT | 0 erreur ; 1 avertissement lint `<img>` hors espace client ; docs:check VERT |
| Bulle contenue dans la carte | VERT | marges gauche/droite 19/18 px à 375, 183 à 768, 123 à 1280, 83 à 1440 ; haut 22 px (375/768) et 54 px (1280/1440) |
| Bulle non recouverte par le zoom | VERT | zoom en bas à droite, aucun recouvrement (bulle / zoom / attribution) |
| Titre et adresse lisibles | VERT | « Avion Bordeaux Chartrons », « 9 cours Balguerie-Stuttenberg, 33300 Bordeaux », statut, bouton complets à 375 px |
| Repère centré après « Voir sur la carte » | VERT | écart ≤ 0,5 px aux 4 largeurs, normal et réduit |
| Repère centré et fiche de liste centrée après clic repère | VERT | repère ≤ 1 px ; fiche centrée sous la barre (écart 0 px) |
| Échap | VERT | ferme la bulle, y compris depuis la croix ; le focus revient sur « Voir sur la carte » |
| Ordre des titres | VERT | plus aucun h1/h2/h3 dans la bulle |
| Croix de fermeture | VERT | 14,3:1 clair et sombre (couleur par token) |
| Favori, recherche | VERT | favori posé depuis la bulle (1 bouton « Magasin favori ») ; « lyon » : 1 carte, 1 repère |
| Axe | VERT | 0 violation, 4 largeurs × 2 thèmes × (normal, réduit) |
| Console / hydratation | VERT | aucune erreur ni avertissement |

Aucun écart. Remarques du tour 1 toutes levées. Ligne backlog cochée.
