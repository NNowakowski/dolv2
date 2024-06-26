import Link from "@/components/Link";
import Image from "@/components/Image";
import { GetTldrBookRecommendation } from "@/data";
import { GetDictionary } from "@/utils";
import type { AmazonBookType } from "@/types";

export default async function TldrBookRecommendation({
  language,
  slug,
}: {
  language: string;
  slug: string;
}) {
  const dictionary = await GetDictionary(language);

  const tldrRecommendations = await GetTldrBookRecommendation({
    language,
    slug,
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg shadow-lg space-y-2">
      <p className="text-sm text-center font-semibold text-gray-500 dark:text-gray-400">
        {dictionary.affiliate_link}
      </p>

      <div className="grid grid-cols-2 gap-2">
        {tldrRecommendations
          .slice(0, 4)
          .map((tldrRecommendation: AmazonBookType) => (
            <div key={tldrRecommendation.asin}>
              <Link href={tldrRecommendation.link}>
                <Image
                  src={tldrRecommendation.image}
                  alt={tldrRecommendation.title}
                  width={500}
                  height={500}
                  className="rounded-md shadow-lg h-full"
                  unoptimized
                  title={tldrRecommendation.title}
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
