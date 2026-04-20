import { PageSection } from "@/components/layout/page-section"
import { Code } from "@/components/ui/code"
import { ComponentExample } from "@/components/layout/component-example"
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table"

export function RadiusPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground mb-2">Radius</h1>
          <p className="text-sm text-muted-foreground">
          Corner radius defines the shape and visual character of surfaces across the interface. Using a consistent radius scale helps components feel cohesive, improves predictability, and reinforces the distinction between elements, containers, and interactive states.
          </p>
        </PageSection>
        <PageSection id="usage" label="Usage">
          <h2 className="text-lg font-semibold">Usage</h2>
          <p className="text-sm text-muted-foreground mb-4">
          Radius should be applied consistently using predefined tokens. This helps maintain a unified visual language across components and avoids one-off values that make the UI feel inconsistent.
          </p>
          <h3 className="text-sm font-semibold mb-2">
            Guidelines:
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-4">
            <li className="text-sm">Use smaller radius values for dense UI and compact controls</li>
            <li className="text-sm">Use medium radius values for most components and surfaces</li>
            <li className="text-sm">Use larger radius values for emphasis, overlays, or highly prominent surfaces</li>
            <li className="text-sm">Maintain consistent radius usage within the same component or pattern</li>
            <li className="text-sm">Avoid introducing arbitrary radius values outside the system</li>
          </ul>
        </PageSection>

        <PageSection id="radius-scale" label="Radius scale">
          <h2 className="text-lg font-semibold">Radius scale</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            The radius scale maps <Code>rounded-*</Code> utilities to a consistent set of rem and pixel values. Use this scale to create predictable shapes across components and layouts.
          </p>
          <ComponentExample className="mb-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Radius</TableHead>
                    <TableHead>Size (rem)</TableHead>
                    <TableHead>Size (px)</TableHead>
                    <TableHead>Token</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="radius flex items-center border-t border-r rounded-0 border-blue-500 w-48 h-8 bg-blue-50 dark:bg-blue-950"></div>
                      </div>
                      </TableCell>
                    <TableCell>0rem</TableCell>
                    <TableCell>0px</TableCell>
                    <TableCell><Code>rounded-none</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="radius flex items-center border-t border-r rounded-xs rounded-s-none rounded-br-none border-blue-500 w-48 h-8 bg-blue-50 dark:bg-blue-950"></div>
                      </div>
                      </TableCell>
                    <TableCell>0.125rem</TableCell>
                    <TableCell>2px</TableCell>
                    <TableCell><Code>rounded-xs</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="radius flex items-center border-t border-r rounded-sm rounded-s-none rounded-br-none border-blue-500 w-48 h-8 bg-blue-50 dark:bg-blue-950"></div>
                      </div>
                      </TableCell>
                    <TableCell>0.25rem</TableCell>
                    <TableCell>4px</TableCell>
                    <TableCell><Code>rounded-sm</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="radius flex items-center border-t border-r rounded-md rounded-s-none rounded-br-none border-blue-500 w-48 h-8 bg-blue-50 dark:bg-blue-950"></div>
                      </div>
                      </TableCell>
                    <TableCell>0.5rem</TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell><Code>rounded-md</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="radius flex items-center border-t border-r rounded-lg rounded-s-none rounded-br-none border-blue-500 w-48 h-8 bg-blue-50 dark:bg-blue-950"></div>
                      </div>
                      </TableCell>
                    <TableCell>1rem</TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell><Code>rounded-lg</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="radius flex items-center border-t border-r rounded-xl rounded-s-none rounded-br-none border-blue-500 w-48 h-8 bg-blue-50 dark:bg-blue-950"></div>
                      </div>
                    </TableCell>
                    <TableCell>1.25rem</TableCell>
                    <TableCell>20px</TableCell>
                    <TableCell><Code>rounded-xl</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="radius flex items-center border-t border-r rounded-2xl rounded-s-none rounded-br-none border-blue-500 w-48 h-8 bg-blue-50 dark:bg-blue-950"></div>
                      </div>
                    </TableCell>
                    <TableCell>1.5rem</TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell><Code>rounded-2xl</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                      <div className="radius flex items-center border-t border-r rounded-3xl rounded-s-none rounded-br-none border-blue-500 w-48 h-8 bg-blue-50 dark:bg-blue-950"></div>
                      </div>
                      </TableCell>
                    <TableCell>1.75rem</TableCell>
                    <TableCell>28px</TableCell>
                    <TableCell><Code>rounded-3xl</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="radius flex items-center border-t border-r rounded-4xl rounded-s-none rounded-br-none border-blue-500 w-48 h-8 bg-blue-50 dark:bg-blue-950"></div>
                      </div>
                      </TableCell>
                    <TableCell>2rem</TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell><Code>rounded-4xl</Code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="radius flex items-center border-t border-r rounded-full rounded-s-none rounded-br-none border-blue-500 w-48 h-8 bg-blue-50 dark:bg-blue-950"></div>
                      </div>
                      </TableCell>
                    <TableCell>2rem</TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell><Code>rounded-full</Code></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>  
          </ComponentExample>
          <h3 className="text-sm font-semibold mb-2">
            Guidelines:
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-4">
            <li className="text-sm">Use the smallest radius values for subtle rounding</li>
            <li className="text-sm">Use mid-range values as the default for common components</li>
            <li className="text-sm">Reserve large radius values for prominent or expressive surfaces</li>
            <li className="text-sm">Use <Code>rounded-none</Code> only where sharp corners are intentional</li>
          </ul>
        </PageSection>

    </div>
  )
}
