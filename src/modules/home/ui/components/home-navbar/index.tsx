import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { SearchInput } from "./search-input";

export const HomeNavbar = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center bg-white px-2 pr-5 backdrop-blur-xl backdrop-filter">
      <div className="flex w-full items-center gap-4">
        {/* Menu and logo */}
        <div className="flex flex-shrink-0 items-center">
          <SidebarTrigger />
          <Link href="/" aria-label="Go to home page">
            <h1 className="p-4 text-xl font-semibold tracking-tight text-neutral-700">
              <span className="text-rose-500">vid.</span>ly
            </h1>
          </Link>
        </div>
        {/* Search bar */}
        <div className="mx-auto flex max-w-[720px] flex-1 justify-center">
          <SearchInput />
        </div>
        {/* User button */}
        <div className="flex-gap-4 flex-shrink-0 items-center">
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
