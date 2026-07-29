import { Navigate, useNavigate } from "react-router-dom";

import { Button } from "@gecko/ui/components/button";
import { Card } from "@gecko/ui/components/card";
import { ChevronLeft, ShoppingCart } from "lucide-react";

import { BasketLines } from "../components/basket-content";
import { FormShell } from "../components/form-shell";
import { chargeableItems, events } from "../data/event";
import {
  buildBasket,
  currencyFormatter,
  getBasketTotal,
} from "../lib/booking";
import { useBooking } from "../state/booking";

export function SummaryPage() {
  const navigate = useNavigate();
  const { booking, submitted } = useBooking();

  if (!submitted) {
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

            <div className="mt-4">
              <BasketLines lines={lines} emptyMessage="Your order is empty." />
            </div>

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
              onClick={() => navigate("/")}
            >
              <ChevronLeft data-icon="inline-start" aria-hidden />
              Previous
            </Button>
            <Button type="button">
              <ShoppingCart data-icon="inline-start" aria-hidden />
              Proceed to Payment
            </Button>
          </div>
        </div>
      </Card>
    </FormShell>
  );
}
