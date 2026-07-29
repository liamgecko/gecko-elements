import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@gecko/ui/components/accordion";
import { ShoppingCart } from "lucide-react";

import {
  currencyFormatter,
  getBasketTotal,
  type BasketLine,
} from "../lib/booking";
import { BasketLines } from "./basket-content";

type PinnedBasketProps = {
  lines: BasketLine[];
  onRemove: (lineId: string) => void;
};

export function PinnedBasket({ lines, onRemove }: PinnedBasketProps) {
  const total = getBasketTotal(lines);

  return (
    <div className="border-y py-4">
      <Accordion>
        <AccordionItem
          value="basket"
          className="rounded-sm border-b-0 bg-muted px-4"
        >
          <AccordionTrigger className="gap-3 py-4 hover:text-foreground">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background">
              <ShoppingCart aria-hidden className="size-4" />
            </span>
            <span className="min-w-0 flex-1 text-left font-semibold">
              Your basket
            </span>
            <span aria-live="polite" className="shrink-0 font-semibold">
              {currencyFormatter.format(total)}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <BasketLines
              lines={lines}
              emptyMessage="Your basket is empty. Choose a session above to add it."
              onRemove={onRemove}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
