import { Link } from "react-router-dom"

import { cn } from "@gecko/ui/lib/utils"

export function breadcrumbLinkClassName(className?: string) {
  return cn("hover:text-foreground transition-colors", className)
}

type BreadcrumbRouterLinkProps = {
  to: string
  children: React.ReactNode
  className?: string
}

export function BreadcrumbRouterLink({
  to,
  children,
  className,
}: BreadcrumbRouterLinkProps) {
  return (
    <Link to={to} className={breadcrumbLinkClassName(className)}>
      {children}
    </Link>
  )
}
