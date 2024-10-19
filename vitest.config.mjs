import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    globals: true,
    coverage: {
      provider: 'v8',
      include: [
      ],
      reporter: ['json', 'text', 'text-summary'],
      thresholds: {
        lines: 70,
        statements: 70,
        branches: 70,
        functions: 70,
      },
    },
    server: {
      deps: {
        fallbackCJS: true,
      },
    },
  },
  plugins: [swc.vite(), tsconfigPaths()],
});
