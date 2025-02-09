"use client";
import { Suspense } from "react";
import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";

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
                      {video.title}
                    </TableCell>
                    <TableCell>Public</TableCell>
                    <TableCell>Published</TableCell>
                    <TableCell>Date</TableCell>
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
