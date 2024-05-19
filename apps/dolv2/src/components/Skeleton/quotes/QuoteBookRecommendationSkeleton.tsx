import { Skeleton } from "@/components/ui/skeleton";

export default function QuoteBookRecommendationSkeleton() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-2 rounded-lg shadow-lg">
      <Skeleton className="mx-auto h-5 w-32" />

      <div className="flex justify-center space-x-2 overflow-x-auto scrollbar-hide mt-2">
        <Skeleton className="h-32 w-20" />
        <Skeleton className="h-32 w-20" />
        <Skeleton className="h-32 w-20" />
        <Skeleton className="h-32 w-20" />
      </div>
    </div>
  );
}
