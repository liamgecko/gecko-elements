import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@geckolabs/elements/components/sidebar";
import { ScrollArea } from "@geckolabs/elements/components/scroll-area";
import { Toaster } from "@geckolabs/elements/components/toast";

import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { PageDocumentTitle } from "./PageDocumentTitle";
import { FavouritesProvider } from "../../state/favourites";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <FavouritesProvider>
        <PageDocumentTitle />
        <SidebarProvider defaultOpen className="h-dvh w-full flex flex-col">
          <AppHeader />
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <AppSidebar />
            <SidebarInset className="min-h-0 flex-1">
              <ScrollArea className="h-full">
                <div className="h-full min-h-0">{children}</div>
              </ScrollArea>
            </SidebarInset>
          </div>
        </SidebarProvider>
        <Toaster />
      </FavouritesProvider>
    </div>
  );
}
