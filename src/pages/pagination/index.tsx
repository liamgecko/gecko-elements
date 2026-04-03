import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@/components/ui/code"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationPage() {
  return (
    <div className="flex gap-5.5">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Pagination</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder for Pagination component examples.
          </p>
        </PageSection>

        <PageSection id="navigational" label="Navigational">
          <h2 className="text-lg font-semibold">Navigational</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Pagination</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PaginationContent</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PaginationItem</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PaginationLink</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PaginationPrevious</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PaginationNext</Code>, and{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PaginationEllipsis</Code> for link-based navigation.
          </p>
          <ComponentExample>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" iconOnly />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" iconOnly />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ComponentExample>
        </PageSection>

        <PageSection id="table-pagination" label="Icon only">
          <h2 className="text-lg font-semibold">Icon only</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use only <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PaginationPrevious</Code> and{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">PaginationNext</Code> for minimal table-style pagination.
          </p>
          <ComponentExample>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" iconOnly variant="outline" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" iconOnly variant="outline" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
