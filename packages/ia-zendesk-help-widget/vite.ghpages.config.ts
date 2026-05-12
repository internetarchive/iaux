import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  root: resolve(__dirname, './demo'),
  build: {
    target: 'es2022',
    outDir: '../ghpages',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'demo/index.html'),
      },
      output: {
        entryFileNames: 'app-root.js',
      },
    },
  },
});
