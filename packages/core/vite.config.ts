/// <reference types="vitest" />

import path from 'node:path';

import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dtsPlugin({
      outputDir: 'dist',
      copyDtsFiles: false,
      insertTypesEntry: true
    })
  ],
  build: {
    minify: 'terser',
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es'],
      name: '@uptab/core',
      fileName: (format) => `core.${format}.js`
    }
  },
  esbuild: {
    format: 'esm'
  },
  resolve: {
    alias: {
      '@uptab/core': path.resolve(__dirname, 'src')
    }
  }
});
