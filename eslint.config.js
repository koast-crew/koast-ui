import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tailwindcss from 'eslint-plugin-tailwindcss';
import storybook from 'eslint-plugin-storybook';

/** 포맷은 Prettier 가 아니라 ESLint(@stylistic)가 담당합니다. `.prettierignore` 참고. */
export default tseslint.config(
  { linterOptions: { reportUnusedDisableDirectives: true } },
  {
    // 생성 산출물은 린트하지 않습니다. 원본은 semantic-color-tokens.csv 입니다.
    ignores: ['**/dist/**', '**/storybook-static/**', '**/*.generated.*'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // @stylistic 공식 프리셋. 규칙 60여 개를 여기서 받습니다.
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,
    commaDangle: 'always-multiline',
    braceStyle: '1tbs',
    arrowParens: true,
  }),

  {
    files: ['src/**/*.{js,jsx,ts,tsx}', 'dev/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'tailwindcss': tailwindcss,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...tailwindcss.configs.recommended.rules,

      'tailwindcss/no-custom-classname': 'off',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],

      // 아래 셋은 프리셋 기본값과 다르게 가져갑니다.
      '@stylistic/template-curly-spacing': ['error', 'always'],

      '@stylistic/jsx-curly-brace-presence': ['error', { props: 'always', children: 'always' }],
      '@stylistic/jsx-curly-spacing': ['error', { when: 'never', children: true }],

      // 아래 둘은 간결한 JSX / 삼항 표현을 해쳐서 끕니다.
      '@stylistic/jsx-one-expression-per-line': 'off',
      '@stylistic/multiline-ternary': 'off',
    },
  },

  ...storybook.configs['flat/recommended'],

  // 설정·스크립트도 검사 대상. 빠지면 외부 포매터가 임의로 바꿉니다.
  {
    files: ['*.config.js', '*.config.ts', 'scripts/**/*.{js,mjs}', '.storybook/**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
  },
);
