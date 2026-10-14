# QA page « compte-informations » : VERT (reprise du 14 octobre 2026)

Contrôle indépendant, site construit, 375 / 768 / 1280 / 1440 px, thèmes clair et sombre (`data-theme`), mouvement normal et réduit. Rapport précédent remplacé.

| Contrôle | Statut | Détail |
| --- | --- | --- |
| lint / typecheck / build / docs:check | VERT | `npm run check` : 0 erreur, docs:check VERT |
| Axe 4 largeurs × 2 thèmes × (normal, réduit) | VERT | 0 violation |
| Débordement | VERT | scrollWidth = largeur de la fenêtre aux 4 largeurs |
| Titres | VERT | h1 « Mes informations », puis h2 Coordonnées, Mes adresses, Changer le mot de passe |
| Icônes (livraison, facturation) | VERT | `aria-hidden`, texte présent ; icône `receipt` ajoutée à ui/Icon, story et docs à jour |
| Console / hydratation | VERT | aucune erreur ; un avertissement « preload CSS non utilisé » du serveur de fichiers statiques, sans lien avec le code |
| Couleurs en dur | VERT | aucune |
| Formulaire d'adresses | VERT (rendu) | formulaire présent, case « facturation identique » cochée, boutons lisibles ; comportement détaillé repris du rapport précédent, non modifié |

## Écarts bloquants
Aucun.
