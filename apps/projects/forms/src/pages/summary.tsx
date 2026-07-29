import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@gecko/ui/components/button";
import { Card } from "@gecko/ui/components/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { FormShell } from "../components/form-shell";
import { chargeableItems, events } from "../data/event";
import {
  buildBasket,
  currencyFormatter,
  formatCost,
  getBasketTotal,
  type BasketLine,
  type BookingSummary,
} from "../lib/booking";

function BasketLineRow({ line, nested }: { line: BasketLine; nested?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className={nested ? "text-sm" : "text-sm font-medium"}>{line.name}</p>
        {line.description ? (
          <p className="text-xs text-muted-foreground">{line.description}</p>
        ) : null}
      </div>
      <p className="shrink-0 text-sm font-medium">
        {formatCost(line.cost)}
      </p>
    </div>
  );
}

export function SummaryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state as BookingSummary | null;

  if (!booking) {
    return <Navigate to="/" replace />;
  }

  const lines = buildBasket({ events, chargeableItems, booking });
  const total = getBasketTotal(lines);

  return (
    <FormShell>
      <Card className="rounded-xl p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-balance text-xl font-semibold">Your order</h1>
            <p className="text-pretty text-sm text-muted-foreground">
              Review your order before continuing to payment.
            </p>
          </div>

          <section
            aria-label="Order summary"
            className="rounded-sm bg-muted p-4"
          >
            <h2 className="text-sm font-semibold">Order summary</h2>

            {lines.length > 0 ? (
              <div className="mt-4">
                {lines.map((line) => (
                  <div
                    key={line.id}
                    className="border-b py-4 first:pt-0 last:border-b-0 last:pb-0"
                  >
                    <BasketLineRow line={line} />

                    {line.lines?.length ? (
                      <div className="mt-2">
                        {line.lines.map((child) => (
                          <div key={child.id} className="py-2">
                            <BasketLineRow line={child} nested />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Your order is empty.
              </p>
            )}

            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-sm font-medium">Total</span>
              <span className="text-lg font-semibold">
                {currencyFormatter.format(total)}
              </span>
            </div>
          </section>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft data-icon="inline-start" aria-hidden />
              Back
            </Button>
            <Button type="button">
              Proceed to Payment
              <ChevronRight data-icon="inline-end" aria-hidden />
            </Button>
          </div>
        </div>
      </Card>
    </FormShell>
  );
}
