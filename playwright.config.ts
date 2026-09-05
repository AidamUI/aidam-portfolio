import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke and accessibility tests against a real production build.
 *
 * `pnpm build && pnpm start` rather than `next dev`, because dev mode differs
 * in exactly the places these tests care about: no minification, different
 * hydration timing, and no static prerendering. Testing the dev server would
 * be testing something the public never sees.
 *
 * The mobile project is the one that matters most — prd.md's audience opens
 * this on a phone from LinkedIn — and 320px is the stated hard floor.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : [["list"]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3210",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "narrow-320",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 320, height: 640 },
      },
    },
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "pnpm start --port 3210",
        url: "http://localhost:3210",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
