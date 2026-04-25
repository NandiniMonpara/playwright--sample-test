// @ts-check
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 0 : 0,
  workers: isCI ? 3 : 3,
  

  timeout: 30 * 1000,
  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['blob', { outputDir: 'blob-report' }], // Blob reporter for merging
    ['json', { outputFile: './playwright-report/report.json' }],
    
   /*['@testdino/playwright', {
      // token:'trx_production_2e3a3e3e9271a55990a27f1b0ebbd5fd6ef2a67acacbed09f8cf6116ff69754f',
      // token:'trx_development_0d89aea81f7609c8dca85eebc56c6d05adcbe594fbe147e6c4be14e04fb06929',
      token:'trx_staging_819111a7f7d873ecce896a507ae42ff0d96978083163aa42d8ccca1a4f766a3b',
      //serverUrl: 'http://localhost:3001',
      serverUrl: 'https://stg-api.testdino.com',
       //serverUrl: 'https://api.testdino.com',
      //serverUrl: 'https://testdino-backend-uat.purplegrass-beecf167.eastus.azurecontainerapps.io',
      debug: true,
       uploadArtifacts: false,
      
   }], */
  ], 

  use: {
    baseURL: 'https://storedemo.testdino.com/',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      grep: /@chromium/, // only run tests tagged @chromium
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      grep: /@firefox/, // only run tests tagged @firefox
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grep: /@webkit/, // only run tests tagged @webkit
    },
    {
      name: 'android',
      use: { ...devices['Pixel 5'] },
      grep: /@android/, // only run tests tagged @android
    },
    {
      name: 'ios',
      use: { ...devices['iPhone 12'] },
      grep: /@ios/, // only run tests tagged @ios
    },
  ],
});
