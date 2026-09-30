// Performance : mesures Lighthouse des pages construites, lues dans qa/perf.json (écrit par /qa).
import type { Metadata } from "next";
import { readJson } from "@/docs/read";
import { Status } from "@/docs/Status";
import s from "@/docs/doc-ui.module.scss";

export const metadata: Metadata = { title: "Performance · documentation" };

type Row = { page: string; score: number; lcpMs: number; cls: number; tbtMs: number; jsKo: number; imagesKo: number; ok: boolean };

export default function Performance() {
  const raw = readJson<Row[] | { mesures?: Omit<Row, "ok">[] }>("qa/perf.json");
  const list = Array.isArray(raw) ? raw : (raw?.mesures ?? []);
  const rows: Row[] = list.map((r) => ({ ok: r.score >= 85, ...r }));
  return (
    <article>
      <h1 className="h2">Performance</h1>
      {rows.length === 0 ? <p>Aucune mesure pour l’instant : elles arrivent avec les pages (lancer /qa all).</p> : (
        <table className={s.table}>
          <thead><tr><th>Page</th><th>Score</th><th>LCP</th><th>CLS</th><th>TBT</th><th>JS</th><th>Images</th><th>Statut</th></tr></thead>
          <tbody>{rows.map((r) => (
            <tr key={r.page}><td>{r.page}</td><td>{r.score}</td><td>{r.lcpMs} ms</td><td>{r.cls}</td><td>{r.tbtMs} ms</td><td>{r.jsKo} Ko</td><td>{r.imagesKo} Ko</td><td><Status value={r.ok ? "VERT" : "ROUGE"} /></td></tr>
          ))}</tbody>
        </table>
      )}
    </article>
  );
}
