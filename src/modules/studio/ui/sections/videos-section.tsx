"use client";
import { Suspense } from "react";
import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";
import { format } from "date-fns";

import { snakeCastToTitle } from "@/lib/utils";

import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";

export const VideosSection = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error...</p>} />
      <VideosSectionSuspense />
    </Suspense>
  );
};

const VideosSectionSuspense = () => {
  const [data, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    { limit: DEFAULT_LIMIT },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[510px] pl-6">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="pr-6 text-right">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.pages.flatMap((page) =>
              page.items.map((video) => (
                <Link
                  href={`/studios/videos/${video.id}`}
                  key={video.id}
                  legacyBehavior
                >
                  <TableRow className="cursor-pointer">
                    <TableCell className="w-[510px] pl-6">
                      <div className="flex items-center gap-4">
                        <div className="relative aspect-video w-36 shrink-0">
                          <VideoThumbnail
                            imageUrl={video.thumbnailUrl}
                            previewUrl={video.previewUrl}
                            title={video.title}
                            duration={video.duration || 0}
                          />
                        </div>
                        <div className="flex flex-col gap-y-1 overflow-hidden">
                          <span className="line-clamp-1 text-sm">
                            {video.title}
                          </span>
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            {video.description ?? "No description"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Public</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {snakeCastToTitle(video.muxStatus || "error")}
                      </div>
                    </TableCell>
                    <TableCell className="truncate text-sm">
                      {format(new Date(video.createdAt), "d MMM yyyy")}
                    </TableCell>
                    <TableCell className="text-right">100</TableCell>
                    <TableCell className="text-right">100</TableCell>
                    <TableCell className="pr-6 text-right">100</TableCell>
                  </TableRow>
                </Link>
              )),
            )}
          </TableBody>
        </Table>
      </div>
      <InfiniteScroll
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
};
