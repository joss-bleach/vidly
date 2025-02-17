"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { trpc } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { StudioUploader } from "./studio-uploader";

export const StudioUploadModal = () => {
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      toast.success("Video created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <ResponsiveDialog
        title="Upload a video"
        description="Upload a video to your studio"
        open={!!create.data}
        onOpenChange={() => create.reset()}
      >
        {create.data?.url ? (
          <StudioUploader endpoint={create.data.url} onSuccess={() => {}} />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </ResponsiveDialog>
      <Button
        variant="outline"
        onClick={() => create.mutate()}
        disabled={create.isPending}
        className="font-md w-[100px] rounded-full border-blue-500/20 px-2.5 py-2 text-sm text-blue-600 shadow-none hover:text-blue-500 md:px-4"
      >
        {create.isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <span className="flex flex-row items-center justify-center gap-2">
            <PlusIcon />
            Create
          </span>
        )}
      </Button>
    </>
  );
};
