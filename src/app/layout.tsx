import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageShell } from "@/components/PageShell";
import { SkipLink } from "@/components/SkipLink";
import { SITE } from "@/content/site";
import { archivo, plexMono } from "@/lib/fonts";
import { BOOT_SCRIPT } from "@/lib/theme";
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
  // Both grounds, so the browser chrome matches whichever platform is showing.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1E2733" },
    { media: "(prefers-color-scheme: light)", color: "#EDF0F3" },
  ],
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
