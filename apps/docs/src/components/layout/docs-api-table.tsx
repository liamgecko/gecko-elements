import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@gecko/ui/components/table";
import { Code } from "@gecko/ui/components/code";

export type DocsApiRow = {
  name: string;
  type: string;
  defaultValue?: string;
  description: React.ReactNode;
};

export function DocsApiTable({
  rows,
  "aria-label": ariaLabel = "Component API properties",
}: {
  rows: DocsApiRow[];
  "aria-label"?: string;
}) {
  return (
    <Table nested aria-label={ariaLabel}>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>
              <Code>{row.name}</Code>
            </TableCell>
            <TableCell className="whitespace-normal font-mono text-xs text-muted-foreground">
              {row.type}
            </TableCell>
            <TableCell>
              {row.defaultValue ? (
                <Code>{row.defaultValue}</Code>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>
            <TableCell className="whitespace-normal text-sm text-muted-foreground">
              {row.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
