import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.js' }),
  target: 'node18',
  outDir: 'dist',
  clean: true,
  dts: true,
  sourcemap: false,
  splitting: false,
  bundle: true,
  external: [/^node:.*/],
});
