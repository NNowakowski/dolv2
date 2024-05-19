import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import MerchSkeleton from "@/components/Skeleton/Merch";
import BrowseInOtherLanguages from "@/components/i18n/BrowseInOtherLanguages";
import BrowseInOtherLanguagesSkeleton from "@/components/Skeleton/i18n/BrowseInOtherLanguagesSkeleton";
import CommentSkeleton from "@/components/Skeleton/CommentSkeleton";
import QuoteBookRecommendationSkeleton from "@/components/Skeleton/quotes/QuoteBookRecommendationSkeleton";
import QuoteRecommendationSkeleton from "@/components/Skeleton/quotes/QuoteRecommendationSkeleton";
import QuoteRecommendation from "@/components/quotes/QuoteRecommendation";
import Merch from "@/components/Merch";
import QuoteBookRecommendation from "@/components/quotes/QuoteBookRecommendation";
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
              - {quoteData.quote_data.author}
            </p>
          </blockquote>

          <Suspense fallback={<BrowseInOtherLanguagesSkeleton />}>
            <BrowseInOtherLanguages
              active_language={language}
              suffix_url={`/quotes/${id}`}
            />
          </Suspense>

          <Suspense fallback={<CommentSkeleton />}>
            <Comment />
          </Suspense>

          <div className="py-5">
            <Suspense fallback={<QuoteRecommendationSkeleton />}>
              <QuoteRecommendation language={language} id={id} />
            </Suspense>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 space-y-5">
          {/* TODO: Tags Component */}

          <Suspense fallback={<MerchSkeleton />}>
            <Merch language={language} />
          </Suspense>

          <Suspense fallback={<QuoteBookRecommendationSkeleton />}>
            <QuoteBookRecommendation language={language} id={id} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
