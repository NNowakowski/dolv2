import { MetadataRoute } from "next";
import { SiteMetadata, GetTldrCount, GetTldrList, i18nLanguages } from "@/data";
import { TLDR_CHUNK_SIZE } from "@/app/[language]/tldr/default";

const langaugeList = i18nLanguages.map((lang) => lang.short_code);

export async function generateSitemaps() {
  const tldrCount = await GetTldrCount({
    language: "en",
  });
  const tldrPages = Math.ceil(tldrCount / TLDR_CHUNK_SIZE);

  return Array.from(
    {
      length:
        (process.env.BUILD_MODE ?? "DEV") === "PRODUCTION" ? tldrPages : 1,
    },
    (_, i) => i,
  ).map((page) => ({
    id: page,
  }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const page = id;

  const tldrList = await GetTldrList({
    language: "en",
    page: page + 1,
  });

  const routes = tldrList.map((tldr) => ({
    url: `${SiteMetadata.site_url}/en/tldr/${tldr.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: 0.9,
    alternates: {
      languages: langaugeList.reduce((acc: { [key: string]: string }, lang) => {
        if (lang !== "en") {
          acc[lang] = `${SiteMetadata.site_url}/${lang}/tldr/${tldr.slug}`;
        }
        return acc;
      }, {}),
    },
  }));

  return [...routes];
}
