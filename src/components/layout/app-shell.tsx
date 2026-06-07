import { ReactNode } from "react";
import { OSProvider } from "@/features/os/window-manager";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <OSProvider>
      {children}
    </OSProvider>
  );
}
