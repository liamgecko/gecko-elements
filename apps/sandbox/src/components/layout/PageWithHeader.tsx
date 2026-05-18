import * as React from "react"

import { Header } from "@gecko/ui/components/header"
import { useLocation, useNavigate } from "react-router-dom"
import { Home } from "lucide-react"
import { Container } from "@gecko/ui/components/container"
import { useFavourites } from "../../state/favourites"

function titleCaseFromSlug(slug: string) {
  const spaced = slug.replace(/-/g, " ")
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase())
}

function labelForSegment(segment: string) {
  if (segment === "home" || segment === "overview") return "Home"
  if (segment === "data-and-reporting" || segment === "dashboards") {
    return "Data and reporting"
  }
  if (segment === "ai-and-automation") return "AI and automation"
  if (segment === "mcp-servers") return "MCP servers"
  if (segment === "voip-numbers") return "VoIP numbers"
  if (segment === "sms-geo-permissions") return "SMS geo permissions"
  return titleCaseFromSlug(segment)
}

function labelForPath(pathname: string) {
  const segments = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean)
  const last = segments.at(-1)
  if (!last) return "Home"

  // Favourites should show the current page title (leaf), not "Parent / Child".
  return labelForSegment(last)
}

export function PageWithHeader({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isFavourited, setFavourite } = useFavourites()

  const segments = React.useMemo(
    () => pathname.split("?")[0].split("#")[0].split("/").filter(Boolean),
    [pathname]
  )

  const breadcrumbs = React.useMemo(() => {
    const items: {
      label: React.ReactNode
      current?: boolean
      href?: string
      onSelect?: () => void
    }[] = [{ label: "Home", href: "/home" }]

    let runningPath = ""
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i] ?? ""
      runningPath += `/${segment}`
      const isLast = i === segments.length - 1
      if (isLast) {
        items.push({ label: labelForSegment(segment), current: true })
      } else {
        items.push({
          label: labelForSegment(segment),
          href: runningPath,
          onSelect: () => navigate(runningPath),
        })
      }
    }

    items[0] = {
      label: (
        <>
          <Home className="size-3.5" />
          <span className="sr-only">Home</span>
        </>
      ),
      href: "/home",
      onSelect: () => navigate("/home"),
    }

    return { items } as const
  }, [navigate, segments])

  return (
    <div className="flex flex-col">
      <Header
        breadcrumbs={breadcrumbs}
        favouriteAction={{
          pressed: isFavourited(pathname),
          onPressedChange: (next) => {
            setFavourite({ path: pathname, label: labelForPath(pathname) }, next)
          },
        }}
      />
      <Container>{children}</Container>
    </div>
  )
}

