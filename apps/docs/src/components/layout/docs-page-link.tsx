import { Link } from "react-router-dom"

type DocsPageLinkProps = {
  to: string
  children: React.ReactNode
}

/** In-prose link to another docs page. Use when Usage recommends a different component. */
export function DocsPageLink({ to, children }: DocsPageLinkProps) {
  return (
    <Link
      to={to}
      className="font-medium text-primary underline decoration-muted-foreground/50 underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
    </Link>
  )
}
