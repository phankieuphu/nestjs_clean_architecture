import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    globals: true,
    include: ['src/**/*.spec.ts', 'test/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      // Measure the layers that hold logic; wiring/bootstrap code is covered by e2e/manual tests
      include: [
        'src/services/**/*.ts',
        'src/utils/**/*.ts',
        'src/guards/**/*.ts',
        'src/pipes/**/*.ts',
      ],
      exclude: ['src/**/index.ts', 'src/**/*.spec.ts'],
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
