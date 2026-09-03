import * as React from "react";
import { ArchiveRestore, X } from "lucide-react";
import { toast } from "@gecko/ui/components/toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@gecko/ui/components/alert-dialog";
import { DataTable } from "@gecko/ui/components/data-table/data-table";
import { TooltipProvider } from "@gecko/ui/components/tooltip";

import {
  DataLoadErrorAlert,
  SupabaseSetupNotice,
} from "@/components/supabase-setup-notice";
import { DataTablePageSkeleton } from "@/components/data-table-page-skeleton";
import { formsRepository } from "@/data/repositories/formsRepository";
import { useArchivedForms } from "@/hooks/useArchivedForms";

import { archivedFormColumns } from "./archived-forms-columns";
import {
  archivedFormRowActions,
  createFormFilterCategories,
  type Form,
} from "./forms-data";

export default function ArchivedFormsPage() {
  const { forms, groupNames, loading, error, configured, refetch } =
    useArchivedForms();
  const [formToRestore, setFormToRestore] = React.useState<Form | null>(null);
  const [isRestoring, setIsRestoring] = React.useState(false);

  const filterCategories = React.useMemo(
    () => createFormFilterCategories(groupNames, { includeStatus: false }),
    [groupNames],
  );

  const handleRestoreDialogOpenChange = (open: boolean) => {
    if (!open && !isRestoring) {
      setFormToRestore(null);
    }
  };

  const confirmRestore = async () => {
    if (!formToRestore) return;

    setIsRestoring(true);

    try {
      await formsRepository.restoreForm(formToRestore.id);
      toast.add({ title: "Form restored successfully", type: "success" });
      setFormToRestore(null);
      refetch();
    } catch (err) {
      toast.add({
        title: err instanceof Error ? err.message : "Failed to restore form",
        type: "error",
      });
    } finally {
      setIsRestoring(false);
    }
  };

  if (!configured) {
    return (
      <div className="space-y-4">
        <SupabaseSetupNotice />
      </div>
    );
  }

  if (loading) {
    return <DataTablePageSkeleton columnCount={4} />;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <DataLoadErrorAlert
          title="Could not load archived forms"
          message={error}
        />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <DataTable
        columns={archivedFormColumns}
        data={forms}
        rowActions={archivedFormRowActions}
        onRowAction={(actionId, { original }) => {
          if (actionId === "restore") {
            setFormToRestore(original);
          }
        }}
        sorting
        pagination
        toolbar={{
          search: { placeholder: "Search archived forms" },
          filters: {
            categories: filterCategories,
            triggerLabel: "Filter",
          },
          columnToggle: true,
        }}
        initialState={{
          columnVisibility: {
            status: false,
            group: false,
          },
        }}
        getRowId={(row) => row.id}
      />

      <AlertDialog
        open={formToRestore != null}
        onOpenChange={handleRestoreDialogOpenChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore form?</AlertDialogTitle>
            <AlertDialogDescription>
              {formToRestore
                ? `${formToRestore.name} will be moved back to your forms list.`
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRestoring}>
              <X aria-hidden />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void confirmRestore()}
              disabled={isRestoring}
            >
              <ArchiveRestore aria-hidden />
              Restore form
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
