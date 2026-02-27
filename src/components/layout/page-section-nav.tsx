import { cn } from "@/lib/utils"
import { usePageSections } from "./page-sections-context"

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

export function PageSectionNav({ className }: PageSectionNavProps) {
  const ctx = usePageSections()
  const sections = ctx?.sections ?? []

  if (sections.length === 0) return null

  return (
    <aside className="sticky top-8 w-52 shrink-0 self-start">
      <nav
        aria-label="Page sections"
        className={cn("text-sm text-muted-foreground", className)}
      >
        <span className="text-xs font-medium text-muted-foreground mb-4 block">On this page</span>
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="hover:text-foreground"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(section.id)
                }}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

