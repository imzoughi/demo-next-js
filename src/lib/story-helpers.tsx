import type { ComponentType, JSX } from 'react';

/** Aides des stories : marge autour de l'exemple et fond sombre de marque (color-surface-inverse). */
type StoryFn = ComponentType;

export function Pad(Story: StoryFn): JSX.Element {
  return (
    <div style={{ padding: 'var(--space-5)' }}>
      <Story />
    </div>
  );
}

export function OnInverse(Story: StoryFn): JSX.Element {
  return (
    <div className="av-on-inverse" style={{ padding: 'var(--space-5)', background: 'var(--color-surface-inverse)' }}>
      <Story />
    </div>
  );
}
