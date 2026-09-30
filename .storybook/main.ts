import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-mcp'],
  framework: { name: '@storybook/nextjs-vite', options: {} },
  features: { componentsManifest: true },
  staticDirs: ['../public'],
};

export default config;
