import * as React from "react"
import { useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import type { Section } from "@/config/component-sections"
import { componentSections } from "@/config/component-sections"

type PageSectionNavProps = {
  className?: string
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", `#${id}`)
  }
}

function getComponentKey(pathname: string): string | null {
  const components = pathname.match(/^\/components\/(.+)$/)
  if (components) return components[1]
  const core = pathname.match(/^\/core\/(.+)$/)
  return core ? core[1] : null
}

function SectionLink({
  section,
  currentId,
  onSelect,
  isChild,
}: {
  section: Section
  currentId?: string
  onSelect: (id: string) => void
  isChild?: boolean
}) {
  const hasChildren = section.children && section.children.length > 0
  const isActive = currentId === section.id

  return (
    <li
      className={cn(
        "relative transition-colors",
        isActive && !isChild && "text-foreground"
      )}
      data-active={isActive ? "true" : undefined}
    >
      <a
        href={`#${section.id}`}
        className={cn(
          "block py-0.5 text-sm text-muted-foreground hover:text-foreground",
          "relative before:absolute before:-left-2.5 before:top-0 before:bottom-0 before:w-px before:bg-primary before:opacity-0 hover:before:opacity-100 hover:before:bg-gray-300 data-[active=true]:before:opacity-100 data-[active=true]:hover:before:bg-primary",
          "data-[active=true]:text-foreground"
        )}
        data-active={isActive ? "true" : undefined}
        onClick={(e) => {
          e.preventDefault()
          scrollToSection(section.id)
          onSelect(section.id)
        }}
      >
        {section.label}
      </a>
      {hasChildren && (
        <ul
          className={cn(
            "mt-1 space-y-1",
            "relative ml-1 pl-2.5 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-gray-100"
          )}
        >
          {section.children!.map((child) => (
            <SectionLink
              key={child.id}
              section={child}
              currentId={currentId}
              onSelect={onSelect}
              isChild
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function PageSectionNav({ className }: PageSectionNavProps) {
  const location = useLocation()
  const key = getComponentKey(location.pathname)
  const sections = key ? componentSections[key] : undefined

  const [activeId, setActiveId] = React.useState<string | undefined>(() => {
    if (!sections || sections.length === 0) return undefined
    if (typeof window !== "undefined" && window.location.hash) {
      return window.location.hash.replace("#", "") || sections[0].id
    }
    return sections[0].id
  })

  React.useEffect(() => {
    if (!sections || sections.length === 0) {
      setActiveId(undefined)
      return
    }

    if (typeof window !== "undefined" && window.location.hash) {
      const fromHash = window.location.hash.replace("#", "")
      setActiveId(fromHash || sections[0].id)
    } else {
      setActiveId(sections[0].id)
    }
  }, [sections])

  if (!sections || sections.length === 0) return null

  return (
    <aside
      className={cn(
        "hidden lg:block sticky top-8 w-52 shrink-0 self-start",
        className
      )}
    >
      <div
        className={cn(
          "min-h-0 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain pl-2.5",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        <nav aria-label="Page sections" className="text-sm text-muted-foreground">
          <span className="text-xs font-medium text-muted-foreground mb-4 block">
            On this page
          </span>
          <ul className="space-y-1">
            {sections.map((section) => (
              <SectionLink
                key={section.id}
                section={section}
                currentId={activeId}
                onSelect={setActiveId}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
