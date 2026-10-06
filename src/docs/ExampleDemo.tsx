"use client";
// Rend l’exemple vivant d’une story côté client : les stories reçoivent des fonctions (onClose, onAdd…) et utilisent
// des hooks, ce qui n’est pas possible depuis un composant serveur. Le HTML reste généré au build (export statique).
import { components } from "./catalog";

export function ExampleDemo({ id, name }: { id: string; name: string }) {
  const Render = components.find((c) => c.id === id)?.examples.find((e) => e.name === name)?.Render;
  return Render ? <Render /> : null;
}
