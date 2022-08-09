import type { PlaywrightTestConfig } from '@playwright/experimental-ct-react';
import { devices } from '@playwright/experimental-ct-react';
import path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './src',
  testMatch: '**/*.spec.tsx',
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './__snapshots__',
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,

    /* Vite config */
    ctViteConfig: {
      // base: '../src',
      resolve: {
        // alias: {
        //   utils: path.resolve('src/utils/'),
        //   api: path.resolve('src/api/'),
        // },
        alias: [
          { find: /^~/, replacement: '' },
          { find: 'utils', replacement: path.resolve('src/utils/') },
          { find: 'api', replacement: path.resolve('src/api/') },
          // utils: path.resolve('src/utils/'),
          // api: path.resolve('src/api/') },
        ]
      },
      // server: {
      //   proxy: {
      //     // '/organisation': {
      //     //   target: 'wss://abc-website.com:4221/',
      //     //   changeOrigin: true,
      //     //   ws: true,
      //     //   rewrite: (path) => path.replace('^/socket', ''),
      //     // },
      //     // '/streaming/': {
      //     //   target: 'https://abc-website.com/',
      //     //   changeOrigin: true,
      //     // },
      //     '**/organisation': {
      //       target: 'https://localhost:44331/organisation',
      //       changeOrigin: true,
      //       secure: false,
      //       ws: true
      //     },
      //   }
      // }
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
  ],
};

export default config;
