import {
  koastTextColor,
  koastBackgroundColor,
  koastBorderColor,
  koastBoxShadowColor,
  koastMediaColor,
} from './src/styles/tokens/tailwind.generated.js';

/**
 * 내부 빌드 전용. 결과가 dist/style.css 로 배포되므로 소비자는 이 설정이 필요 없습니다.
 * 모든 유틸리티에 koast- 접두사가 붙어 소비자의 Tailwind 와 클래스가 충돌하지 않습니다.
 * 색상을 역할별 스케일에만 등록해 배경 토큰을 텍스트 색으로 쓰는 오용을 막습니다.
 * @type {import('tailwindcss').Config}
 */
export default {
  // 소비자 스타일과 격리하기 위해 모든 유틸리티를 네임스페이스합니다.
  prefix: 'koast-',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './dev/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    // 소비자 앱에 전역 리셋을 주입하지 않습니다. src/styles/base.css 가 대신합니다.
    preflight: false,
  },
  theme: {
    extend: {
      // media 토큰은 채색된 표면 위의 라벨/아이콘 색으로도 쓰이므로 텍스트 스케일에 함께 등록합니다.
      textColor: { ...koastTextColor, ...koastMediaColor },
      backgroundColor: koastBackgroundColor,
      borderColor: koastBorderColor,
      boxShadowColor: koastBoxShadowColor,
      ringColor: koastBorderColor,
      fill: koastMediaColor,
      stroke: koastMediaColor,
    },
  },
  plugins: [],
};
