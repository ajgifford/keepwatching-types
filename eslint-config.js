import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

const ignores = [
  'node_modules/**',
  'dist/**',
  '.prettierrc.js',
  'eslint.config.mjs',
];

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  { ignores },
];