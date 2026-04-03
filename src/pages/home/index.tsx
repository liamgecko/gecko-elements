import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { componentPages, corePages } from "@/pages/gallery-data"

export function HomePage() {
  const sortedComponents = [...componentPages].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Home</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Foundations and component gallery
        </p>
      </div>

      <section aria-labelledby="core-heading">
        <h2
          id="core-heading"
          className="mb-4 text-lg font-semibold text-foreground"
        >
          Core
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {corePages.map(({ name, description, path }) => (
            <li key={path}>
              <article className="rounded-lg border border-border bg-card p-4 text-card-foreground">
                <h3 className="font-medium">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
                <p className="mt-3">
                  <Link
                    to={path}
                    className={buttonVariants({
                      variant: "secondary",
                      size: "sm",
                    })}
                  >
                    View
                  </Link>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="components-heading">
        <h2
          id="components-heading"
          className="mb-4 text-lg font-semibold text-foreground"
        >
          Components
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
