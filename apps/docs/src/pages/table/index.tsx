
import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@gecko/ui/components/code"
import { PageSection } from "@/components/layout/page-section"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@gecko/ui/components/table"

export function TablePage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Table</h1>
          <p className="text-sm text-muted-foreground">
            A semantic table built from table primitives for structured data.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code>
              Table
            </Code>{" "}
            with header, body, and footer primitives to render structured tabular
            data.
          </p>
          <ComponentExample>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>INV002</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell>$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>INV003</TableCell>
                  <TableCell>Unpaid</TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell>$350.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ComponentExample>
        </PageSection>

        <PageSection id="footer" label="Footer">
          <h2 className="text-lg font-semibold">Footer</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code>
              TableFooter
            </Code>{" "}
            to summarize totals or other aggregate information at the bottom of
            the table.
          </p>
          <ComponentExample>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>INV002</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell>$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>INV003</TableCell>
                  <TableCell>Unpaid</TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell>$350.00</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell>$750.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </ComponentExample>
        </PageSection>

        <PageSection id="hoverable" label="Hoverable rows">
          <h2 className="text-lg font-semibold">Hoverable rows</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Rows do not highlight on hover by default. Pass the{" "}
            <Code>
              hoverable
            </Code>{" "}
            prop to{" "}
            <Code>
              Table
            </Code>{" "}
            (or individual{" "}
            <Code>
              TableRow
            </Code>
            ) to enable hover styles.
          </p>
          <ComponentExample>
            <Table hoverable>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>INV002</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell>$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>INV003</TableCell>
                  <TableCell>Unpaid</TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell>$350.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
