import { Button } from "@gecko/ui/components/button";
import { Trash2 } from "lucide-react";

import { formatCost, type BasketLine } from "../lib/booking";

function BasketLineRow({
  line,
  nested = false,
  onRemove,
}: {
  line: BasketLine;
  nested?: boolean;
  onRemove?: (lineId: string) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className={nested ? "text-xs font-medium" : "text-sm font-medium"}>
          {line.name}
        </p>
        {line.description ? (
          <p className="text-xs text-muted-foreground">{line.description}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <p className="text-sm font-medium">{formatCost(line.cost)}</p>
        {onRemove ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label={`Remove ${line.name} from basket`}
            onClick={() => onRemove(line.id)}
          >
            <Trash2 />
            Remove
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function BasketLines({
  lines,
  emptyMessage,
  onRemove,
}: {
  lines: BasketLine[];
  emptyMessage: string;
  onRemove?: (lineId: string) => void;
}) {
  if (!lines.length) {
    return (
      <p className="text-pretty text-sm text-muted-foreground">{emptyMessage}</p>
    );
  }

  return (
    <div>
      {lines.map((line) => (
        <div
          key={line.id}
          className="border-b py-4 first:pt-0 last:border-b-0 last:pb-0"
        >
          <BasketLineRow line={line} onRemove={onRemove} />

          {line.lines?.length ? (
            <div className="mt-2">
              {line.lines.map((child) => (
                <div key={child.id} className="py-2">
                  <BasketLineRow line={child} nested onRemove={onRemove} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
