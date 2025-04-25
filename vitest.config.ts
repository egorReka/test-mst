import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Указываем, что тесты находятся в корневой директории
    include: ['./**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // Исключаем ненужные директории
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
