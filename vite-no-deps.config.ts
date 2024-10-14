import { resolve } from 'path';
import { defineConfig } from 'vite';

const name = 'better-optional';

export default defineConfig({
  build: {
    lib: {
      entry: [resolve(__dirname, 'lib/better-optional.ts')],
      name,
      fileName: (format) =>
        format === 'es' ? `${name}.nodeps.js` : `${name}.nodeps.${format}.js`,
    },
    emptyOutDir: false,
    rollupOptions: {
      output: {
        exports: 'named',
        name,
      },
    },
  },
});
