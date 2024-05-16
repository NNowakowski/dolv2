import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import MerchSkeleton from "@/components/Skeleton/Merch";
import BrowseInOtherLanguages from "@/components/i18n/BrowseInOtherLanguages";
import BrowseInOtherLanguagesSkeleton from "@/components/Skeleton/i18n/BrowseInOtherLanguagesSkeleton";
import Merch from "@/components/Merch";
import Comment from "@/components/Comment";
import { GetDictionary } from "@/utils";
import type { QuoteType } from "@/types";

export default async function QuoteDetail({
  quoteData,
  id,
  language,
}: {
  quoteData: QuoteType;
  id: string;
  language: string;
}) {
  const dictionary = await GetDictionary(language);

  return (
    <>
      <div className="grid grid-cols-12 gap-x-5 md:gap-x-10 gap-y-5 my-5">
        <div className="col-span-12">
          <Breadcrumb
            links={[
              { text: `${dictionary.navbar.home}`, href: `/${language}` },
              {
                text: `${dictionary.quotes.title}`,
                href: `/${language}/quotes`,
              },
              {
                text: quoteData.quote_data.id.toString(),
                href: `/${language}/quotes/${id}`,
              },
            ]}
          />
        </div>

        <div className="col-span-12 md:col-span-8 space-y-5">
          <blockquote className="border-l-2 pl-6">
            <p className="text-xl font-semibold tracking-tight">
              {quoteData.quote}
            </p>
            <br />
            <p className="text-muted-foreground">
              {dictionary.author}: {quoteData.quote_data.author}
            </p>
          </blockquote>

          <div className="py-5">
            <h2 className="text-2xl font-bold">
              {dictionary.browse_in_other_languages}
            </h2>

            <Suspense fallback={<BrowseInOtherLanguagesSkeleton />}>
              <BrowseInOtherLanguages
                active_language={language}
                suffix_url={`/quotes/${id}`}
              />
            </Suspense>
          </div>

          <Comment />
        </div>

        <div className="col-span-12 md:col-span-4 space-y-5">
          {/* TODO: Tags Component */}

          <Suspense fallback={<MerchSkeleton />}>
            <Merch language={language} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
