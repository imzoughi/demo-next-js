import type { Preview } from '@storybook/nextjs-vite';
import '../src/styles/globals.scss';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Thème du design system',
      toolbar: {
        title: 'Thème',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Clair' },
          { value: 'dark', title: 'Sombre (dérivé)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      if (typeof document !== 'undefined') document.documentElement.dataset.theme = context.globals.theme ?? 'light';
      return Story();
    },
  ],
  parameters: {
    a11y: { test: 'error' },
    layout: 'fullscreen',
    viewport: {
      options: {
        mobile: { name: '375', styles: { width: '375px', height: '812px' } },
        tablet: { name: '768', styles: { width: '768px', height: '1024px' } },
        desktop: { name: '1280', styles: { width: '1280px', height: '800px' } },
        wide: { name: '1440', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
};

export default preview;
