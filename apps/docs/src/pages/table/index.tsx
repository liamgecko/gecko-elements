import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import { Code } from "@gecko/ui/components/code";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableExpandableRow,
  TableExpandableRowTrigger,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@gecko/ui/components/table";

const invoices = [
  ["INV001", "Paid", "Credit Card", "$250.00"],
  ["INV002", "Pending", "PayPal", "$150.00"],
  ["INV003", "Unpaid", "Bank Transfer", "$350.00"],
] as const;

function InvoiceRows() {
  return invoices.map(([invoice, status, method, amount]) => (
    <TableRow key={invoice}>
      <TableCell>{invoice}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{method}</TableCell>
      <TableCell className="text-end tabular-nums">{amount}</TableCell>
    </TableRow>
  ));
}

function InvoiceHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead className="text-end">Amount</TableHead>
      </TableRow>
    </TableHeader>
  );
}

export function TablePage() {
  const importSnippet = `import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableExpandableRow,
  TableExpandableRowTrigger,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@gecko/ui/components/table"`;

  const compositionSnippet = `Table
├── TableCaption
├── TableHeader
│   └── TableRow
│       └── TableHead
├── TableBody
│   ├── TableRow
│   │   └── TableCell
│   └── TableExpandableRow
│       ├── TableCell
│       │   └── TableExpandableRowTrigger
│       └── TableDetailRow | TableRow
└── TableFooter
    └── TableRow
        └── TableCell`;

  const basicExampleSnippet = `<Table>
  <TableCaption>Recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-end">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-end tabular-nums">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell className="text-end tabular-nums">$150.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV003</TableCell>
      <TableCell>Unpaid</TableCell>
      <TableCell>Bank Transfer</TableCell>
      <TableCell className="text-end tabular-nums">$350.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`;

  const footerSnippet = `<Table aria-label="Invoice totals">
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-end">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-end tabular-nums">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell className="text-end tabular-nums">$150.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV003</TableCell>
      <TableCell>Unpaid</TableCell>
      <TableCell>Bank Transfer</TableCell>
      <TableCell className="text-end tabular-nums">$350.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableHead scope="row" colSpan={3}>Total</TableHead>
      <TableCell className="text-end tabular-nums">$750.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`;

  const hoverableSnippet = `<Table hoverable aria-label="Invoices">
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-end">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-end tabular-nums">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell className="text-end tabular-nums">$150.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV003</TableCell>
      <TableCell>Unpaid</TableCell>
      <TableCell>Bank Transfer</TableCell>
      <TableCell className="text-end tabular-nums">$350.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`;

  const nestedSnippet = `<Table
  nested
  title="Sessions"
  description="Session times for this event."
>
  <TableHeader>
    <TableRow>
      <TableHead>Time</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="text-end">Attendees</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>10:00</TableCell>
      <TableCell>12 September 2026</TableCell>
      <TableCell className="text-end tabular-nums">84</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>14:00</TableCell>
      <TableCell>12 September 2026</TableCell>
      <TableCell className="text-end tabular-nums">126</TableCell>
    </TableRow>
  </TableBody>
</Table>`;

  const expandablePanelSnippet = `<Table aria-label="Invoices with line items">
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-end">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableExpandableRow
      colSpan={3}
      detail={
        <Table nested title="Line items">
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-end">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Registration</TableCell>
              <TableCell className="text-end tabular-nums">
                $250.00
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      }
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <TableExpandableRowTrigger label="INV001 details" />
          INV001
        </div>
      </TableCell>
      <TableCell>Paid</TableCell>
      <TableCell className="text-end tabular-nums">$250.00</TableCell>
    </TableExpandableRow>
  </TableBody>
</Table>`;

  const expandableSiblingSnippet = `<Table aria-label="Invoices and instalments">
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-end">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableExpandableRow
      colSpan={3}
      detailLayout="sibling-rows"
      detail={
        <>
          <TableRow>
            <TableCell>INV002-A</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell className="text-end tabular-nums">$75.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV002-B</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className="text-end tabular-nums">$75.00</TableCell>
          </TableRow>
        </>
      }
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <TableExpandableRowTrigger label="INV002 instalments" />
          INV002
        </div>
      </TableCell>
      <TableCell>Part paid</TableCell>
      <TableCell className="text-end tabular-nums">$150.00</TableCell>
    </TableExpandableRow>
  </TableBody>
</Table>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Table"
          description="The Table component presents simple, non-interactive data in semantic rows and columns."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Table for simple tabular data, such as reporting detail inside
              a{" "}
              <DocsPageLink to="/components/metric-card">
                Metric card
              </DocsPageLink>
              , when sorting, filtering and row actions are not needed.
              <br />
              <br />
              Use{" "}
              <DocsPageLink to="/components/data-table">
                Data table
              </DocsPageLink>{" "}
              for product lists and expandable application rows.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the table parts required by the composition."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
        <PageSubsectionHeader
          id="usage-composition"
          title="Composition"
          description="A table can contain a caption, grouped rows and expandable detail content."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="text"
            code={compositionSnippet}
            showCopyButton
            copyLabel="Copy composition"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description="A semantic table with a visible caption, column headers and aligned numeric values."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Table>
              <TableCaption>Recent invoices.</TableCaption>
              <InvoiceHeader />
              <TableBody>
                <InvoiceRows />
              </TableBody>
            </Table>
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="footer" label="Footer">
        <PageSectionHeader
          title="Footer"
          description="Use the footer for totals, counts and other aggregate values."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Table aria-label="Invoice totals">
              <InvoiceHeader />
              <TableBody>
                <InvoiceRows />
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableHead scope="row" colSpan={3}>
                    Total
                  </TableHead>
                  <TableCell className="text-end tabular-nums">
                    $750.00
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <Code
              variant="block"
              language="tsx"
              code={footerSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="hoverable" label="Hoverable rows">
        <PageSectionHeader
          title="Hoverable rows"
          description="Use row highlighting when it helps people track values across a dense table. It does not make rows interactive."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Table hoverable aria-label="Invoices">
              <InvoiceHeader />
              <TableBody>
                <InvoiceRows />
              </TableBody>
            </Table>
            <Code
              variant="block"
              language="tsx"
              code={hoverableSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="nested" label="Nested table">
        <PageSectionHeader
          title="Nested table"
          description="Use a nested table for tabular detail inside an expandable Data table row. Its title and description are connected automatically."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Table
              nested
              title="Sessions"
              description="Session times for this event."
            >
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-end">Attendees</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>10:00</TableCell>
                  <TableCell>12 September 2026</TableCell>
                  <TableCell className="text-end tabular-nums">84</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>14:00</TableCell>
                  <TableCell>12 September 2026</TableCell>
                  <TableCell className="text-end tabular-nums">126</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Code
              variant="block"
              language="tsx"
              code={nestedSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="expandable" label="Expandable rows">
        <PageSectionHeader
          title="Expandable rows"
          description={
            <>
              These primitives support the expandable interface owned by{" "}
              <DocsPageLink to="/components/data-table">
                Data table
              </DocsPageLink>
              . Application code should use its expandable configuration.
            </>
          }
        />
        <PageSubsectionHeader
          id="expandable-panel"
          title="Panel"
          description="Use a detail panel when the expanded content has its own layout or nested table."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Table aria-label="Invoices with line items">
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-end">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableExpandableRow
                  colSpan={3}
                  detail={
                    <Table nested title="Line items">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-end">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Registration</TableCell>
                          <TableCell className="text-end tabular-nums">
                            $250.00
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TableExpandableRowTrigger label="INV001 details" />
                      INV001
                    </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell className="text-end tabular-nums">
                    $250.00
                  </TableCell>
                </TableExpandableRow>
              </TableBody>
            </Table>
            <Code
              variant="block"
              language="tsx"
              code={expandablePanelSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="expandable-sibling-rows"
          title="Sibling rows"
          description="Use sibling rows when expanded values must remain aligned with the parent columns."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Table aria-label="Invoices and instalments">
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-end">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableExpandableRow
                  colSpan={3}
                  detailLayout="sibling-rows"
                  detail={
                    <>
                      <TableRow>
                        <TableCell>INV002-A</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell className="text-end tabular-nums">
                          $75.00
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>INV002-B</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell className="text-end tabular-nums">
                          $75.00
                        </TableCell>
                      </TableRow>
                    </>
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TableExpandableRowTrigger label="INV002 instalments" />
                      INV002
                    </div>
                  </TableCell>
                  <TableCell>Part paid</TableCell>
                  <TableCell className="text-end tabular-nums">
                    $150.00
                  </TableCell>
                </TableExpandableRow>
              </TableBody>
            </Table>
            <Code
              variant="block"
              language="tsx"
              code={expandableSiblingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Keep simple tables semantic, readable and easy to scan."
        />
        <DocsDoDont
          doItems={[
            <>
              Give every table a <Code>TableCaption</Code> or accessible name.
            </>,
            <>Align numeric columns to the end and use tabular figures.</>,
            <>
              Use <Code>hoverable</Code> only when highlighting aids row
              scanning.
            </>,
          ]}
          dontItems={[
            <>Don’t make the entire row clickable.</>,
            <>Don’t use hover highlighting to imply interaction.</>,
            <>
              Don’t use Table when sorting, filters, pagination or row actions
              are required. Use{" "}
              <DocsPageLink to="/components/data-table">
                Data table
              </DocsPageLink>
              .
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Table."
        />
        <PageSubsectionHeader id="api-table" title="Table" />
        <DocsApiTable
          aria-label="Table properties"
          rows={[
            {
              name: "hoverable",
              type: "boolean",
              defaultValue: "false",
              description: "Highlights body rows to aid scanning.",
            },
            {
              name: "nested",
              type: "boolean",
              defaultValue: "false",
              description:
                "Uses the approved bordered presentation for a table inside detail content.",
            },
            {
              name: "title",
              type: "React.ReactNode",
              defaultValue: "—",
              description:
                "Names a nested table and connects the text automatically.",
            },
            {
              name: "description",
              type: "React.ReactNode",
              defaultValue: "—",
              description:
                "Adds supporting context to a nested table and connects it automatically.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-expandable-row"
          title="TableExpandableRow"
          className="mt-6"
        />
        <DocsApiTable
          aria-label="TableExpandableRow properties"
          rows={[
            {
              name: "colSpan",
              type: "number",
              defaultValue: "—",
              description:
                "Matches the number of columns occupied by the detail panel.",
            },
            {
              name: "detailLayout",
              type: '"panel" | "sibling-rows"',
              defaultValue: '"panel"',
              description:
                "Chooses a full-width detail panel or aligned table rows.",
            },
            {
              name: "detail",
              type: "React.ReactNode",
              defaultValue: "—",
              description:
                "Renders the subordinate content revealed by the trigger.",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              defaultValue: "false",
              description: "Sets the initial uncontrolled expanded state.",
            },
            {
              name: "open",
              type: "boolean",
              defaultValue: "—",
              description: "Controls the expanded state.",
            },
            {
              name: "onOpenChange",
              type: "(open: boolean) => void",
              defaultValue: "—",
              description: "Reports expanded state changes.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-expandable-trigger"
          title="TableExpandableRowTrigger"
          className="mt-6"
        />
        <DocsApiTable
          aria-label="TableExpandableRowTrigger properties"
          rows={[
            {
              name: "label",
              type: "string",
              defaultValue: '"row"',
              description:
                "Adds row context to the generated expand and collapse label.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              defaultValue: "Chevron",
              description: "Replaces the default disclosure icon.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-reference"
          title="API reference"
          className="mt-6"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/table">
                Shadcn Table documentation
              </DocsExternalLink>{" "}
              for the source composition.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a richer table when people need to work with the data."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/data-table">Data table</DocsPageLink>{" "}
            — for sorting, filters, pagination, row actions and expandable
            product data.
          </li>
          <li>
            <DocsPageLink to="/components/metric-card">
              Metric card
            </DocsPageLink>{" "}
            — for reporting surfaces that can contain a simple Table.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
