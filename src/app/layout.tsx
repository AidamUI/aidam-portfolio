import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageShell } from "@/components/PageShell";
import { SkipLink } from "@/components/SkipLink";
import { SITE } from "@/content/site";
import { archivo, plexMono } from "@/lib/fonts";
import { BOOT_SCRIPT, THEME_CHROME } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.goesBy}`,
    template: `%s — ${SITE.goesBy}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.goesBy}`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  /**
   * Graphite, unconditionally — it is the default ground for every reader.
   * Media-scoped theme-color variants are deliberately not used: the browser
   * picks between those on the OS preference alone and never sees data-theme,
   * so choosing the day platform would leave a graphite bar over a light page.
   * `paintChrome` rewrites this tag instead, from the boot script on load and
   * from the switch on toggle.
   */
  themeColor: THEME_CHROME.graphite,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the boot script sets data-theme on <html>
    // before React hydrates, which is the whole point of running it there.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <noscript>
          <style>{`[data-theme-toggle]{display:none}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <Header />
        <PageShell>{children}</PageShell>
        <Footer />
      </body>
    </html>
  );
}
