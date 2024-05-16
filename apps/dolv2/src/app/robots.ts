import { MetadataRoute } from "next";
import { SiteMetadata } from "@/data";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      `${SiteMetadata.site_url}/sitemap.xml`,
      `${SiteMetadata.site_url}/en/tldr/sitemap/sitemap.xml`,
      `${SiteMetadata.site_url}/en/quotes/sitemap/sitemap.xml`,
    ],
    host: SiteMetadata.site_url,
  };
}
