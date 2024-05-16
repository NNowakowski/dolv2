import type { Metadata } from "next";
import SEO from "@/components/SEO";
import QuoteDetail from "@/components/quotes/QuoteDetail";
import { GetQuotesList, GetQuoteData } from "@/data";
import { GetDictionary } from "@/utils";
import type { QuoteType } from "@/types";

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: { language: string; id: string };
}): Promise<Metadata> {
  const language = params.language;

  const id = params.id;

  const dictionary = await GetDictionary(language);

  const quoteData = await GetQuoteData({
    language: language,
    id: id,
  });

  return SEO({
    title: `${quoteData.quote} | ${dictionary.quotes.title}`,
    description: `${quoteData.quote}${quoteData.quote_data.author ? ` - ${quoteData.quote_data.author}` : ""}`,
    keywords: quoteData.quote_data.tags
      .map((tag) => tag.tag)
      .concat([
        "quotes",
        "motivation",
        "inspiration",
        "life",
        "love",
        "success",
        "happiness",
      ]),
    language: language,
  });
}
// End of metadata generation

// Static id generation
export const dynamicParams = true;
export async function generateStaticParams(): Promise<
  {
    language: string;
    id: string;
  }[]
> {
  const quotesList = await GetQuotesList({
    language: "en",
    page: 1,
  });

  const pathsList = quotesList.slice(0, 1).map((quote) => ({
    language: "en",
    id: quote.quote_data.id.toString(),
  }));

  return pathsList;
}
// End of static generation

// Page generation
export default async function QuoteDetailPage({
  params,
}: {
  params: { language: string; id: string };
}) {
  const { language, id } = params;

  const quoteData: QuoteType = await GetQuoteData({
    language: language,
    id: id,
  });

  return <QuoteDetail quoteData={quoteData} id={id} language={language} />;
}
// End of page generation
