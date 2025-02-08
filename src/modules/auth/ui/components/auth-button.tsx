"use client";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { UserCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const AuthButton = () => {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="font-md rounded-full border-blue-500/20 px-2.5 py-2 text-sm text-blue-600 shadow-none hover:text-blue-500 md:px-4"
          >
            <UserCircleIcon />
            <span className="hidden md:block">Sign in</span>
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};
