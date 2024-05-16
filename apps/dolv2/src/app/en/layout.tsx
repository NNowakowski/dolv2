import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import SEO from "@/components/SEO";
import Layout from "@/layouts";
import { SiteMetadata } from "@/data";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Metadata generation
export async function generateMetadata(): Promise<Metadata> {
  const seo = await SEO({
    language: "en",
  });

  return {
    metadataBase: new URL(SiteMetadata.site_url),

    ...seo,

    manifest: "/manifest.json",

    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: SiteMetadata.title,
    },

    formatDetection: {
      telephone: false,
    },

    icons: {
      icon: [
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },

    other: {
      charSet: "utf-8",
      lang: "en",
    },

    archives: [SiteMetadata.github_url],
    category: "technology",

    robots: {
      index: true,
      follow: true,
    },
  };
}
// End of metadata generation

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout language="en">{children}</Layout>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
