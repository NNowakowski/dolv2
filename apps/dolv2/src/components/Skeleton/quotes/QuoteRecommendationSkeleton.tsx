import { Skeleton } from "@/components/ui/skeleton";

export default function QuoteRecommendationSkeleton() {
  return (
    <>
      <Skeleton className="h-10 w-1/2" />

      <div className="space-y-5">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </>
  );
}
