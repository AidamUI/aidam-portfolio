import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * The acceptance criteria from prd.md, checked against a real production build
 * rather than asserted in a report.
 */

const ROUTES = [
  "/",
  "/work",
  "/academic",
  "/projects",
  "/projects/terra",
  "/projects/skillpath",
  "/documentation",
  "/documentation/lomba",
  "/guestbook",
];

test.describe("every route", () => {
  for (const route of ROUTES) {
    test(`${route} renders, is titled, and has one h1`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await expect(page).toHaveTitle(/\S/);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);

      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveAttribute("content", /\S/);
    });

    test(`${route} is its own canonical`, async ({ page }) => {
      await page.goto(route);
      const href = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      // Inheriting the layout's canonical made /work and /projects declare
      // themselves duplicates of the home page, which asks Google not to index
      // them separately. Each route must name itself.
      expect(href, `${route} canonical`).toBe(
        route === "/"
          ? "https://aidam-portfolio.vercel.app"
          : `https://aidam-portfolio.vercel.app${route}`,
      );
    });

    test(`${route} has no accessibility violations`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      // Report what failed rather than just a count, so a regression names
      // itself instead of sending someone hunting.
      const summary = results.violations.map(
        (violation) =>
          `${violation.id} (${violation.impact}): ${violation.nodes.length} node(s) — ${violation.help}`,
      );
      expect(summary, summary.join("\n")).toEqual([]);
    });
  }
});

test.describe("the site shell", () => {
  test("skip link is the first stop and moves focus to main", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const skip = page.getByRole("link", { name: /skip to content/i });
    await expect(skip).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });

  test("the current page is marked, not just coloured", async ({ page }) => {
    await page.goto("/work");

    // aria-current is what a screen reader gets; bold weight and the
    // underline are what everyone else gets. Colour is never the only signal.
    const current = page.locator('nav [aria-current="page"]');
    await expect(current.first()).toHaveAttribute("aria-current", "page");

    // Below sm the bar collapses into a menu, so the marked link lives there.
    // Open it if that is the layout in play, then require it to be visible.
    const menuButton = page.getByRole("button", { name: /open menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
    }
    await expect(current.filter({ visible: true }).first()).toBeVisible();

    // And the underline is present, so the state is not carried by fill alone.
    const marked = current.filter({ visible: true }).first();
    await expect(marked.locator("span.underline")).toHaveCount(1);
  });

  test("the theme switch flips light and dark", async ({ page }) => {
    await page.goto("/");
    const root = page.locator("html");

    // Light is the default for everyone; no OS preference changes that.
    await expect(root).not.toHaveAttribute("data-theme", "dark");

    await page.getByRole("button", { name: /switch to dark mode/i }).click();
    await expect(root).toHaveAttribute("data-theme", "dark");

    await page.getByRole("button", { name: /switch to light mode/i }).click();
    await expect(root).toHaveAttribute("data-theme", "light");
  });

  test("the choice survives a reload", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /switch to dark mode/i }).click();
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});

test.describe("nothing shifts and nothing overflows", () => {
  test("no horizontal scroll at any width", async ({ page }) => {
    for (const route of [
      "/",
      "/work",
      "/academic",
      "/projects",
      "/guestbook",
    ]) {
      await page.goto(route);
      const overflows = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1,
      );
      expect(overflows, `${route} scrolls sideways`).toBe(false);
    }
  });

  test("cumulative layout shift stays under the 0.02 budget", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const cls = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let total = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const shift = entry as PerformanceEntry & {
                value: number;
                hadRecentInput: boolean;
              };
              if (!shift.hadRecentInput) total += shift.value;
            }
          }).observe({ type: "layout-shift", buffered: true });
          setTimeout(() => resolve(total), 1000);
        }),
    );

    expect(cls).toBeLessThan(0.02);
  });
});

