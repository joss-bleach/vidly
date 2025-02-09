"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { trpc } from "@/trpc/client";

import { Button } from "@/components/ui/button";

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
          <span className="hidden md:block">Create</span>
        </span>
      )}
    </Button>
  );
};
