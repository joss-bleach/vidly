import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { getCategories } from "@/db/queries/categories";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await getCategories();
    return data;
  }),
});
