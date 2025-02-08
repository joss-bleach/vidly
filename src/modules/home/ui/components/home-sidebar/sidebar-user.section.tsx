"use client";
import { useAuth, useClerk } from "@clerk/nextjs";
import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const sidebarLinks = [
  {
    label: "History",
    url: "/playlists/history",
    icon: HistoryIcon,
    auth: true,
  },
  {
    label: "Liked videos",
    url: "/playlists/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    label: "All playlists",
    url: "/playlists",
    icon: ListVideoIcon,
    auth: true,
  },
];

export const SidebarUserSection = () => {
  const { isSignedIn } = useAuth();
  const clerk = useClerk();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>You</SidebarGroupLabel>
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
