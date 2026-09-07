import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Vite 라이브러리 모드가 CSS 추출 후 제거해버린 `import './style.css'` 를 되심습니다.
 * 소비자가 스타일을 직접 import 하지 않아도 되게 합니다. UMD 는 import 구문을 못 써서 제외합니다.
 */
const injectCssImport = (): Plugin => ({
  name: 'koast-inject-css-import',
  apply: 'build',
  generateBundle(options, bundle) {
    if (options.format !== 'es') return;

    const entries = Object.values(bundle).filter(
      (chunk) => chunk.type === 'chunk' && chunk.isEntry,
    );
    if (entries.length === 0) {
      this.warn('진입 청크를 찾지 못해 CSS import 를 심지 못했습니다.');
      return;
    }

    entries.forEach((chunk) => {
      if (chunk.type !== 'chunk') return;
      chunk.code = `import './style.css';\n${ chunk.code }`;
    });
  },
});

export default defineConfig(({ command }) => ({
  publicDir: "public",
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      exclude: ['**/*.stories.{ts,tsx}', '**/*.test.{ts,tsx}', '**/tests/**'],
      rollupTypes: true,
      compilerOptions: {
        declarationMap: false
      }
    }),
    injectCssImport(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  root: command === 'serve' ? './dev' : undefined,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KoastUI',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`
    },
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      external: [
        'react', 
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: false,
    emptyOutDir: true,
    cssCodeSplit: false,
  },
  server: {
    host: true,
  }
}));
