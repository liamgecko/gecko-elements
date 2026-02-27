import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import geckoLogo from "@/assets/gecko-logo.svg"
import { PageSectionsProvider } from "./page-sections-context"
import { SidebarNav } from "./sidebar-nav"

type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="border-b border-sidebar-border h-[48px] flex items-center flex-row">
            <div className="flex items-center px-2">
              <img
                src={geckoLogo}
                alt="Gecko Elements"
                className="shrink-0"
                width={100}
              />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <nav aria-label="Components navigation">
              <SidebarNav />
            </nav>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex-1 px-6 py-8">
            <PageSectionsProvider>{children}</PageSectionsProvider>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
