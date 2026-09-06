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
      className="text-foreground underline hover:text-muted-foreground"
    >
      {children}
    </a>
  )
}
