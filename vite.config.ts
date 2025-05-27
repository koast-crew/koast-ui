import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ command }) => ({
  publicDir: "public",
  plugins: [
    react(),
    vanillaExtractPlugin(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      exclude: ['**/*.stories.{ts,tsx}', '**/*.test.{ts,tsx}', '**/tests/**'],
      rollupTypes: true,
      compilerOptions: {
        declarationMap: false
      }
    }),
  ],
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
