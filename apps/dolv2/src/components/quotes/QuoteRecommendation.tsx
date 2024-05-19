import Link from "@/components/Link";
import { GetQuoteRecommendation } from "@/data";
import { GetDictionary } from "@/utils";
import type { QuoteType } from "@/types";

export default async function QuoteRecommendation({
  language,
  id,
}: {
  language: string;
  id: string;
}) {
  const dictionary = await GetDictionary(language);

  const quoteRecommendation = await GetQuoteRecommendation({
    language,
    id,
  });

  return (
    <>
      <h2 className="text-2xl font-bold">{`${dictionary.similar} ${dictionary.quotes.title}`}</h2>
      <div>
        {quoteRecommendation.map((quote: QuoteType) => (
          <Link
            href={`/${language}/quotes/${quote.quote_data.id}`}
            key={quote.quote_data.id}
          >
            <div className="flex items-center justify-between p-5 my-5 bg-gray-100 dark:bg-gray-900 rounded-md">
              <div>
                <h3 className="text-lg font-bold">{quote.quote}</h3>
                <p>{quote.quote_data.author}</p>
              </div>
              <div>
                <span className="fi fi-arrow-right"></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
