import { SidebarInset, SidebarProvider, SidebarTrigger } from "@gecko/ui/components/sidebar"
import { ScrollArea } from "@gecko/ui/components/scroll-area"

import { AppSidebar } from "./AppSidebar"
import { AppHeader } from "./AppHeader"

export function AppShell() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider defaultOpen className="h-dvh w-full flex flex-col">
        <AppHeader />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <AppSidebar />
          <SidebarInset className="bg-background min-h-0 flex-1">
            <ScrollArea className="h-full">
              <div className="min-h-full p-4">

              </div>
            </ScrollArea>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

