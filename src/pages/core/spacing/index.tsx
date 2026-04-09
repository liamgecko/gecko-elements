import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Code } from "@/components/ui/code"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SpacingPage() {
  return (
    <div className="flex gap-5.5">
      <div className="min-w-0 flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">

        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Spacing</h1>
          <p className="text-sm text-muted-foreground">
            Gecko’s modular spacing scale ensures flexibility, alignment, and balance across our platform. It includes both small increments for small components or detailed designs, and large increments for patterns or layouts.
          </p>
        </PageSection>

        <PageSection id="spacing-scale" label="Spacing scale">
          <h2 className="text-lg font-semibold">Spacing scale</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            The spacing scale maps Tailwind spacing tokens (like <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">p-4</Code> or <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">gap-6</Code>) to a consistent set of rem/px values. Use these steps to keep layout rhythm consistent across components, avoid one-off spacing values, and make UI density predictable.
          </p>
          <ComponentExample>
          <div className="border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Spacing</TableHead>
                    <TableHead>Size (rem)</TableHead>
                    <TableHead>Size (px)</TableHead>
                    <TableHead>Token</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-0 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                      </TableCell>
                    <TableCell>0rem</TableCell>
                    <TableCell>0px</TableCell>
                    <TableCell><Code>0</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-0.5 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>0.125rem</TableCell>
                    <TableCell>2px</TableCell>
                    <TableCell><Code>0.5</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-1 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>0.25rem</TableCell>
                    <TableCell>4px</TableCell>
                    <TableCell><Code>1</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-1.5 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>0.375rem</TableCell>
                    <TableCell>6px</TableCell>
                    <TableCell><Code>1.5</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-2 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>0.5rem</TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell><Code>2</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-2.5 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>0.625rem</TableCell>
                    <TableCell>10px</TableCell>
                    <TableCell><Code>2.5</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-3 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>0.75rem</TableCell>
                    <TableCell>12px</TableCell>
                    <TableCell><Code>3</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-3.5 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>0.875rem</TableCell>
                    <TableCell>14px</TableCell>
                    <TableCell><Code>3.5</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-4 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>1rem</TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell><Code>4</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-5 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>1.25rem</TableCell>
                    <TableCell>20px</TableCell>
                    <TableCell><Code>5</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-6 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>1.5rem</TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell><Code>6</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-7 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>1.75rem</TableCell>
                    <TableCell>28px</TableCell>
                    <TableCell><Code>7</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-8 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>2rem</TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell><Code>8</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-9 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>2.25rem</TableCell>
                    <TableCell>36px</TableCell>
                    <TableCell><Code>9</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-10 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>2.5rem</TableCell>
                    <TableCell>40px</TableCell>
                    <TableCell><Code>10</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-12 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>3rem</TableCell>
                    <TableCell>48px</TableCell>
                    <TableCell><Code>12</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-16 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>4rem</TableCell>
                    <TableCell>64px</TableCell>
                    <TableCell><Code>16</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                        <div className="h-4 w-20 bg-blue-200"></div>
                        <div className="h-4 w-0.5 bg-blue-600"></div>
                      </div>
                    </TableCell>
                    <TableCell>5rem</TableCell>
                    <TableCell>80px</TableCell>
                    <TableCell><Code>20</Code></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>  
          </ComponentExample>
        </PageSection>

        <PageSection id="spacing-usage" label="Spacing usage">
          <h2 className="text-lg font-semibold">Spacing usage</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            This spacing scale is used consistently across the UI via Tailwind utilities. Use it for{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">padding</Code> and{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">margin</Code> (e.g.{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">p-4</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">px-6</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">mt-2.5</Code>), and for layout spacing between elements with{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">gap</Code> /{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">space-x</Code> /{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">space-y</Code>.
          </p>
          <p className="mb-4 text-sm text-muted-foreground">
            The same tokens also apply to sizing utilities such as{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">w-*</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">h-*</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">min-w-*</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">min-h-*</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">max-w-*</Code>, and{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">max-h-*</Code> so components feel proportionate without inventing one-off values.
          </p>
          <p className="text-sm text-muted-foreground">
            As a guideline, prefer using these scale values over arbitrary pixel/rem values. It keeps rhythm consistent, makes designs easier to scan, and reduces “almost the same” spacing throughout the codebase.
          </p>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
