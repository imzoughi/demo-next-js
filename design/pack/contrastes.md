# Contrastes (WCAG 2.2, calculés)

Seuils : 4,5:1 texte courant · 3:1 grands textes (≥ 24 px, ou ≥ 18,5 px gras) et composants d’interface.

## Thème clair

| Texte | Fond | Ratio | Verdict | Usage |
| --- | --- | --- | --- | --- |
| color.text.default #2A254B | color.surface.default #FFFFFF | 14.34:1 | ok | texte courant, titres, prix |
| color.text.default #2A254B | color.surface.subtle #F9F9F9 | 13.62:1 | ok | texte sur fond gris clair (panier, fiche) |
| color.text.brand #4E4D93 | color.surface.default #FFFFFF | 7.48:1 | ok | liens, sous-total, navigation |
| color.text.brand #4E4D93 | color.surface.subtle #F9F9F9 | 7.11:1 | ok | texte d’aide du panier |
| color.text.inverse #FFFFFF | color.action.primary #2A254B | 14.34:1 | ok | bouton Primary, pied de page, hero |
| color.text.inverse #FFFFFF | color.brand.primary #4E4D93 | 7.48:1 | ok | texte sur fond Primary |
| color.text.placeholder #6A6681 | color.surface.default #FFFFFF | 5.48:1 | ok | placeholder à 70 % (la correction UX disait 60 % = 4,03:1, insuffisant) |
| color.text.disabled #AAA8B7 | color.surface.default #FFFFFF | 2.33:1 | insuffisant | désactivé à 40 % (exempté WCAG, informatif) |
| color.text.default #2A254B | color.surface.hover #EBE8F4 | 11.87:1 | ok | bouton Secondary au survol |
| color.text.inverse #FFFFFF | color.action.opaque (estimé) #6B679F | 5.16:1 | ok | bouton Opaque (couleur estimée sur capture) |
| color.border.default #EBE8F4 | color.surface.default #FFFFFF | 1.21:1 | insuffisant | séparateur décoratif |
| color.border.strong #CAC6DA | color.surface.default #FFFFFF | 1.67:1 | insuffisant | bordure marquée |
| color.border.input #4E4D93 | color.surface.default #FFFFFF | 7.48:1 | ok | bordure de champ et de case à cocher (3:1 requis) |
| color.focus.ring #4E4D93 | color.surface.default #FFFFFF | 7.48:1 | ok | anneau de focus sur fond clair |
| color.focus.ring-inverse #FFFFFF | color.action.primary #2A254B | 14.34:1 | ok | anneau de focus sur fond sombre |
| color.feedback.error #B3261E | color.surface.default #FFFFFF | 6.54:1 | ok | message d’erreur (proposé) |
| color.feedback.success #1E6B3A | color.surface.default #FFFFFF | 6.52:1 | ok | message de succès (proposé) |
| color.text.inverse #FFFFFF | color.feedback.error #B3261E | 6.54:1 | ok | toast d’erreur (proposé) |

## Thème sombre (dérivé)

| Texte | Fond | Ratio | Verdict | Usage |
| --- | --- | --- | --- | --- |
| color.text.default #FFFFFF | color.surface.default #2A254B | 14.34:1 | ok | thème sombre : texte courant |
| color.text.brand #EBE8F4 | color.surface.default #2A254B | 11.87:1 | ok | thème sombre : liens |
| color.text.default #FFFFFF | color.surface.subtle #4E4D93 | 7.48:1 | ok | thème sombre : cartes |
| color.text.inverse #2A254B | color.action.primary #FFFFFF | 14.34:1 | ok | thème sombre : bouton Primary inversé |
| color.border.input #CAC6DA | color.surface.default #2A254B | 8.6:1 | ok | thème sombre : bordure de champ |
