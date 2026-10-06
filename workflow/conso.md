# Consommation de tokens — boutique-demo (nextjs)

**Total : 6,8 M tokens** sur 28 tours et 5 sessions — dont 6,3 M relus depuis le cache (facturés environ 10 fois moins cher) et 55 k produits.

## Par étape
| | Total | dont entrée neuve | dont cache relu | Sortie |
|---|---|---|---|---|
| 7 · Publier | 4,7 M | 319 k | 4,4 M | 45 k |
| 0 · Pilotage | 2,1 M | 180 k | 1,9 M | 10 k |

## Par modèle
| | Total | dont entrée neuve | dont cache relu | Sortie |
|---|---|---|---|---|
| opus | 6,8 M | 498 k | 6,3 M | 55 k |

## Où agir
- Une étape au-dessus de son budget : regarder ses tours dans workflow/logs/tokens.jsonl (commande, agents).
- Beaucoup d’opus hors audit et escalade : vérifier "model" dans .claude/settings.json et modeles dans decade.config.json.
- Cache relu très élevé dans une session : /compact entre deux étapes.
