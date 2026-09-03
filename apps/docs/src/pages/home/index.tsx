import { Link } from "react-router-dom";
import { buttonVariants } from "@gecko/ui/components/button";
import {
  componentPages,
  corePages,
  guidesPages,
  structurePages,
} from "@/pages/gallery-data";
import { HeaderSection, MainSection } from "@/components/layout/docs-section";

export function HomePage() {
  const sortedComponents = [...componentPages].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div>
      <HeaderSection
        id="overview"
        title={<>Elements</>}
        description={
          <>
            Elements is Gecko's design system, a collection of guidelines,
            components and tools for creating intuitive experiences
          </>
        }
      />

      <MainSection
        id="guides"
        title={<>Guides</>}
        description={<>How to style, choose, and compose components.</>}
      >
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
      </MainSection>

      <MainSection
        id="basic-example"
        title={<>Foundations</>}
        description={
          <>
            Foundations create engaging user experiences. These include our
            tokens, guidelines, and visual styles: color, spacing, typography,
            and more.
          </>
        }
      >
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
      </MainSection>

      <MainSection
        id="structure"
        title={<>Structure</>}
        description={
          <>
            Layout and composition building blocks — App Header, App Sidebar,
            Page Container, and Page Header.
          </>
        }
      >
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
      </MainSection>

      <MainSection
        id="components"
        title={<>Components</>}
        description={
          <>
            Components are reusable building blocks that meet specific
            interaction needs. They combine to create intuitive user
            experiences.
          </>
        }
      >
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
                    className={buttonVariants({
                      variant: "secondary",
                      size: "sm",
                    })}
                  >
                    View component
                  </Link>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </MainSection>
    </div>
  );
}
