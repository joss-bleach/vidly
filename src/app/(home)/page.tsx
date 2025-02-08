export const dynamic = "force-dynamic";
import { HydrateClient, trpc } from "@/trpc/server";

import { HomeView } from "@/modules/home/ui/views/home-view";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string }>;
}) => {
  const { categoryId } = await searchParams;
  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
};

export default Page;
