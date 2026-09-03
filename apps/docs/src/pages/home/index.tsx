import { Link } from "react-router-dom"
import { buttonVariants } from "@gecko/ui/components/button"
import { componentPages, corePages, guidesPages, structurePages } from "@/pages/gallery-data"
import { PageSection } from "@/components/layout/page-section"

export function HomePage() {
  const sortedComponents = [...componentPages].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <h1 className="text-2xl font-bold text-foreground">Elements</h1>
        <p className="text-sm text-muted-foreground">
          Elements is Gecko's design system, a collection of guidelines, components and tools for creating intuitive experiences
        </p>
      </PageSection>

      <PageSection id="guides" label="Guides">
        <h2 className="text-lg font-semibold">Guides</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          How to style, choose, and compose components.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guidesPages.map(({ name, description, path }) => (
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
      </PageSection>

      <PageSection id="basic-example" label="Basic example">
        <h2 className="text-lg font-semibold">Foundations</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Foundations create engaging user experiences. These include our tokens, guidelines, and visual styles: color, spacing, typography, and more.
        </p>
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
      </PageSection>

      <PageSection id="structure" label="Structure">
        <h2 className="text-lg font-semibold">Structure</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Layout and composition building blocks — App Header, App Sidebar, Page Container, and Page Header.
        </p>
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
      </PageSection>

      <PageSection id="components" label="Components">
        <h2 className="text-lg font-semibold">Components</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Components are reusable building blocks that meet specific interaction needs. They combine to create intuitive user experiences.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </PageSection>
    </div>
  )
}
