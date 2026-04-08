import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Code } from "@/components/ui/code"

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
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">Spacing</div>
                <div className="flex items-center min-h-12 text-xs font-semibold">Size (rem)</div>
                <div className="flex items-center min-h-12 text-xs font-semibold">Size (px)</div>
                <div className="flex items-center min-h-12 text-xs font-semibold">Token</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-0 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">0rem</div>
                <div className="flex items-center min-h-12 text-sm">0px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>0</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-0.5 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">0.125rem</div>
                <div className="flex items-center min-h-12 text-sm">2px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>0.5</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-1 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">0.25rem</div>
                <div className="flex items-center min-h-12 text-sm">4px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>1</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-1.5 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">0.375rem</div>
                <div className="flex items-center min-h-12 text-sm">6px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>1.5</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-2 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">0.5rem</div>
                <div className="flex items-center min-h-12 text-sm">8px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>2</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-2.5 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">0.625rem</div>
                <div className="flex items-center min-h-12 text-sm">10px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>2.5</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-3 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">0.75rem</div>
                <div className="flex items-center min-h-12 text-sm">12px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>3</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-3.5 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">0.875rem</div>
                <div className="flex items-center min-h-12 text-sm">14px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>3.5</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-4 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">1rem</div>
                <div className="flex items-center min-h-12 text-sm">16px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>4</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-5 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">1.25rem</div>
                <div className="flex items-center min-h-12 text-sm">20px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>5</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-6 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">1.5rem</div>
                <div className="flex items-center min-h-12 text-sm">24px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>6</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-7 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">1.75rem</div>
                <div className="flex items-center min-h-12 text-sm">28px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>7</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-8 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">2rem</div>
                <div className="flex items-center min-h-12 text-sm">32px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>8</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-9 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">2.25rem</div>
                <div className="flex items-center min-h-12 text-sm">36px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>9</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-10 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">2.5rem</div>
                <div className="flex items-center min-h-12 text-sm">40px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>10</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-12 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">3rem</div>
                <div className="flex items-center min-h-12 text-sm">48px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>12</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-16 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">4rem</div>
                <div className="flex items-center min-h-12 text-sm">64px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>16</Code></div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="flex items-center min-h-12 text-xs font-semibold">
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                  <div className="h-4 w-20 bg-blue-200"></div>
                  <div className="h-4 w-0.5 bg-blue-600"></div>
                </div>
                <div className="flex items-center min-h-12 text-sm">5rem</div>
                <div className="flex items-center min-h-12 text-sm">80px</div>
                <div className="flex items-center min-h-12 text-sm"><Code>20</Code></div>
              </div>
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
