import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { Code } from "@gecko/ui/components/code";
import { ComponentExample } from "@/components/layout/component-example";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
  TableHead,
} from "@gecko/ui/components/table";

export function ShadowsPage() {
  return (
    <div>
      <HeaderSection
        id="overview"
        title={<>Shadows</>}
        description={
          <>
            Shadows communicate elevation, layering, and interaction across the
            interface. A consistent shadow system helps define hierarchy,
            separate surfaces, and make interactive elements feel predictable
            and cohesive.
          </>
        }
      />
      <MainSection
        id="usage"
        title={<>Usage</>}
        description={
          <>
            Shadows should be used intentionally to represent elevation and
            interaction. They should reinforce structure and hierarchy across
            the interface, rather than act as purely decorative styling.
          </>
        }
      >
        <ComponentExample>
          <div className="grid gap-8">
            <div className="grid grid-cols-4 items-center gap-8">
              <div className="flex items-center h-24 text-xs justify-center bg-background text-foreground shadow-none rounded-lg border border-border">
                shadow-none
              </div>
              <div className="flex items-center h-24 text-xs justify-center bg-background text-foreground shadow-xs rounded-lg border border-border">
                shadow-xs
              </div>
              <div className="flex items-center h-24 text-xs justify-center bg-background text-foreground shadow-sm rounded-lg border border-border">
                shadow-sm
              </div>
              <div className="flex items-center h-24 text-xs justify-center bg-background text-foreground shadow-md rounded-lg border border-border">
                shadow-md
              </div>
              <div className="flex items-center h-24 text-xs justify-center bg-background text-foreground shadow-lg rounded-lg border border-border">
                shadow-lg
              </div>
              <div className="flex items-center h-24 text-xs justify-center bg-background text-foreground shadow-xl rounded-lg border border-border">
                shadow-xl
              </div>
            </div>
          </div>
        </ComponentExample>
        <ChildSection title={<>Guidelines:</>}>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-4">
            <li className="text-sm">
              Use shadows to indicate elevation and layering, not decoration
            </li>
            <li className="text-sm">
              Elements with higher elevation should appear above lower surfaces
            </li>
            <li className="text-sm">
              Use consistent shadow levels across similar components
            </li>
            <li className="text-sm">
              Avoid mixing multiple shadow levels within the same component
            </li>
            <li className="text-sm">
              Do not use shadows purely for visual styling without meaning
            </li>
          </ul>
        </ChildSection>
      </MainSection>

      <MainSection
        id="elevation-scale"
        title={<>Elevation scale</>}
        description={
          <>
            Shadows represent the relative elevation of surfaces. Higher
            elevation indicates greater prominence and separation from the
            background.
          </>
        }
      >
        <ComponentExample>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Usage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Code>shadow-xs</Code>
                  </TableCell>
                  <TableCell>Subtle separation (inputs, dividers)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>shadow-sm</Code>
                  </TableCell>
                  <TableCell>Default surfaces (cards, panels)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>shadow-md</Code>
                  </TableCell>
                  <TableCell>Interactive elements (dropdowns)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>shadow-lg</Code>
                  </TableCell>
                  <TableCell>Overlays (modals, popovers)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Code>shadow-xl</Code>
                  </TableCell>
                  <TableCell>High emphasis (critical overlays)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ComponentExample>
      </MainSection>
    </div>
  );
}
