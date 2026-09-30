# QA page panier, tour 2 : VERT

Contrôleur indépendant. Cible : /panier/ (build statique out/ servi sur :4001), largeurs 375 / 768 / 1280 / 1440, Edge via Playwright.

| Contrôle | Statut | Détail |
| --- | --- | --- |
| npm run check | VERT | lint, types, build OK (51 pages) |
| Annuler : position (tour 1) | CORRIGÉ | Retirer Chaise (1re) puis Annuler : ordre Chaise, Vase ; Retirer Vase (2e) puis Annuler : Chaise, Vase |
| Focus après Retirer (tour 1) | CORRIGÉ | au clavier (Entrée) : focus sur le « Retirer » du voisin ; dernier article retiré : focus sur le « Retirer » de l'article restant ; panier vide : focus sur le H1 |
| Focus après Annuler | CORRIGÉ | focus sur « Retirer » de la ligne restaurée (Annuler lancé au clavier) ; depuis le panier vide, focus sur la ligne restaurée |
| Anneau de focus du H1 | ACCEPTABLE | cadre de 2 px bien visible autour de « Votre panier » (capture h1-focus.png) ; pas de rupture visuelle |
| Avertissement LCP | CORRIGÉ | 0 avertissement en build de production ; l'élément LCP est bien l'image de la Chaise Dandy (priority) |
| Libellés du Stepper | CORRIGÉ | « Diminuer / Augmenter la quantité de Chaise Dandy » et « ... de Vase Graystone » ; story WithSubject présente |
| Liens des lignes | CORRIGÉ | les deux lignes pointent vers /fiche-produit/ (navigation client vérifiée : H1 « Chaise Dandy ») |
| Cohérence MiniCart / fiche | VERT | panier initial 3 (Chaise 1 + Vase 2) ; ajout depuis la fiche : MiniCart 4, 5, 6, 7 ; Chaise plafonnée à 5 (« stock maximum atteint »), pastille bloquée à 7 ; Vase limité à 2 |
| Captures 375/768/1280/1440 | VERT | scrollWidth = largeur partout, mise en page conforme au tour 1 (empilé < 1280, colonnes Produit / Quantité / Total dès 1280) ; Stock maximum atteint affiché sur le Vase |
| Axe (4 largeurs) | VERT | 0 problème, le landmark-unique a disparu |
| Un seul H1 | VERT | « Votre panier » |
| Console | VERT | 0 erreur hors /favicon.ico (404), 0 avertissement |
| Mouvement réduit | VERT | retrait fonctionnel avec reducedMotion: reduce, focus déplacé |
| Stories (axe, build-storybook) | VERT | Stepper (dont WithSubject), CartItem, ShoppingBasket, MiniCart : aucun problème serious/critical ; seul « region » (moderate) sur chaque story isolée, artefact Storybook |
| Code React (Vercel) | VERT | état dans CartProvider (restoreLine fonctionnel, toSpliced, idempotent si la ligne existe), focus différé via useEffect sur une ref (pas d'état superflu), pas de waterfall ; pas d'empilement de booléens |
| Règles d'or | CONFORME | pas de couleur en dur ajoutée, priority et subject sont des props optionnelles rétro-compatibles |

## Performance (npm run build puis serveur sur :4000, 3 passages, preset desktop)
Score 99 / 99 / 99 (médiane 99) ; LCP 793 / 810 / 811 ms (médiane 810 ms) ; CLS 0,0009 ; TBT 2 à 7 ms (médiane 4 ms) ; JS 287 Ko (seuil 300) ; images 27 Ko (seuil 200). Toutes les valeurs sont dans les seuils.

## Écarts restants
Aucun bloquant.

## Remarques non bloquantes
- lighthouserc.cjs lit `stack` dans decade.config.json, qui est vide ("") : `npm run perf` prendrait alors le port 4173 et l'URL sans slash final. La config modifiée suppose stack = nextjs. À renseigner par le pilote (« nextjs ») ; pour cette mesure j'ai utilisé une config temporaire (tmp-qa/panier2/lh.cjs) : mêmes seuils, url http://localhost:4000/panier/.
- Un autre passage Lighthouse tournait en parallèle sur :4000 (rapports accueil et liste-produits dans le même dossier) ; les 3 mesures panier sont les seules retenues.
- Les liens de l'en-tête sont de simples <a> : l'état du panier en mémoire est perdu en passant par eux (rechargement). Comportement de démo, hors périmètre.
- Bouton « Ajouter au panier » de la fiche reste actif quand le plafond de 5 est atteint, sans message ; à traiter côté fiche.
- Double retrait : seule la dernière annulation est possible ; à valider par le pilote (non compté).
- Non exécutés : npm run test:ui (dossier tests/ vide, Playwright ne cible que Storybook) et Next DevTools get_errors (aucune erreur de build ni d'hydratation observée en console).
