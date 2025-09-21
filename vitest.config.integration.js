import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setupTests.js',
    include: ['tests/integration/**/*.test.{js,jsx}'],
    coverage: {
      reporter: ['text', 'json-summary'],
      reportsDirectory: 'coverage/integration',
      include: ['src/**/*.{js,jsx}'],
    },
  },
});
