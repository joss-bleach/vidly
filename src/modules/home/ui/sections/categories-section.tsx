"use client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";

import { FilterCarousel } from "@/components/filter-carousel";

export const CategoriesSection = ({ categoryId }: { categoryId?: string }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Error...</div>} />
      <CategoriesSectionSuspense categoryId={categoryId} />
    </Suspense>
  );
};

const CategoriesSectionSuspense = ({ categoryId }: { categoryId?: string }) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const data = categories.map(({ name, id }) => ({
    value: id,
    label: name,
  }));

  return <FilterCarousel value={categoryId} data={data} />;
};
