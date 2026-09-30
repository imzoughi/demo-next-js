"use client";
// Exemples vivants d'un composant : chaque story est rendue ici (portable stories de Storybook).
import { Suspense, use, type ComponentType } from "react";
import { composeStories } from "@storybook/react";
import { loaders } from "./loaders";
import s from "./doc-ui.module.scss";

type Composed = ComponentType & { storyName?: string };
type Stories = Record<string, Composed>;

const cache = new Map<string, Promise<Stories>>();
function load(id: string): Promise<Stories> {
  let p = cache.get(id);
  if (!p) {
    p = loaders[id]().then((mod) => composeStories(mod as never) as unknown as Stories);
    cache.set(id, p);
  }
  return p;
}

function All({ id }: { id: string }) {
  const stories = use(load(id));
  return (
    <>
      {Object.entries(stories).map(([key, Story]) => (
        <section key={key}>
          <h3 className={s.demoTitle}>{Story.storyName ?? key}</h3>
          <div className={s.demo}><Story /></div>
        </section>
      ))}
    </>
  );
}

export function Examples({ id }: { id: string }) {
  if (!loaders[id]) return <p className={s.muted}>Pas de story pour ce composant.</p>;
  return <Suspense fallback={<p className={s.muted}>Chargement des exemples…</p>}><All id={id} /></Suspense>;
}
