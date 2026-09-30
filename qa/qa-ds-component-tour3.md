# QA — boucle /ds-component, tour 3 (30/09/2026) — EmailSignup

Verdict : **VERT**

## Contrôles
| Contrôle | Statut | Détail |
| --- | --- | --- |
| npm run check | VERT | lint, types, build : code de sortie 0 |
| build-storybook | VERT | reconstruit |
| Couleur calculée, message Erreur / Échec serveur, sombre, 1280 | VERT | `rgb(249,220,218)` = #F9DCDA ; `--color-feedback-error` calculée sur le message = `color-mix(in srgb, #f2b8b5 50%, #fff)`, non vide, pas de cycle |
| Contraste message | VERT | #F9DCDA sur #4E4D93 = **5,80:1** (tour 2 : #F2B8B5 = 4,38:1) |
| Bordure du champ (aria-invalid=true) | VERT | bordure et anneau inset = #F9DCDA, identiques au message |
| Descendants profonds | VERT | le message (span) et l'input reçoivent la valeur : `--es-error-on-subtle` posée sur .root, `--color-feedback-error` redéfinie sur `.root > *` et héritée par les descendants |
| Axe (A/AA), clair et sombre, 375 et 1280, 8 stories | VERT | 0 violation |
| Rendu 375 / 768 / 1280 / 1440, clair et sombre | VERT | 0 débordement horizontal, 0 erreur JS |
| Clair, Erreur / Échec serveur | VERT | #b3261e sur #f9f9f9 = 6,21:1, bordure #b3261e (inchangé) |
| Variante Sombre (tone=dark), erreur | VERT | thème sombre : #b3261e (surface inverse claire), thème clair : #f2b8b5 ; axe 0 ; règle exclue par `:not(.dark)` |
| Variante Compact, erreur | VERT | sombre : #f2b8b5 (inchangé), clair : #b3261e ; axe 0 |
| Règles d'or (couleurs, tokens) | CONFORME | aucune couleur en dur ; mélange de tokens uniquement |
| Next get_errors | non exécuté | pas de MCP ; remplacé par build OK et 0 erreur console |

## Reste rouge
Rien. Le tour 2 est corrigé.
