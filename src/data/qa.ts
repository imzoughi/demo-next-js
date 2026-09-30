// Statut QA par composant, d'après qa/qa-import-1.0.0.md (import du design system 1.0.0, 2026-09-30).
// Mis à jour à chaque /qa : un composant passe à VERT quand le contrôleur QA rend un verdict VERT.
export type QaStatus = "VERT" | "ROUGE";

export const qaSource = "qa/qa-import-1.0.0.md, puis qa/qa-ds-component-tour1.md à tour3.md";

export const qaRouge: Record<string, string> = {};

export const qaStatus = (ds: string): QaStatus => (ds in qaRouge ? "ROUGE" : "VERT");
