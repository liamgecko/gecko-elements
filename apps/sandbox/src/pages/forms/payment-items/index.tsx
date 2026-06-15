import { DataTable } from "@gecko/ui/components/data-table/data-table"
import { TooltipProvider } from "@gecko/ui/components/tooltip"

import { paymentItemColumns } from "./payment-items-columns"
import {
  paymentItemFilterCategories,
  paymentItemRowActions,
  paymentItems,
} from "./payment-items-data"

export default function FormsPaymentItemsPage() {
  return (
    <TooltipProvider>
      <DataTable
        columns={paymentItemColumns}
        data={paymentItems}
        rowSelection
        rowActions={paymentItemRowActions}
        sorting
        pagination
        toolbar={{
          search: { placeholder: "Search payment items" },
          filters: {
            categories: paymentItemFilterCategories,
            triggerLabel: "Filter",
          },
          columnToggle: true,
        }}
        getRowId={(row) => row.id}
      />
    </TooltipProvider>
  )
}
