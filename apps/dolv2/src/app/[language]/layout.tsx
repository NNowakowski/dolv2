import "@/styles/globals.css";
import "flag-icons/css/flag-icons.min.css";

import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import SEO from "@/components/SEO";
import Layout from "@/layouts";
import { SiteMetadata, i18nLanguages } from "@/data";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/app/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: { language: string };
}): Promise<Metadata> {
  const language = params.language;

  const seo = await SEO({
    language: language,
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

// Static languages generation
export const dynamicParams = true;
export function generateStaticParams(): { language: string }[] {
  return [
    {
      language: "en",
    },
  ];
}
// End of static generation

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
  params,
}: {
  children: React.ReactNode;
  params: { language: string };
}): JSX.Element {
  const language = params.language;

  return (
    <html
      lang={language}
      dir={
        i18nLanguages.find((lang) => lang.short_code === language)?.rtl
          ? "rtl"
          : "ltr"
      }
      suppressHydrationWarning
    >
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
          <Layout language={language}>{children}</Layout>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
