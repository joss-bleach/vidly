import { createVideo } from "@/db/queries/videos";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;
    const [video] = await createVideo({ userId, title: "Untitled" });
    return {
      video: video,
    };
  }),
});
