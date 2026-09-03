import * as React from "react";

import { cn } from "@gecko/ui/lib/utils";

type DocsSectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
};

const contentStyles = cn(
  "[&>p:not([class])]:text-sm [&>p:not([class])]:leading-normal [&>p:not([class])]:text-pretty [&>p:not([class])]:text-muted-foreground",
  "[&>ul:not([class])]:space-y-2 [&>ul:not([class])]:text-sm [&>ul:not([class])]:leading-relaxed [&>ul:not([class])]:text-muted-foreground",
);

function SectionDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-normal text-pretty text-muted-foreground">
      {children}
    </p>
  );
}

function HeaderSection({
  className,
  title,
  description,
  children,
  ...props
}: DocsSectionProps) {
  return (
    <section
      data-slot="docs-header-section"
      className={cn("mb-12 space-y-6 last:mb-0", contentStyles, className)}
      {...props}
    >
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-balance text-foreground">
          {title}
        </h1>
        {description ? (
          <SectionDescription>{description}</SectionDescription>
        ) : null}
      </header>
      {children}
    </section>
  );
}

function MainSection({
  className,
  title,
  description,
  children,
  ...props
}: DocsSectionProps) {
  return (
    <section
      data-slot="docs-main-section"
      className={cn("mb-12 space-y-6 last:mb-0", contentStyles, className)}
      {...props}
    >
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-balance text-foreground">
          {title}
        </h2>
        {description ? (
          <SectionDescription>{description}</SectionDescription>
        ) : null}
      </header>
      {children}
    </section>
  );
}

function ChildSection({
  className,
  title,
  description,
  children,
  ...props
}: DocsSectionProps) {
  return (
    <section
      data-slot="docs-child-section"
      className={cn("space-y-4", contentStyles, className)}
      {...props}
    >
      <header className="space-y-1">
        <h3 className="text-base font-semibold text-balance text-foreground">
          {title}
        </h3>
        {description ? (
          <SectionDescription>{description}</SectionDescription>
        ) : null}
      </header>
      {children}
    </section>
  );
}

export { ChildSection, HeaderSection, MainSection };
