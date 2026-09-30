// Pastille de statut QA (composant) ou d'avancement (page).
import s from "./doc-ui.module.scss";
export function Status({ value }: { value: "VERT" | "ROUGE" | "à venir" | "prête" }) {
  const cls = value === "VERT" || value === "prête" ? s.vert : value === "ROUGE" ? s.rouge : s.soon;
  return <span className={`${s.badge} ${cls}`}>{value}</span>;
}
