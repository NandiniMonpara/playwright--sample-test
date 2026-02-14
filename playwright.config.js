// @ts-check
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 5 : 5,

  timeout: 60 * 1000,

  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['blob', { outputDir: 'blob-report' }],
    ['json', { outputFile: './playwright-report/report.json' }],
    ['list'],
    ['@testdino/playwright', {
      token: trx_staging_1e8e558ca9e71215ab43a47eb767d08d3aac91bc46b4dd086e8d744f8a127dce,
      debug: true,
      serverUrl: 'https://staging-api.testdino.com',
    }],
  ],

  use: {
    baseURL: 'https://storedemo.testdino.com/',
    headless: true,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      grep: /@chromium/,
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      grep: /@firefox/,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grep: /@webkit/,
    },
    {
      name: 'android',
      use: { ...devices['Pixel 5'] },
      grep: /@android/,
    },
    {
      name: 'ios',
      use: { ...devices['iPhone 12'] },
      grep: /@ios/,
    }
  ],
});
