import * as React from "react";

import { Button } from "@gecko/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@gecko/ui/components/collapsible";
import { ChevronDown, ShoppingCart } from "lucide-react";

import {
  currencyFormatter,
  getBasketTotal,
  type BasketLine,
} from "../lib/booking";
import { BasketLines } from "./basket-content";

type FloatingBasketProps = {
  lines: BasketLine[];
  onRemove: (lineId: string) => void;
};

export function FloatingBasket({ lines, onRemove }: FloatingBasketProps) {
  const [open, setOpen] = React.useState(false);
  const total = getBasketTotal(lines);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-xl bg-background shadow-lg ring-1 ring-black/5"
    >
      <CollapsibleContent className="rounded-t-xl border-b bg-background">
        <div className="max-h-72 overflow-y-auto p-4">
          <BasketLines
            lines={lines}
            emptyMessage="Your basket is empty. Choose a session above to add it."
            onRemove={onRemove}
          />
        </div>
      </CollapsibleContent>

      <div className="flex min-h-16 items-center gap-3 p-3">
        <div className="flex">
          <ShoppingCart aria-hidden className="size-5" />
        </div>
        <h2 className="min-w-0 flex-1 text-balance text-sm font-medium">
          Your basket
        </h2>
        <span aria-live="polite" className="shrink-0 font-semibold">
          {currencyFormatter.format(total)}
        </span>
        <CollapsibleTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={open ? "Hide basket" : "View basket"}
            />
          }
        >
          <ChevronDown
            aria-hidden
            className={open ? "rotate-180" : undefined}
          />
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
}
