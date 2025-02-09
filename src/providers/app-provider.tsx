import { Toaster } from "@/components/ui/sonner";
import { TRPCProvider } from "@/trpc/client";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCProvider>
      <Toaster />
      {children}
    </TRPCProvider>
  );
};
