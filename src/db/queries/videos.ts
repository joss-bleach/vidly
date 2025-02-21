import { eq, and, or, lt, desc } from "drizzle-orm";
import { db } from "..";
import { videos } from "../schema";

interface GetVideosByUserIdProps {
  userId: string;
  cursor?: {
    id: string;
    updatedAt: Date;
  } | null;
  limit: number;
}
export const getVideosByUserId = async ({
  userId,
  cursor,
  limit,
}: GetVideosByUserIdProps) => {
  const data = await db
    .select()
    .from(videos)
    .where(
      and(
        eq(videos.userId, userId),
        cursor
          ? or(
              lt(videos.updatedAt, cursor.updatedAt),
              and(
                eq(videos.updatedAt, cursor.updatedAt),
                lt(videos.id, cursor.id),
              ),
            )
          : undefined,
      ),
    )
    .orderBy(desc(videos.updatedAt), desc(videos.id))
    .limit(limit + 1);

  const moreAvailableToLoad = data.length > limit;
  const items = moreAvailableToLoad ? data.slice(0, -1) : data;
  const lastItem = items[items.length - 1];
  const nextCursor = moreAvailableToLoad
    ? { id: lastItem.id, updatedAt: lastItem.updatedAt }
    : null;
  return {
    items,
    nextCursor,
  };
};

interface CreateVideoProps {
  userId: string;
  title: string;
  muxStatus: string;
  muxUploadId: string;
}
export const createVideo = async ({
  userId,
  title,
  muxStatus,
  muxUploadId,
}: CreateVideoProps) => {
  return await db
    .insert(videos)
    .values({
      userId,
      title,
      muxStatus: muxStatus,
      muxUploadId: muxUploadId,
    })
    .returning();
};

interface UpdateVideoProps {
  muxAssetId?: string;
  muxStatus: string;
  uploadId: string;
  muxPlaybackId?: string;
  thumbnailUrl?: string;
  previewUrl?: string;
  duration?: number;
  visibility?: "public" | "private";
}

export const updateVideo = async ({
  muxAssetId,
  muxStatus,
  uploadId,
  muxPlaybackId,
  thumbnailUrl,
  previewUrl,
  duration,
  visibility,
}: UpdateVideoProps) => {
  const updateData: any = { muxStatus };

  if (muxAssetId) updateData.muxAssetId = muxAssetId;
  if (muxPlaybackId) updateData.muxPlaybackId = muxPlaybackId;
  if (thumbnailUrl) updateData.thumbnailUrl = thumbnailUrl;
  if (previewUrl) updateData.previewUrl = previewUrl;
  if (duration !== undefined) updateData.duration = duration;
  if (visibility) updateData.visibility = visibility;

  return await db
    .update(videos)
    .set(updateData)
    .where(eq(videos.muxUploadId, uploadId));
};

export const deleteVideo = async ({ uploadId }: { uploadId: string }) => {
  return await db.delete(videos).where(eq(videos.muxUploadId, uploadId));
};
