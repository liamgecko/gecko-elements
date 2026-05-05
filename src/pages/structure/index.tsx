import { Link } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"
import { structurePages } from "@/pages/gallery-data"

export function StructureIndexPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Structure</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Layout and composition building blocks for consistent screens.
        </p>
      </div>

      <section aria-labelledby="structure-gallery-heading">
        <h2 id="structure-gallery-heading" className="sr-only">
          Structure topics
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {structurePages.map(({ name, description, path }) => (
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
                    View
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

