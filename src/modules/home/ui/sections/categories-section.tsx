"use client";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";

import { Skeleton } from "@/components/ui/skeleton";
import { FilterCarousel } from "@/components/filter-carousel";

export const CategoriesSection = ({ categoryId }: { categoryId?: string }) => {
  return (
    <Suspense fallback={<CategoriesSectionSkeleton />}>
      <ErrorBoundary fallback={<div>Error...</div>} />
      <CategoriesSectionSuspense categoryId={categoryId} />
    </Suspense>
  );
};

const CategoriesSectionSkeleton = () => {
  return (
    <div className="relative w-full">
      <ul className="flex flex-row items-center gap-3">
        {Array.from({ length: 15 }).map((_, i) => (
          <li key={i}>
            <Skeleton className="h-full w-[100px] rounded-lg px-3 py-1 text-sm font-semibold">
              &nbsp;
            </Skeleton>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CategoriesSectionSuspense = ({ categoryId }: { categoryId?: string }) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const router = useRouter();

  const data = categories.map(({ name, id }) => ({
    value: id,
    label: name,
  }));

  const onCategorySelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("c", value);
    } else {
      url.searchParams.delete("c");
    }
    router.push(url.toString());
  };

  return (
    <FilterCarousel
      onSelect={onCategorySelect}
      value={categoryId}
      data={data}
    />
  );
};
