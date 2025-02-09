"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const StudioUploadModal = () => {
  return (
    <Button
      variant="outline"
      className="font-md rounded-full border-blue-500/20 px-2.5 py-2 text-sm text-blue-600 shadow-none hover:text-blue-500 md:px-4"
    >
      <PlusIcon />
      <span className="hidden md:block">Create</span>
    </Button>
  );
};
