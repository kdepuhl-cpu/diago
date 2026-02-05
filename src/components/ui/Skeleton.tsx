"use client";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    />
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="space-y-4">
      {/* Image */}
      <Skeleton className="aspect-video w-full rounded-lg" />
      {/* Title */}
      <Skeleton className="h-6 w-3/4" />
      {/* Teaser */}
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      {/* Meta */}
      <div className="flex gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function HeroSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      {/* Hero */}
      <div className="space-y-4">
        <Skeleton className="aspect-video w-full rounded-lg" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      {/* Sidebar */}
      <div className="space-y-4 lg:border-l lg:border-gray-200 lg:pl-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0">
            <Skeleton className="w-[150px] aspect-[3/2] rounded flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MostPopularSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0">
          <Skeleton className="w-8 h-8 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
