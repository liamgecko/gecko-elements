import { SidebarInset, SidebarProvider } from "@gecko/ui/components/sidebar"
import { ScrollArea } from "@gecko/ui/components/scroll-area"

import { AppSidebar } from "./AppSidebar"
import { AppHeader } from "./AppHeader"

export function AppShell() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider defaultOpen className="min-h-dvh w-full flex flex-col">
        <AppHeader />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <SidebarInset className="bg-background">
            <ScrollArea className="h-full">
              <div className="min-h-full" />
            </ScrollArea>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

