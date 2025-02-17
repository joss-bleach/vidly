import { mux } from "@/lib/mux";
import { createVideo } from "@/db/queries/videos";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { env } from "@/config/env";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.user;

    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        passthrough: userId,
        playback_policy: ["public"],
      },
      cors_origin: env.NODE_ENV === "development" ? "*" : env.BASE_URL,
    });

    const [video] = await createVideo({
      userId,
      title: "Untitled",
      muxUploadId: upload.id,
      muxStatus: "waiting",
    });
    return {
      video: video,
      url: upload.url,
    };
  }),
});
