import { Skeleton } from "@/components/ui/skeleton";
import PageTitleSkeleton from "@/components/Skeleton/PageTitleSkeleton";
import PaginationSkeleton from "@/components/Skeleton/PaginationSkeleton";

export default function QuotesHomeSkeleton() {
  return (
    <>
      <PageTitleSkeleton />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-5">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="w-full h-20" />
        ))}
      </div>

      <PaginationSkeleton />
    </>
  );
}
