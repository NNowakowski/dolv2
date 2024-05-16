import PageTitle from "@/components/PageTitle";
import Link from "@/components/Link";
import Pagination from "@/components/Pagination";
import { GetDictionary } from "@/utils";
import type { QuoteType } from "@/types";

export default async function QuotesHome({
  quotesList,
  totalPage,
  activePage,
  baseUrl,
  language,
}: {
  quotesList: QuoteType[];
  totalPage: number;
  activePage: number;
  baseUrl: string;
  language: string;
}) {
  const dictionary = await GetDictionary(language);

  return (
    <>
      <PageTitle
        title={dictionary.quotes.title}
        description={dictionary.quotes.description}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-5">
        {quotesList.map((quote) => (
          <Link
            key={quote.quote_data.id}
            href={`${baseUrl}/${quote.quote_data.id}`}
          >
            <div className="flex flex-col h-full p-4 shadow-md rounded-md bg-white dark:bg-gray-800">
              <h2 className="flex-grow text-lg font-semibold">{quote.quote}</h2>
              <p className="flex-grow text-sm text-gray-700 dark:text-gray-300">
                {quote.quote_data.author}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        totalPage={totalPage}
        activePage={activePage}
        baseUrl={baseUrl}
        language={language}
      />
    </>
  );
}
