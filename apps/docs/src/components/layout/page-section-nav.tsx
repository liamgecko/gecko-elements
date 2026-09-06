import * as React from "react"
import { useLocation } from "react-router-dom"
import { cn } from "@gecko/ui/lib/utils"
import type { Section } from "@/config/component-sections"
import { componentSections } from "@/config/component-sections"

type PageSectionNavProps = {
  className?: string
}

function flattenSections(sections: Section[]): Section[] {
  return sections.flatMap((section) => [
    section,
    ...flattenSections(section.children ?? []),
  ])
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    const viewport = el.closest<HTMLElement>(
      '[data-app-main="true"] [data-slot="scroll-area-viewport"]'
    )

    if (viewport) {
      const viewportRect = viewport.getBoundingClientRect()
      const targetRect = el.getBoundingClientRect()

      viewport.scrollTo({
        top: viewport.scrollTop + targetRect.top - viewportRect.top,
        behavior: "smooth",
      })
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    window.history.replaceState(null, "", `#${id}`)
  }
}

function getComponentKey(pathname: string): string | null {
  const components = pathname.match(/^\/components\/(.+)$/)
  if (components) return components[1]
  const core = pathname.match(/^\/core\/(.+)$/)
  if (core) return core[1]
  const structure = pathname.match(/^\/structure\/(.+)$/)
  if (structure) return `structure-${structure[1]}`
  const guides = pathname.match(/^\/guides\/(.+)$/)
  return guides ? `guides-${guides[1]}` : null
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
          "relative data-[active=true]:text-foreground transition-colors",
          !isActive &&
            "before:absolute before:-left-2.5 before:inset-y-0 before:w-px before:bg-gray-300 before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-100 dark:before:bg-gray-700"
        )}
        data-active={isActive ? "true" : undefined}
        data-section-id={section.id}
        aria-current={isActive ? "location" : undefined}
        onClick={(e) => {
          e.preventDefault()
          onSelect(section.id)
          scrollToSection(section.id)
        }}
      >
        {section.label}
      </a>
      {hasChildren && (
        <ul
          className={cn(
            "mt-1 space-y-1",
            "relative ml-1 pl-2.5 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-gray-100 dark:before:bg-gray-800"
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
  const sectionListRef = React.useRef<HTMLDivElement>(null)
  const activeIndicatorRef = React.useRef<HTMLSpanElement>(null)
  const hasPositionedIndicatorRef = React.useRef(false)
  const clickScrollTargetRef = React.useRef<string | null>(null)
  const clickScrollReleaseTimerRef = React.useRef<number | null>(null)
  const skipIndicatorAnimationRef = React.useRef(false)

  const [activeId, setActiveId] = React.useState<string | undefined>(() => {
    if (!sections || sections.length === 0) return undefined
    if (typeof window !== "undefined" && window.location.hash) {
      return window.location.hash.replace("#", "") || sections[0].id
    }
    return sections[0].id
  })

  React.useEffect(() => {
    if (!sections || sections.length === 0) return

    const viewport = document.querySelector<HTMLElement>(
      '[data-app-main="true"] [data-slot="scroll-area-viewport"]'
    )
    const anchors = flattenSections(sections)
      .map(({ id }) => document.getElementById(id))
      .filter((anchor): anchor is HTMLElement => anchor !== null)

    if (!viewport || anchors.length === 0) return

    let animationFrame: number | null = null

    const updateActiveSection = () => {
      animationFrame = null

      const viewportRect = viewport.getBoundingClientRect()
      const activationLine = viewportRect.top + 24
      const isAtBottom =
        viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 1
      let nextActive = anchors[0]

      if (clickScrollTargetRef.current) {
        const target = anchors.find(
          (anchor) => anchor.id === clickScrollTargetRef.current
        )
        const targetReached =
          target &&
          (Math.abs(target.getBoundingClientRect().top - viewportRect.top) <=
            1 ||
            (isAtBottom && target === anchors[anchors.length - 1]))

        if (!targetReached) return

        clickScrollTargetRef.current = null
        if (clickScrollReleaseTimerRef.current !== null) {
          window.clearTimeout(clickScrollReleaseTimerRef.current)
          clickScrollReleaseTimerRef.current = null
        }
      }

      if (isAtBottom) {
        nextActive = anchors[anchors.length - 1]
      } else {
        for (const anchor of anchors) {
          if (anchor.getBoundingClientRect().top > activationLine) break
          nextActive = anchor
        }
      }

      setActiveId((currentId) =>
        currentId === nextActive.id ? currentId : nextActive.id
      )
    }

    const scheduleUpdate = () => {
      if (animationFrame !== null) return
      animationFrame = window.requestAnimationFrame(updateActiveSection)
    }

    const handleScroll = () => {
      if (clickScrollTargetRef.current) {
        if (clickScrollReleaseTimerRef.current !== null) {
          window.clearTimeout(clickScrollReleaseTimerRef.current)
        }
        clickScrollReleaseTimerRef.current = window.setTimeout(() => {
          clickScrollTargetRef.current = null
          clickScrollReleaseTimerRef.current = null
          scheduleUpdate()
        }, 120)
      }

      scheduleUpdate()
    }

    viewport.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(viewport)
    anchors.forEach((anchor) => resizeObserver.observe(anchor))

    scheduleUpdate()

    return () => {
      viewport.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", scheduleUpdate)
      resizeObserver.disconnect()
      if (clickScrollReleaseTimerRef.current !== null) {
        window.clearTimeout(clickScrollReleaseTimerRef.current)
        clickScrollReleaseTimerRef.current = null
      }
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [sections])

  React.useLayoutEffect(() => {
    const sectionList = sectionListRef.current
    const activeIndicator = activeIndicatorRef.current

    if (!sectionList || !activeIndicator || !activeId) return

    let animationFrame: number | null = null

    const updateIndicatorPosition = () => {
      animationFrame = null

      const activeLink = Array.from(
        sectionList.querySelectorAll<HTMLElement>("[data-section-id]")
      ).find((link) => link.dataset.sectionId === activeId)

      if (!activeLink) {
        activeIndicator.style.opacity = "0"
        hasPositionedIndicatorRef.current = false
        return
      }

      const listRect = sectionList.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      const x = linkRect.left - listRect.left - 10
      const y = linkRect.top - listRect.top

      const shouldSnap =
        !hasPositionedIndicatorRef.current ||
        skipIndicatorAnimationRef.current

      if (shouldSnap) {
        activeIndicator.style.transition = "none"
      }

      activeIndicator.style.height = `${linkRect.height}px`
      activeIndicator.style.opacity = "1"
      activeIndicator.style.transform = `translate3d(${x}px, ${y}px, 0)`

      if (shouldSnap) {
        activeIndicator.getBoundingClientRect()
        activeIndicator.style.removeProperty("transition")
        hasPositionedIndicatorRef.current = true
        skipIndicatorAnimationRef.current = false
      }
    }

    const scheduleUpdate = () => {
      if (animationFrame !== null) return
      animationFrame = window.requestAnimationFrame(updateIndicatorPosition)
    }

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(sectionList)
    sectionList
      .querySelectorAll<HTMLElement>("[data-section-id]")
      .forEach((link) => resizeObserver.observe(link))
    window.addEventListener("resize", scheduleUpdate)
    scheduleUpdate()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", scheduleUpdate)
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [activeId, sections])

  const handleSectionSelect = React.useCallback((id: string) => {
    clickScrollTargetRef.current = id
    skipIndicatorAnimationRef.current = true

    if (clickScrollReleaseTimerRef.current !== null) {
      window.clearTimeout(clickScrollReleaseTimerRef.current)
    }
    clickScrollReleaseTimerRef.current = window.setTimeout(() => {
      clickScrollTargetRef.current = null
      clickScrollReleaseTimerRef.current = null
    }, 200)

    setActiveId(id)
  }, [])

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
          <span className="text-2xs font-medium text-muted-foreground dark:text-gray-400 mb-4 block">
            On this page
          </span>
          <div ref={sectionListRef} className="relative">
            <span
              ref={activeIndicatorRef}
              data-slot="page-section-indicator"
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 w-px bg-primary opacity-0 transition-[transform,height,opacity] duration-200 ease-out motion-reduce:transition-none"
            />
            <ul className="space-y-1">
              {sections.map((section) => (
                <SectionLink
                  key={section.id}
                  section={section}
                  currentId={activeId}
                  onSelect={handleSectionSelect}
                />
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}
