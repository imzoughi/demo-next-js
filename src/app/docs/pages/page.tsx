// Pages et maquettes : état de chaque page du BRIEF ; l'aperçu (bureau et mobile) s'affiche quand la page est prête.
import type { Metadata } from "next";
import { site } from "@/data/site";
import { Status } from "@/docs/Status";

export const metadata: Metadata = { title: "Pages et maquettes · documentation" };

export default function Pages() {
  return (
    <article>
      <h1 className="h2">Pages et maquettes</h1>
      {site.pages.map((p) => (
        <section key={p.id}>
          <h2 className="h4">{p.title} <Status value={p.status} /></h2>
          {p.status === "prête" ? (
            <>
              <iframe src={p.href} title={`Aperçu bureau : ${p.title}`} loading="lazy" style={{ width: "100%", height: 520, border: 0 }} />
              <iframe src={p.href} title={`Aperçu mobile : ${p.title}`} loading="lazy" style={{ width: 375, height: 520, border: 0 }} />
            </>
          ) : <p>Cette page n’est pas encore intégrée.</p>}
        </section>
      ))}
    </article>
  );
}
