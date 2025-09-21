import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setupTests.js',
    include: ['tests/unit/**/*.test.{js,jsx}'],
    coverage: {
      reporter: ['text', 'json-summary'],
      reportsDirectory: 'coverage/unit',
      include: ['src/**/*.{js,jsx}'],
    },
  },
});
