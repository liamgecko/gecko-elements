import { cn } from "@gecko/ui/lib/utils"

type PageSectionProps = {
  id: string
  label: string
  children: React.ReactNode
  className?: string
}

/**
 * Wraps page content in a section with id for scroll targets.
 * Section structure for the "On this page" nav is defined in config/component-sections.ts.
 */
export function PageSection({ id, children, className }: PageSectionProps) {
  return (
    <section id={id} className={cn(className)}>
      {children}
    </section>
  )
}
