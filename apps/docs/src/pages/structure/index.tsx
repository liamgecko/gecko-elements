import { Link } from "react-router-dom";
import { buttonVariants } from "@gecko/ui/components/button";
import { HeaderSection, MainSection } from "@/components/layout/docs-section";
import { structurePages } from "@/pages/gallery-data";

export function StructureIndexPage() {
  return (
    <div>
      <HeaderSection
        title="Structure"
        description="Layout and composition building blocks for consistent screens — app chrome and page structure."
      />

      <MainSection title="Structure topics">
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
    </div>
  );
}
