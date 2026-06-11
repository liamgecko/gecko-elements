import { useNavigate } from "react-router-dom"

import { DataTable } from "@gecko/ui/components/data-table/data-table"
import { TooltipProvider } from "@gecko/ui/components/tooltip"

import { formColumns } from "./forms-columns"
import {
  formFilterCategories,
  formRowActions,
  formSelectActions,
  forms,
  getFormPath,
} from "./forms-data"

export default function FormsFormsPage() {
  const navigate = useNavigate()

  return (
    <TooltipProvider>
      <DataTable
        columns={formColumns}
        data={forms}
        rowSelection
        rowActions={formRowActions}
        onRowAction={(actionId, { original }) => {
          if (actionId === "edit") {
            navigate(getFormPath(original.id))
          }
        }}
        selectActions={formSelectActions}
        sorting
        pagination
        toolbar={{
          search: { placeholder: "Search forms" },
          filters: {
            categories: formFilterCategories,
            triggerLabel: "Filter",
          },
          selectActions: true,
          columnToggle: true,
        }}
        initialState={{
          columnVisibility: {
            group: false,
          },
        }}
        getRowId={(row) => row.id}
      />
    </TooltipProvider>
  )
}