test.describe("the confidentiality rule", () => {
  const WITHHELD = [
    "Terra-gemastik",
    "TERRA-FE",
    "TERRA-BE",
    "mantau-prototype",
    "YOLO",
    "FastAPI",
    "38 REST",
    "9 modules",
  ];

  for (const slug of ["terra", "mantau"]) {
    test(`/projects/${slug} withholds every implementation detail`, async ({
      page,
    }) => {
      await page.goto(`/projects/${slug}`);

      // What a withheld project DOES say.
      await expect(
        page.getByRole("heading", { name: "Problem" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "What it does" }),
      ).toBeVisible();
      await expect(page.getByText("My part")).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Details withheld" }),
      ).toBeVisible();

      // Asserted on the shape of the page rather than on section titles, so
      // renaming a heading cannot quietly turn this check off: a withheld
      // project must carry no screenshots and no outbound links at all.
      await expect(page.locator("article img")).toHaveCount(0);
      await expect(page.locator('article a[href^="http"]')).toHaveCount(0);

      for (const heading of [
        "Build",
        "Built with",
        "Screens",
        "Outcome",
        "Links",
      ]) {
        await expect(
          page.getByRole("heading", { name: heading, exact: true }),
        ).toHaveCount(0);
      }

      const html = await page.content();
      for (const term of WITHHELD) {
        expect(html, `${term} leaked onto /projects/${slug}`).not.toContain(
          term,
        );
      }
    });
  }

  test("an open project still gets the full template", async ({ page }) => {
    await page.goto("/projects/skillpath");
    for (const heading of [
      "Build",
      "Built with",
      "Screens",
      "Outcome",
      "Links",
    ]) {
      await expect(
        page.getByRole("heading", { name: heading, exact: true }),
      ).toBeVisible();
    }
    // And it actually renders its images rather than declaring a slot.
    const images = page.locator("article img");
    expect(await images.count()).toBeGreaterThan(0);
    await expect(images.first()).toHaveAttribute("alt", /\S/);
  });

  test("the index says a withheld project is withheld", async ({ page }) => {
    await page.goto("/projects");
    const terra = page.locator("article", { hasText: "TERRA" }).first();
    await expect(terra.getByText("Details withheld")).toBeVisible();
  });
});

test.describe("privacy", () => {
  test("no forbidden personal data anywhere", async ({ page }) => {
    const forbidden = ["2406404781", "816-217", "Widia Resti", "January 26"];
    for (const route of ROUTES) {
      await page.goto(route);
      const html = await page.content();
      for (const term of forbidden) {
        expect(html, `${term} appears on ${route}`).not.toContain(term);
      }
    }
  });

  test("no grades on /academic", async ({ page }) => {
    await page.goto("/academic");
    const text = (await page.locator("main").innerText()).replace(
      /3\.87|4\.00/g,
      "",
    );
    // A letter grade next to a course would look like " A " or " B+ ".
    expect(text).not.toMatch(/\s[A-D][+-]?\s*$/m);
  });
});

test.describe("the guestbook", () => {
  test("is a form with no way to identify the sender", async ({ page }) => {
    await page.goto("/guestbook");

    await expect(page.locator("textarea#body")).toBeVisible();
    await expect(page.locator("textarea#body")).toHaveAttribute(
      "maxlength",
      "500",
    );
    // No name, email or author field exists to be filled in.
    await expect(
      page.locator(
        'input[name="name"], input[name="email"], input[name="author"]',
      ),
    ).toHaveCount(0);
    // The honeypot is present but out of the tab order and hidden from AT.
    await expect(page.locator('input[name="website"]')).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  test("the approval queue is closed without credentials", async ({
    request,
  }) => {
    expect((await request.get("/guestbook/admin")).status()).toBe(401);
    expect(
      (
        await request.patch(
          "/api/messages/11111111-2222-3333-4444-555555555555",
        )
      ).status(),
    ).toBe(401);
  });

  test("the public read exposes no sender field", async ({ request }) => {
    const response = await request.get("/api/messages");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).not.toContain("ip_hash");
    expect(body).not.toContain("ipHash");
  });
});

test.describe("discovery", () => {
  test("sitemap lists the real routes", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const path of [
      "/work",
      "/academic",
      "/projects/terra",
      "/documentation/lomba",
    ]) {
      expect(xml).toContain(path);
    }
    // The queue is never listed, however.
    expect(xml).not.toContain("/guestbook/admin");
  });

  test("robots points at the sitemap and closes the admin", async ({
    request,
  }) => {
    const txt = await (await request.get("/robots.txt")).text();
    expect(txt).toContain("Sitemap:");
    expect(txt).toContain("/guestbook/admin");
  });

  test("the home page carries a Person schema", async ({ page }) => {
    await page.goto("/");
    const raw = await page
      .locator('script[type="application/ld+json"]')
      .innerText();
    const schema = JSON.parse(raw);

    expect(schema["@type"]).toBe("Person");
    expect(schema.name).toBe("Muhammad Kaila Aidam Riyan");
    expect(schema.sameAs).toEqual(
      expect.arrayContaining([
        "https://linkedin.com/in/aidamkaila",
        "https://github.com/AidamUI",
        "https://github.com/AidamGit",
      ]),
    );
    // The withheld competition repos must never appear as an identity link.
    expect(JSON.stringify(schema)).not.toContain("Terra-gemastik");
  });

  test("share cards render", async ({ request }) => {
    for (const path of ["/opengraph-image", "/work/opengraph-image"]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
    }
  });
});
