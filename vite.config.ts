import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: resolve(__dirname, './demo'),
  build: {
    /**
     * This is the directory where the built files will be placed
     * that we upload to GitHub Pages.
     */
    outDir: '../ghpages/demo',
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
