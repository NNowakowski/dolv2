import { Skeleton } from "@/components/ui/skeleton";
import BreadcrumbSkeleton from "@/components/Skeleton/BreadcrumbSkeleton";
import PageTitleSkeleton from "@/components/Skeleton/PageTitleSkeleton";
import BrowseInOtherLanguagesSkeleton from "@/components/Skeleton/i18n/BrowseInOtherLanguagesSkeleton";
import TldrRecommendationSkeleton from "@/components/Skeleton/tldr/TldrRecommendationSkeleton";
import TldrBookRecommendationSkeleton from "@/components/Skeleton/tldr/TldrBookRecommendationSkeleton";
import TldrImageSkeleton from "@/components/Skeleton/tldr/TldrImageSkeleton";
import MerchSkeleton from "@/components/Skeleton/Merch";

export default function TldrDetailSkeleton() {
  return (
    <>
      <PageTitleSkeleton />

      <div className="grid grid-cols-12 gap-x-5 md:gap-x-10 gap-y-5 my-5">
        <div className="col-span-12">
          <BreadcrumbSkeleton />
        </div>

        <div className="col-span-12 md:col-span-8 space-y-5">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />

          <BrowseInOtherLanguagesSkeleton />

          <TldrRecommendationSkeleton />
        </div>

        <div className="col-span-12 md:col-span-4 space-y-5">
          <TldrImageSkeleton />

          <MerchSkeleton />

          <TldrBookRecommendationSkeleton />
        </div>
      </div>
    </>
  );
}
