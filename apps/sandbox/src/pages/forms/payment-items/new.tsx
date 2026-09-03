import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@gecko/ui/components/toast";

import { SupabaseSetupNotice } from "@/components/supabase-setup-notice";
import { paymentItemsRepository } from "@/data/repositories/paymentItemsRepository";
import { isSupabaseConfigured } from "@/lib/supabase/env";

import { PaymentItemForm } from "./payment-item-form";

export default function CreatePaymentItemPage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = React.useState(false);
  const configured = isSupabaseConfigured();

  if (!configured) {
    return (
      <div className="w-full max-w-2xl space-y-4">
        <SupabaseSetupNotice />
      </div>
    );
  }

  return (
    <PaymentItemForm
      title="Create new chargeable item"
      submitLabel="Save chargeable item"
      isSaving={isSaving}
      onSubmit={async (values) => {
        setIsSaving(true);
        try {
          await paymentItemsRepository.createPaymentItem({
            name: values.name,
            internalName: values.internalName.trim() || null,
            amount: values.amount,
            currency: values.currency,
            provider: values.provider,
            minQuantity: values.minQuantity,
            maxQuantity: values.maxQuantity,
            availableQuantity: values.availableQuantity,
          });
          toast.add({
            title: "Chargeable item created successfully",
            type: "success",
          });
          navigate("/forms/chargeable-items");
        } catch (err) {
          toast.add({
            title:
              err instanceof Error
                ? err.message
                : "Failed to create chargeable item",
            type: "error",
          });
        } finally {
          setIsSaving(false);
        }
      }}
    />
  );
}
