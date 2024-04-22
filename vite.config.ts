import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const name = 'better-optional';

export default defineConfig({
  plugins: [
    dts({
      include: ['lib'],
      exclude: ['**/*.test.ts', 'lib/util'],
    }),
  ],
  build: {
    lib: {
      entry: [resolve(__dirname, 'lib/core/index.ts')],
      name,
      fileName: (format) =>
        format === 'es' ? `${name}.js` : `${name}.${format}.js`,
    },
    rollupOptions: {
      output: {
        exports: 'named',
        name: 'Optional',
      },
    },
  },
});
