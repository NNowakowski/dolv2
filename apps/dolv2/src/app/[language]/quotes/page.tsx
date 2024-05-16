import type { Metadata } from "next";
import SEO from "@/components/SEO";
import QuotesHome from "@/components/quotes/QuotesHome";
import { GetQuotesCount, GetQuotesList } from "@/data";
import { GetDictionary } from "@/utils";
import { QUOTES_CHUNK_SIZE } from "@/app/[language]/quotes/default";

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: { language: string };
}): Promise<Metadata> {
  const language = params.language;

  const dictionary = await GetDictionary(language);

  return SEO({
    title: dictionary.quotes.title,
    description: dictionary.quotes.description,
    keywords: [
      "quotes",
      "motivation",
      "inspiration",
      "life",
      "love",
      "success",
      "happiness",
    ],
    language: language,
  });
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

// Page generation
export default async function QuotesHomePage({
  params,
}: {
  params: { language: string };
}): Promise<JSX.Element> {
  const language = params.language;

  const quotesListData = GetQuotesList({
    language: language,
    page: 1,
  });

  const quotesCountData = GetQuotesCount({
    language: language,
  });

  const [quotesList, quotesCount] = await Promise.all([
    quotesListData,
    quotesCountData,
  ]);

  return (
    <QuotesHome
      quotesList={quotesList}
      totalPage={Math.ceil(quotesCount / QUOTES_CHUNK_SIZE)}
      activePage={1}
      baseUrl={`/${language}/quotes`}
      language={language}
    />
  );
}
// End of page generation
