import React from 'react';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
// Tailwind 지시어를 직접 포함
import './tailwind-imports.css';
import './story-utils.css';

/**
 * 토큰 CSS 는 `data-koast-theme` 가 없으면 `prefers-color-scheme` 를 따라갑니다.
 * 속성을 안 걸어두면 OS 가 다크인 사람에게만 다크 테마가 나오고, 그 테마는 Figma 에 없어
 * 디자인 대조가 불가능합니다. Storybook 은 항상 명시적으로 테마를 지정하고 기본값을 light 로 둡니다.
 */
const preview: Preview = {
  globalTypes: {
    theme: {
      description: '토큰 테마입니다.',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-koast-theme', theme);
      return React.createElement(Story);
    },
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      theme: themes.dark,
    },
  },
};

export default preview;
