import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

const isRunMode = process.argv.includes('run');

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      headless: isRunMode,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
