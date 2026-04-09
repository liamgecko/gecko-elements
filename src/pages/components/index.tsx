import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { componentPages } from "@/pages/gallery-data"

export function ComponentsIndexPage() {
  const sortedComponents = [...componentPages].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Components</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          UI building blocks for Gecko Elements.
        </p>
      </div>

      <section aria-labelledby="components-gallery-heading">
        <h2 id="components-gallery-heading" className="sr-only">
          Available components
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {sortedComponents.map(({ name, description, path }) => (
            <li key={path}>
              <article className="rounded-lg border border-border bg-card p-4 text-card-foreground">
                <h3 className="font-medium">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
                <p className="mt-3">
                  <Link
                    to={path}
                    className={buttonVariants({ variant: "secondary", size: "sm" })}
                  >
                    View component
                  </Link>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
