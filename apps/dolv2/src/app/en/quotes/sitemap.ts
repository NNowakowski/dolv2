import { MetadataRoute } from "next";
import {
  SiteMetadata,
  GetQuotesCount,
  GetQuotesList,
  i18nLanguages,
} from "@/data";
import { QUOTES_CHUNK_SIZE } from "@/app/[language]/quotes/default";

const langaugeList = i18nLanguages.map((lang) => lang.short_code);

export async function generateSitemaps() {
  const quotesCount = await GetQuotesCount({
    language: "en",
  });
  const quotesPages = Math.ceil(quotesCount / QUOTES_CHUNK_SIZE);

  return Array.from({ length: quotesPages }, (_, i) => i).map((page) => ({
    id: page,
  }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const page = id;

  const quotesList = await GetQuotesList({
    language: "en",
    page: page + 1,
  });

  const routes = quotesList.map((quote) => ({
    url: `${SiteMetadata.site_url}/en/quotes/${quote.quote_data.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: 0.9,
    alternates: {
      languages: langaugeList.reduce((acc: { [key: string]: string }, lang) => {
        if (lang !== "en") {
          acc[lang] =
            `${SiteMetadata.site_url}/${lang}/quotes/${quote.quote_data.id}`;
        }
        return acc;
      }, {}),
    },
  }));

  return [...routes];
}
