import { Skeleton } from "@/components/ui/skeleton";
import BreadcrumbSkeleton from "@/components/Skeleton/BreadcrumbSkeleton";
import BrowseInOtherLanguagesSkeleton from "@/components/Skeleton/i18n/BrowseInOtherLanguagesSkeleton";
import MerchSkeleton from "@/components/Skeleton/Merch";

export default function QuoteDetailSkeleton() {
  return (
    <>
      <div className="grid grid-cols-12 gap-x-5 md:gap-x-10 gap-y-5 my-5">
        <div className="col-span-12">
          <BreadcrumbSkeleton />
        </div>

        <div className="col-span-12 md:col-span-8 space-y-5">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-1/2" />

          <BrowseInOtherLanguagesSkeleton />
        </div>

        <div className="col-span-12 md:col-span-4 space-y-5">
          <MerchSkeleton />
        </div>
      </div>
    </>
  );
}
