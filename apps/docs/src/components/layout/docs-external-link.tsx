type DocsExternalLinkProps = {
  href: string
  children: React.ReactNode
}

/** In-prose link to an external docs source (Base UI, shadcn). */
export function DocsExternalLink({ href, children }: DocsExternalLinkProps) {
  return (
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      className="font-medium text-primary underline decoration-muted-foreground/50 underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
    </a>
  )
}
