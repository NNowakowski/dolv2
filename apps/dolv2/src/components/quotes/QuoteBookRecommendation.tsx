import Link from "@/components/Link";
import Image from "@/components/Image";
import { GetQuoteBookRecommendation } from "@/data";
import { GetDictionary } from "@/utils";
import type { AmazonBookType } from "@/types";

export default async function QuoteBookRecommendation({
  language,
  id,
}: {
  language: string;
  id: string;
}) {
  const dictionary = await GetDictionary(language);

  const quoteRecommendations = await GetQuoteBookRecommendation({
    language,
    id,
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg shadow-lg space-y-2">
      <p className="text-sm text-center font-semibold text-gray-500 dark:text-gray-400">
        {dictionary.affiliate_link}
      </p>

      <div className="grid grid-cols-2 gap-2">
        {quoteRecommendations
          .slice(0, 4)
          .map((quoteRecommendation: AmazonBookType) => (
            <div key={quoteRecommendation.asin}>
              <Link href={quoteRecommendation.link}>
                <Image
                  src={quoteRecommendation.image}
                  alt={quoteRecommendation.title}
                  width={500}
                  height={500}
                  className="rounded-md shadow-lg h-full"
                  unoptimized
                  title={quoteRecommendation.title}
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
