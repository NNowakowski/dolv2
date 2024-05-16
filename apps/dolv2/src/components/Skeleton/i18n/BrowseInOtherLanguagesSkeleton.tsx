import { Skeleton } from "@/components/ui/skeleton";

export default function BrowseInOtherLanguagesSkeleton() {
  return (
    <>
      <Skeleton className="h-10 w-1/2" />

      <div className="grid grid-cols-12">
        {Array.from({ length: 32 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-10 m-2 rounded shadow-lg" />
        ))}
      </div>
    </>
  );
}
