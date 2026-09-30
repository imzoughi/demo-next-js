# Étape 4 — Design system dans Claude Design · check-list du pilote

> Projet : boutique-demo · pack du 30/09/2026 · 8 groupes, 37 composants
> Coche chaque case au fur et à mesure (`[x]`). Un doute ? Arrête-toi et lance `/next-step` dans Claude Code.

## A. Ouvrir
- [ ] Dans Claude (Cowork), créer un design system nommé « boutique-demo ».
- [ ] Joindre `design/pack.zip` au premier message.

## B. Coller les prompts, dans l'ordre (`design/pack/prompts-claude-design.md`)
- [ ] Prompt 1 · Création → attendre la fin de la réponse.
- [ ] Prompt 2 · Groupe « Fondations et icônes » (2 composants) → vérifier que les 2 composants apparaissent.
- [ ] Prompt 3 · Groupe « Actions » (3 composants) → vérifier que les 3 composants apparaissent.
- [ ] Prompt 4 · Groupe « Formulaires » (4 composants) → vérifier que les 4 composants apparaissent.
- [ ] Prompt 5 · Groupe « Cartes » (3 composants) → vérifier que les 3 composants apparaissent.
- [ ] Prompt 6 · Groupe « Retours et états » (5 composants) → vérifier que les 5 composants apparaissent.
- [ ] Prompt 7 · Groupe « Couches » (3 composants) → vérifier que les 3 composants apparaissent.
- [ ] Prompt 8 · Groupe « Navigation » (4 composants) → vérifier que les 4 composants apparaissent.
- [ ] Prompt 9 · Groupe « Sections de page » (13 composants) → vérifier que les 13 composants apparaissent.
- [ ] Prompt 10 · Écrans absents du Figma : mini-panier, paiement, compte → vérifier que les 3 écrans existent en desktop et mobile.
- [ ] Prompt 11 · Contrôle → lire le tableau rendu par Claude Design.

## C. Vérifier (avant d'exporter)
- [ ] Couleurs et typographies identiques au Figma (comparer avec `design/pack/captures/`).
- [ ] Chaque composant a ses états (survol, focus, désactivé, erreur).
- [ ] Les animations ont une version « mouvement réduit ».
- [ ] Le tableau de contrôle ne signale aucun écart, ou chaque écart est accepté par toi (notamment : placeholder à 70 %, icônes de réseaux sociaux en SVG Carbon, Radio, couleurs d'erreur et de succès, ombres, thème sombre dérivé).
- [ ] Seules les corrections UX que tu as cochées sont appliquées.
- [ ] Les textes de démonstration sont en français, en euros, en casse de phrase.
- [ ] Si le client doit voir le design system : partager le lien Claude Design et attendre son accord.

## D. Exporter et déposer
- [ ] Prompt 12 · Export → télécharger le zip `ds-export`.
- [ ] Le dézipper dans `design/ds-export/` du dépôt (sans rien modifier).
- [ ] Revenir dans Claude Code et lancer `/next-step`.
