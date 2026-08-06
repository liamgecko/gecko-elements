import { useLocation } from "react-router-dom"

import { SidebarInset, SidebarProvider } from "@gecko/ui/components/sidebar"
import { ScrollArea } from "@gecko/ui/components/scroll-area"
import { Toaster } from "@gecko/ui/components/toast"

import { AppSidebar } from "./AppSidebar"
import { AppHeader } from "./AppHeader"
import { PageDocumentTitle } from "./PageDocumentTitle"
import { FavouritesProvider } from "../../state/favourites"

function isFormBuilderPath(pathname: string) {
  if (pathname === "/forms/forms/new") return true
  return /^\/forms\/forms\/[^/]+/.test(pathname)
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const disableShellScroll = isFormBuilderPath(pathname)

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <FavouritesProvider>
        <PageDocumentTitle />
        <SidebarProvider defaultOpen className="h-dvh w-full flex flex-col">
          <AppHeader />
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <AppSidebar />
            <SidebarInset className="min-h-0 flex-1">
              {disableShellScroll ? (
                <div className="h-full min-h-0 overflow-hidden">{children}</div>
              ) : (
                <ScrollArea className="h-full">
                  <div className="h-full min-h-0">{children}</div>
                </ScrollArea>
              )}
            </SidebarInset>
          </div>
        </SidebarProvider>
        <Toaster />
      </FavouritesProvider>
    </div>
  )
}
