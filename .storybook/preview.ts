import type { Preview } from '@storybook/react'
// Tailwind 지시어를 직접 포함
import './tailwind-imports.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;