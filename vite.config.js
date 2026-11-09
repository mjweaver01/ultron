import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const root = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  root,
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: `${root}/index.html`,
        chromecast: `${root}/chromecast.html`,
      },
    },
  },
});
