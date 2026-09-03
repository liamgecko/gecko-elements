import { useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@gecko/ui/components/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import geckoLogo from "@/assets/gecko-logo.svg"
import { SidebarNav } from "./sidebar-nav"
import { ScrollArea } from "@gecko/ui/components/scroll-area"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "@/components/theme-provider"
import { Home, Moon, Sun } from "lucide-react"
import { Separator } from "@gecko/ui/components/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@gecko/ui/components/breadcrumb"
import { PageSectionNav } from "./page-section-nav"
import { Button } from "@gecko/ui/components/button"
import { structurePages } from "@/pages/gallery-data"

const APP_TITLE = "Gecko Elements"

function slugToPageTitle(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function structurePageTitle(slug: string): string {
  const path = `/structure/${slug}`
  return (
    structurePages.find((page) => page.path === path)?.name ??
    slugToPageTitle(slug)
  )
}

function structureDocumentTitle(slug: string): string {
  return structurePageTitle(slug)
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation()
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const viewport = document.querySelector<HTMLElement>(
      '[data-app-main="true"] [data-slot="scroll-area-viewport"]'
    )
    if (viewport) {
      viewport.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }

    const { pathname } = location
    if (pathname === "/") {
      document.title = `Home | ${APP_TITLE}`
    } else if (pathname === "/guides") {
      document.title = `Guides | ${APP_TITLE}`
    } else if (pathname.startsWith("/guides/")) {
      const slug = pathname.replace("/guides/", "").replace(/\/$/, "")
      document.title = slug
        ? `${slugToPageTitle(slug)} | ${APP_TITLE}`
        : APP_TITLE
    } else if (pathname === "/core") {
      document.title = `Core | ${APP_TITLE}`
    } else if (pathname === "/components") {
      document.title = `Components | ${APP_TITLE}`
    } else if (pathname.startsWith("/components/")) {
      const slug = pathname.replace("/components/", "").replace(/\/$/, "")
      document.title = slug
        ? `${slugToPageTitle(slug)} | ${APP_TITLE}`
        : APP_TITLE
    } else if (pathname.startsWith("/core/")) {
      const slug = pathname.replace("/core/", "").replace(/\/$/, "")
      document.title = slug
        ? `${slugToPageTitle(slug)} | ${APP_TITLE}`
        : APP_TITLE
    } else if (pathname === "/structure") {
      document.title = `Structure | ${APP_TITLE}`
    } else if (pathname.startsWith("/structure/")) {
      const slug = pathname.replace("/structure/", "").replace(/\/$/, "")
      document.title = slug
        ? `${structureDocumentTitle(slug)} | ${APP_TITLE}`
        : APP_TITLE
    } else {
      document.title = APP_TITLE
    }
  }, [location.pathname])

  const pathname = location.pathname
  const isHome = pathname === "/"
  const isComponentsRoute =
    pathname === "/components" || pathname.startsWith("/components/")
  const isGuidesRoute =
    pathname === "/guides" || pathname.startsWith("/guides/")
  const isCoreRoute = pathname === "/core" || pathname.startsWith("/core/")
  const isStructureRoute =
    pathname === "/structure" || pathname.startsWith("/structure/")
  const componentSlug = isComponentsRoute
    ? pathname.replace(/^\/components\/?/, "").replace(/\/$/, "")
    : null
  const guidesSlug = isGuidesRoute
    ? pathname.replace(/^\/guides\/?/, "").replace(/\/$/, "")
    : null
  const coreSlug = isCoreRoute
    ? pathname.replace(/^\/core\/?/, "").replace(/\/$/, "")
    : null
  const structureSlug = isStructureRoute
    ? pathname.replace(/^\/structure\/?/, "").replace(/\/$/, "")
    : null

  const guidesPageName =
    guidesSlug && guidesSlug.length > 0 ? slugToPageTitle(guidesSlug) : null
  const componentName =
    componentSlug && componentSlug.length > 0
      ? slugToPageTitle(componentSlug)
      : null
  const corePageName =
    coreSlug && coreSlug.length > 0 ? slugToPageTitle(coreSlug) : null
  const structurePageName =
    structureSlug && structureSlug.length > 0
      ? structurePageTitle(structureSlug)
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
                  className="shrink-0 dark:invert"
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
            <header className="flex w-full items-center justify-between gap-4 py-2 pl-4 pr-6">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <SidebarTrigger className="-ml-1 shrink-0" />
                {!isHome && (
                  <>
                    <Separator orientation="vertical" className="shrink-0" />
                    <Breadcrumb className="min-w-0">
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          aria-label="Home"
                          render={<Link to="/" className="text-left" />}
                        >
                          <Home className="size-3.5" />
                          <span className="sr-only">Home</span>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {isGuidesRoute && (
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            {pathname === "/guides" ? (
                              <BreadcrumbPage>Guides</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink
                                render={
                                  <Link to="/guides" className="text-left" />
                                }
                              >
                                Guides
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {guidesPageName ? (
                            <>
                              <BreadcrumbSeparator />
                              <BreadcrumbItem>
                                <BreadcrumbPage>
                                  {guidesPageName}
                                </BreadcrumbPage>
                              </BreadcrumbItem>
                            </>
                          ) : null}
                        </>
                      )}
                      {isCoreRoute && (
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            {pathname === "/core" ? (
                              <BreadcrumbPage>Core</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink
                                render={
                                  <Link to="/core" className="text-left" />
                                }
                              >
                                Core
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {corePageName ? (
                            <>
                              <BreadcrumbSeparator />
                              <BreadcrumbItem>
                                <BreadcrumbPage>{corePageName}</BreadcrumbPage>
                              </BreadcrumbItem>
                            </>
                          ) : null}
                        </>
                      )}
                      {isComponentsRoute && (
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            {pathname === "/components" ? (
                              <BreadcrumbPage>Components</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink
                                render={
                                  <Link
                                    to="/components"
                                    className="text-left"
                                  />
                                }
                              >
                                Components
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {componentName ? (
                            <>
                              <BreadcrumbSeparator />
                              <BreadcrumbItem>
                                <BreadcrumbPage>{componentName}</BreadcrumbPage>
                              </BreadcrumbItem>
                            </>
                          ) : null}
                        </>
                      )}
                      {isStructureRoute && (
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            {pathname === "/structure" ? (
                              <BreadcrumbPage>Structure</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink
                                render={
                                  <Link
                                    to="/structure"
                                    className="text-left"
                                  />
                                }
                              >
                                Structure
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {structurePageName ? (
                            <>
                              <BreadcrumbSeparator />
                              <BreadcrumbItem>
                                <BreadcrumbPage>
                                  {structurePageName}
                                </BreadcrumbPage>
                              </BreadcrumbItem>
                            </>
                          ) : null}
                        </>
                      )}
                    </BreadcrumbList>
                  </Breadcrumb>
                  </>
                )}
              </div>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="shrink-0 transition-none"
                      onClick={() =>
                        setTheme(resolvedTheme === "dark" ? "light" : "dark")
                      }
                      aria-label={
                        resolvedTheme === "dark"
                          ? "Switch to light mode"
                          : "Switch to dark mode"
                      }
                    >
                      {resolvedTheme === "dark" ? (
                        <Sun className="size-4" aria-hidden />
                      ) : (
                        <Moon className="size-4" aria-hidden />
                      )}
                    </Button>
                  }
                />
                <TooltipContent side="bottom" align="end">
                  <p>
                    {resolvedTheme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </header>
            <div className="flex-1 mx-2 mb-3 p-1 rounded-2xl bg-background overflow-hidden">
              <ScrollArea className="h-full" data-app-main="true">
                <div className="p-8 md:px-16 py-8">
                  <div className="flex gap-8">
                    <div
                      className={[
                        "min-w-0 flex-1 border-r-0 pr-0",
                        !isHome && "lg:border-r lg:border-border lg:pr-12",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {children}
                    </div>
                    <PageSectionNav />
                  </div>
                </div>
              </ScrollArea>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
