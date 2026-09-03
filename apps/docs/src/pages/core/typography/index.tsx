import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { ComponentExample } from "@/components/layout/component-example";
import { Code } from "@gecko/ui/components/code";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@gecko/ui/components/table";

export function TypographyPage() {
  return (
    <div>
      <HeaderSection
        id="overview"
        title={<>Typography</>}
        description={
          <>
            Typography defines hierarchy, improves readability, and creates
            consistent structure across the product. Our system uses a small set
            of predefined styles and tokens to ensure clarity, consistency, and
            ease of implementation.
          </>
        }
      />

      <MainSection
        id="usage"
        title={<>Usage</>}
        description={
          <>
            Typography should be applied consistently using predefined styles
            and tokens. Following these guidelines ensures clear hierarchy,
            improves readability, and maintains a cohesive experience across the
            product.
          </>
        }
      >
        <ChildSection title={<>Guidelines:</>}>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-4">
            <li className="text-sm">
              Use predefined typography styles and tokens
            </li>
            <li className="text-sm">
              Do not introduce custom font sizes or weights
            </li>
            <li className="text-sm">Maintain clear hierarchy across content</li>
            <li className="text-sm">
              Pair typography with spacing to create structure
            </li>
            <li className="text-sm">
              Avoid using typography purely for visual styling
            </li>
          </ul>
        </ChildSection>
      </MainSection>

      <MainSection
        id="font-families"
        title={<>Font families</>}
        description={
          <>
            We use Satoshi and Geist Mono, two modern, versatile typefaces
            chosen for clarity, flexibility, and consistency across UI and code
            contexts.
          </>
        }
      >
        <div className="mb-8">
          <h3
            id="satoshi"
            className="text-base font-semibold gap-0.5 flex flex-col"
          >
            Satoshi
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our primary font family, chosen for its clear and consistent design,
            which aligns with our brand values.
          </p>
          <ComponentExample className="space-y-2">
            <p className="text-3xl font-sans">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p className="text-3xl font-sans">abcdefghijklmnopqrstuvwxyz</p>
            <p className="text-3xl font-sans">0123456789</p>
            <p className="text-3xl font-sans">!@#$%^&*()_+</p>
          </ComponentExample>
        </div>
        <div className="mb-8">
          <h3
            id="geist-mono"
            className="text-base font-semibold gap-0.5 flex flex-col"
          >
            Geist Mono
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            A monospace font family used for code blocks and technical
            documentation.
          </p>
          <ComponentExample className="space-y-2">
            <p className="text-3xl font-mono">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p className="text-3xl font-mono">abcdefghijklmnopqrstuvwxyz</p>
            <p className="text-3xl font-mono">0123456789</p>
            <p className="text-3xl font-mono">!@#$%^&*()_+</p>
          </ComponentExample>
        </div>
      </MainSection>

      <MainSection
        id="weights"
        title={<>Weights</>}
        description={
          <>
            We use a limited set of font weights to maintain consistency and
            reinforce hierarchy across the interface.
          </>
        }
      >
        <ComponentExample>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Weight</TableHead>
                  <TableHead>Font weight</TableHead>
                  <TableHead>Token</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-xl font-sans font-normal">
                      Regular
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      400
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>font-normal</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-xl font-sans font-medium">
                      Medium
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      500
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>font-medium</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-xl font-sans font-semibold">
                      Semibold
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      600
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>font-semibold</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-xl font-sans font-bold">
                      Bold
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      800
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>font-bold</Code>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ComponentExample>
        <ChildSection title={<>Guidelines:</>}>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-4">
            <li className="text-sm">Use Regular for body text</li>
            <li className="text-sm">
              Use Medium / Semibold for emphasis and headings
            </li>
            <li className="text-sm">Use Bold sparingly for strong emphasis</li>
            <li className="text-sm">
              Avoid mixing multiple weights within the same component
            </li>
          </ul>
        </ChildSection>
      </MainSection>

      <MainSection
        id="type-scale"
        title={<>Type scale</>}
        description={
          <>
            The type scale defines a consistent set of sizes and line heights
            used across the interface. Each size has a clear purpose and should
            be used consistently.
          </>
        }
      >
        <ComponentExample>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type scale</TableHead>
                  <TableHead>Font size</TableHead>
                  <TableHead>Line height</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Token</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-2xl">
                      Type scale 2xl
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Font size: 24px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Line height: 32px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Page headings (h1)
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-2xl</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-xl">
                      Type scale xl
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Font size: 20px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Line height: 28px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Section headings (h2)
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-xl</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-lg">
                      Type scale lg
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Font size: 18px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Line height: 28px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Subheadings (h3)
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-lg</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-base">
                      Type scale md
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Font size: 16px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Line height: 24px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Subheadings (h4)
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-base</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Type scale sm
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Font size: 14px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Line height: 20px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Body text
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-sm</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-xs">
                      Type scale xs
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Font size: 13px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Line height: 18px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Labels
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-xs</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-2xs">
                      Type scale 2xs
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Font size: 12px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Line height: 16px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Captions
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-2xs</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-3xs">
                      Type scale 3xs
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Font size: 11px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Line height: 16px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Dense UI
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-3xs</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-4xs">
                      Type scale 4xs
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Font size: 10px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Line height: normal
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Dense UI
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-4xs</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-5xs">
                      Type scale 5xs
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Font size: 9px
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Line height: normal
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      Dense UI
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-5xs</Code>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="text-elements"
        title={<>Text elements</>}
        description={
          <>
            Text elements map semantic HTML elements to predefined typography
            styles. These should be used consistently to maintain hierarchy and
            accessibility.
          </>
        }
      >
        <ComponentExample>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Text element</TableHead>
                  <TableHead>Font size</TableHead>
                  <TableHead>Font weight</TableHead>
                  <TableHead>Token</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-2xl font-bold text-foreground">
                      H1
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      text-lg
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      font-bold
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-h1</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-lg font-semibold text-foreground">
                      H2
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      text-lg
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      font-semibold
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-h2</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-base font-semibold text-foreground">
                      H3
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      text-base
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      font-semibold
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-h3</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm font-normal text-foreground">
                      Body
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      text-sm
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      font-normal
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-body</Code>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-2xs font-normal text-muted-foreground">
                      Caption
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      text-2xs
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      font-normal
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center min-h-12 text-sm">
                      <Code>text-caption</Code>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ComponentExample>
        <ChildSection title={<>Guidelines:</>}>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 mb-4">
            <li className="text-sm">
              Use semantic HTML (h1, h2, etc.) for structure
            </li>
            <li className="text-sm">
              Use tokens (<Code>text-h1</Code>, <Code>text-body</Code>) for
              styling
            </li>
            <li className="text-sm">
              Do not rely on size alone to define hierarchy
            </li>
          </ul>
        </ChildSection>
      </MainSection>
    </div>
  );
}
