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

// Static page generation
export const dynamicParams = true;
export async function generateStaticParams(): Promise<
  {
    language: string;
    page: string;
  }[]
> {
  const quotesCount = await GetQuotesCount({
    language: "en",
  });

  const pageCount = Math.ceil(quotesCount / QUOTES_CHUNK_SIZE);

  const pathsList = [];

  for (let i = 1; i < pageCount; i++) {
    pathsList.push({
      language: "en",
      page: (i + 1).toString(),
    });
    break;
  }

  return pathsList;
}
// End of static generation

// Page generation
export default async function QuotesPagePage({
  params,
}: {
  params: { language: string; page: string };
}): Promise<JSX.Element> {
  const language = params.language;
  const page = parseInt(params.page);

  const quotesListData = GetQuotesList({
    language: language,
    page: page,
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
      activePage={page}
      baseUrl={`/${language}/quotes`}
      language={language}
    />
  );
}
// End of page generation
