import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { z } from "zod";
import { getVideosByUserId } from "@/db/queries/videos";

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({ id: z.string().uuid(), updatedAt: z.date() })
          .nullish(),
        limit: z.number().min(1).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const { id: userId } = ctx.user;
      const data = await getVideosByUserId({ userId, cursor, limit });
      return data;
    }),
});
