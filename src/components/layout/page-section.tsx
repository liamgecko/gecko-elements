import * as React from "react"
import { cn } from "@/lib/utils"
import { usePageSections } from "./page-sections-context"

type PageSectionProps = {
  id: string
  label: string
  children: React.ReactNode
  className?: string
}

export function PageSection({ id, label, children, className }: PageSectionProps) {
  const ctx = usePageSections()
  const ctxRef = React.useRef(ctx)
  ctxRef.current = ctx

  React.useEffect(() => {
    const c = ctxRef.current
    if (!c) return
    c.registerSection(id, label)
    return () => c.unregisterSection(id)
  }, [id, label])

  return (
    <section id={id} className={cn(className)}>
      {children}
    </section>
  )
}
