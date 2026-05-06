import { SidebarInset, SidebarProvider } from "@gecko/ui/components/sidebar"

import { SidebarNav } from "./sidebar-nav"
import { TopBarHeader } from "./top-bar-header"

export function AppShell() {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-dvh w-full flex flex-col">
        <TopBarHeader />
        <div className="flex flex-1 overflow-hidden">
          <SidebarNav />
          <SidebarInset className="flex-1 overflow-auto bg-background">
            <div className="min-h-full" />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

