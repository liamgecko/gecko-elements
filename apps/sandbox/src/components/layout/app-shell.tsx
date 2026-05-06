import { SidebarInset, SidebarProvider } from "@gecko/ui/components/sidebar"
import { ScrollArea } from "@gecko/ui/components/scroll-area"

import { SidebarNav } from "./sidebar-nav"
import { TopBarHeader } from "./top-bar-header"

export function AppShell() {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-dvh w-full overflow-hidden">
        <TopBarHeader />
        <div className="flex h-dvh pt-14 overflow-hidden">
          <SidebarNav />
          <SidebarInset className="flex-1 bg-background overflow-hidden">
            <ScrollArea className="h-full">
              <div className="min-h-full" />
            </ScrollArea>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

