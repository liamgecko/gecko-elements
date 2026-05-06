import { SidebarInset, SidebarProvider } from "@gecko/ui/components/sidebar"

import { SidebarNav } from "./sidebar-nav"
import { TopBarHeader } from "./top-bar-header"

export function AppShell() {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-dvh w-full">
        <TopBarHeader />
        <div className="flex min-h-[calc(100dvh-3.5rem)]">
          <SidebarNav />
          <SidebarInset className="bg-background">
            <div className="flex-1" />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

