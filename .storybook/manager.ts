import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

/** Storybook UI 의 기본 폰트(Nunito Sans)를 Figma 기준 폰트로 바꿉니다. 로드는 manager-head.html 이 합니다. */
export const FONT_BASE
  = '"Pretendard Variable", Pretendard, system-ui, -apple-system, "Segoe UI", sans-serif';

addons.setConfig({
  theme: { ...themes.dark, fontBase: FONT_BASE },
  sidebar: {
    showRoots: true,
  },
});
