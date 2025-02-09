import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { StudioUploadModal } from "./studio-upload-modal";

export const StudioNavbar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center border-b bg-white px-2 pr-5 backdrop-blur-xl backdrop-filter">
      <div className="flex w-full items-center gap-4">
        {/* Menu and logo */}
        <div className="flex flex-shrink-0 items-center">
          <SidebarTrigger />
          <Link
            href="/"
            aria-label="Go to home page"
            className="flex flex-row items-center"
          >
            <h1 className="p-4 text-xl font-semibold tracking-tight text-neutral-700">
              <span className="text-rose-500">vid.</span>ly
            </h1>
            <Badge className="-ml-1 cursor-default bg-neutral-500 hover:bg-neutral-500">
              Studio
            </Badge>
          </Link>
        </div>
        {/* Search bar */}
        <div className="mx-auto flex max-w-[720px] flex-1 justify-center"></div>
        {/* User button */}
        <div className="flex flex-shrink-0 items-center gap-4">
          <StudioUploadModal />
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
