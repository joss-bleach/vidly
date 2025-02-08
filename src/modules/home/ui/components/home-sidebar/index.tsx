import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarMainSection } from "./sidebar-main-section";
import { SidebarUserSection } from "./sidebar-user.section";

export const HomeSidebar = () => {
  return (
    <Sidebar className="z-40 border-none pt-16">
      <SidebarContent className="bg-background">
        <SidebarMainSection />
        <Separator />
        <SidebarUserSection />
      </SidebarContent>
    </Sidebar>
  );
};
