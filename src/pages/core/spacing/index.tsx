import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Code } from "@/components/ui/code"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SpacingPage() {
  return (
    <div className="space-y-12">

        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground mb-2">Spacing</h1>
          <p className="text-sm text-muted-foreground">
          Spacing defines layout, structure, and visual rhythm across the interface. Our system uses a consistent, token-based scale to ensure alignment, predictability, and balance across components.
          </p>
        </PageSection>

        <PageSection id="usage" label="Usage">
          <h2 className="text-lg font-semibold">Usage</h2>
          <p className="mb-4 text-sm text-muted-foreground">
          Spacing should be applied consistently using predefined tokens. These guidelines help maintain alignment, create clear structure, and ensure predictable layouts across the interface.
          </p>
          <h3 className="text-sm font-semibold mb-2">
          Guidelines:
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-4">
            <li className="text-sm">Use spacing tokens consistently across layouts and components</li>
            <li className="text-sm">Avoid arbitrary or one-off spacing values</li>
            <li className="text-sm">Use smaller spacing for dense UI and larger spacing for layout separation</li>
            <li className="text-sm">Maintain consistent spacing patterns within components</li>
            <li className="text-sm">Use spacing to create clear hierarchy and grouping</li>
          </ul>
        </PageSection>

        <PageSection id="spacing-scale" label="Spacing scale">
          <h2 className="text-lg font-semibold">Spacing scale</h2>
          <p className="mb-4 text-sm text-muted-foreground">
          Spacing is based on tokens (e.g. <Code>p-4</Code>, <Code>gap-6</Code>) mapped to a consistent rem/px scale. This ensures predictable layouts and avoids one-off spacing values.
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
                        <div className="h-4 w-0 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-0.5 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-1 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-1.5 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-2 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-2.5 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-3 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-3.5 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-4 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-5 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-6 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-7 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-8 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-9 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-10 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-12 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-16 bg-blue-200 dark:bg-blue-950"></div>
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
                        <div className="h-4 w-20 bg-blue-200 dark:bg-blue-950"></div>
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

        <PageSection id="spacing-patterns" label="Spacing patterns">
          <h2 className="text-lg font-semibold">Spacing patterns</h2>
          <p className="mb-4 text-sm text-muted-foreground">
          Spacing patterns define how spacing utilities are applied across layouts and components. Using consistent patterns ensures predictable structure, improves readability, and reduces the need for one-off spacing decisions.
          </p>
          <ComponentExample>
            <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pattern</TableHead>
                  <TableHead>Utilities</TableHead>
                  <TableHead>Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Padding</TableCell>
                  <TableCell><Code>p-*, px-*, py-*, pt-*, pr-*, pb-*, pl-*</Code></TableCell>
                  <TableCell>Internal spacing within components</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Margin</TableCell>
                  <TableCell><Code>m-*, mx-*, my-*, mt-*, mr-*, mb-*, ml-*</Code></TableCell>
                  <TableCell>External spacing between elements</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gap</TableCell>
                  <TableCell><Code>gap-*, gap-x-*, gap-y-*</Code></TableCell>
                  <TableCell>Spacing between items in flex and grid layouts</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Space between</TableCell>
                  <TableCell><Code>space-x-*, space-y-*</Code></TableCell>
                  <TableCell>Consistent spacing between sibling elements</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Inset</TableCell>
                  <TableCell><Code>top-*, right-*, bottom-*, left-*, inset-*</Code></TableCell>
                  <TableCell>Positioning offsets for absolutely positioned elements</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Negative spacing</TableCell>
                  <TableCell><Code>-m-*, -mt-*, -space-x-*</Code></TableCell>
                  <TableCell>Used sparingly for overlapping or offset layouts</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </div>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
