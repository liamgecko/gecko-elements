import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import geckoLogo from "@/assets/gecko-logo.svg"
import { SidebarNav } from "./sidebar-nav"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLocation, useNavigate } from "react-router-dom"
import { Home } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const isHome = location.pathname === "/"
  const isComponentsRoute = location.pathname.startsWith("/components/")
  const componentSlug = isComponentsRoute
    ? location.pathname.replace("/components/", "")
    : null

  const componentName =
    componentSlug && componentSlug.length > 0
      ? componentSlug
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ")
      : null

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <Sidebar>
            <SidebarHeader className="h-[48px] flex items-center flex-row">
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
              <ScrollArea className="h-full pb-4">
                <SidebarNav />
              </ScrollArea>
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 flex flex-col bg-sidebar overflow-hidden">
            <header className="flex items-center w-full pl-4 pr-6 py-2 gap-4">
              <SidebarTrigger className="-ml-1" />
              {!isHome && (
                <>
                  <Separator orientation="vertical" />
                  <Breadcrumb className="ml-1">
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          aria-label="Home"
                          render={
                            <button
                              type="button"
                              onClick={() => navigate("/")}
                              className="text-left"
                            />
                          }
                        >
                          <Home className="size-3.5" />
                          <span className="sr-only">Home</span>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {isComponentsRoute && (
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbLink
                              render={
                                <button
                                  type="button"
                                  onClick={() => navigate("/components/accordion")}
                                  className="text-left"
                                />
                              }
                            >
                              Components
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          {componentName && (
                            <>
                              <BreadcrumbSeparator />
                              <BreadcrumbItem>
                                <BreadcrumbPage>{componentName}</BreadcrumbPage>
                              </BreadcrumbItem>
                            </>
                          )}
                        </>
                      )}
                    </BreadcrumbList>
                  </Breadcrumb>
                </>
              )}
            </header>
            <div className="flex-1 mx-2 mb-3 p-1 rounded-2xl bg-white overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-5">
                  {children}
                </div>
              </ScrollArea>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
