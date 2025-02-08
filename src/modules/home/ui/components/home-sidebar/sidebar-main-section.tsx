"use client";
import { useAuth, useClerk } from "@clerk/nextjs";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const sidebarLinks = [
  {
    label: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    label: "Subscriptions",
    url: "/feed/subscriptions",
    icon: PlaySquareIcon,
    auth: true,
  },
  {
    label: "Trending",
    url: "/feed/trending",
    icon: FlameIcon,
  },
];

export const SidebarMainSection = () => {
  const { isSignedIn } = useAuth();
  const clerk = useClerk();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {sidebarLinks.map((link) => {
            return (
              <SidebarMenuItem key={link.label}>
                <SidebarMenuButton
                  tooltip={link.label}
                  asChild
                  isActive={false}
                  onClick={(e) => {
                    if (!isSignedIn && link.auth) {
                      e.preventDefault();
                      return clerk.openSignIn();
                    }
                  }}
                >
                  <Link href={link.url} className="flex items-center gap-4">
                    <link.icon />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
