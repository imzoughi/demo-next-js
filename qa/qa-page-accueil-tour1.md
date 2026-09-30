# QA — page accueil, tour 1 (30/09/2026)

**Verdict : ROUGE.** (Rapport du contrôleur QA, recopié par la session principale : pas d'outil d'écriture côté contrôleur.)

## Contrôles
| Contrôle | Statut | Détail |
|---|---|---|
| npm run check | VERT | 48 pages statiques, /accueil incluse |
| Captures 375 / 768 / 1280 / 1440 | ROUGE | pas de débordement ; écart E1 |
| axe clair (WCAG 2.2 AA) | VERT | 0 violation aux 4 largeurs |
| axe sombre | n/a | la page n'a pas de thème sombre |
| Clavier (ordre, MiniCart, menu mobile) | VERT | focus piégé, Échap, retour du focus |
| Cibles 44 px | VERT | |
| Un seul H1, un main, lang=fr | VERT | |
| next/image priority | VERT | hero seul |
| Console | ROUGE | E2 |
| Liens | VERT | liens « Notre entreprise » et confidentialité en # |
| Mouvement réduit | VERT | |
| get_errors Next DevTools | non exécuté | pas de MCP |
| Code React / Next | VERT | Promise.all, seul SiteHeader client, aucune couleur en dur |
| Performance | AVERTISSEMENT | non bloquant : images 968 Ko > 200 Ko |

## Écarts bloquants
- **E1 — grille produits mobile (375)** : Figma 2 colonnes, code 1 colonne (images 327×409). `Listings` doit passer à 2 colonnes en mobile (ou le pilote tranche).
- **E2 — console** : avertissement next/image « width or height modified » sur img-17.jpg (`HeroBlocks.tsx` l. 46). Ajouter `height: auto` (style ou CSS) ou passer par `fill`. Un 404 ponctuel non reproduit (favicon ?).
- **E3 — poids des images** : img-17.jpg 692 Ko (2880 px), img-12.jpg 181 Ko ; `images.unoptimized` → à redimensionner (~1600 px, < 150 Ko).

## À valider par le pilote
1. Lettre d'information sans photo orange (EmailSignup sans variante image).
2. Bandeau « Livraison offerte dès 100 € d'achat » inventé (`src/mocks/site.ts`, `announcement`).
3. Textes FR et € : couverts par la correction UX « Contenus » (validé).
4. Détails : 6 catégories (Figma 7 avec doublon), titre « Notre sélection du moment » ajouté, bloc histoire plus bas, deux formulaires « S'inscrire » (page + pied de page).
5. Liens # du pied de page.

## Performance (Lighthouse desktop, out/ servi, 3 passages)
Médiane : score 98 · LCP 1 003 ms · CLS 0 · TBT 7 ms · JS 284 Ko · images 968 Ko (seuil 200 Ko). Accessibilité 100, bonnes pratiques 78.
Note : `npm run perf` entre en conflit avec `next dev` sur le port 3000.
