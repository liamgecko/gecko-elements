import { Link } from "react-router-dom";
import { buttonVariants } from "@gecko/ui/components/button";
import { HeaderSection, MainSection } from "@/components/layout/docs-section";
import { componentPages } from "@/pages/gallery-data";

export function ComponentsIndexPage() {
  const sortedComponents = [...componentPages].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div>
      <HeaderSection
        title="Components"
        description="UI building blocks for Gecko Elements."
      />

      <MainSection title="Available components">
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
