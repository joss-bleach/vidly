export const dynamic = "force-dynamic";
import { HydrateClient, trpc } from "@/trpc/server";

import { HomeView } from "@/modules/home/ui/views/home-view";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) => {
  const { c } = await searchParams;
  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <HomeView categoryId={c} />
    </HydrateClient>
  );
};

export default Page;
