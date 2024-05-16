import type { MetadataRoute } from "next";
import { SiteMetadata, i18nLanguages } from "@/data";

const langaugeList = i18nLanguages.map((lang) => lang.short_code);

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["github-emoji"].map((route) => ({
    url: `${SiteMetadata.site_url}/en/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: 1,
  }));

  const i18nroutes = ["", "tldr", "quotes"].map((route) => ({
    url: `${SiteMetadata.site_url}/en/${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: 1,
    alternates: {
      languages: langaugeList.reduce((acc: { [key: string]: string }, lang) => {
        if (lang !== "en") {
          acc[lang] = `${SiteMetadata.site_url}/${lang}/${route}`;
        }
        return acc;
      }, {}),
    },
  }));

  return [...routes, ...i18nroutes];
}
