import { Switch } from "@gecko/ui/components/switch";

import { useBooking } from "../state/booking";
import { FloatingBasket } from "./floating-basket";

export function BasketOptions() {
  const {
    basketMode,
    setBasketMode,
    basketLines,
    removeBasketLine,
  } = useBooking();

  return (
    <>
      {basketMode === "floating" ? (
        <FloatingBasket lines={basketLines} onRemove={removeBasketLine} />
      ) : null}

      <div className="fixed bottom-24 right-4 z-50 flex min-h-10 items-center gap-2 rounded-lg bg-background px-3 shadow-md ring-1 ring-black/5">
        <span className="text-xs font-medium">Option 1</span>
        <Switch
          checked={basketMode === "floating"}
          aria-label="Toggle basket design"
          onCheckedChange={(checked) =>
            setBasketMode(checked ? "floating" : "pinned")
          }
        />
        <span className="text-xs font-medium">Option 2</span>
      </div>
    </>
  );
}
