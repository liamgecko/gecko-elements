import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, X } from "lucide-react";
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
import {
  DataTableContent,
  DataTableProvider,
} from "@gecko/ui/components/data-table/data-table";
import { DataTableColumnToggle } from "@gecko/ui/components/data-table/data-table-column-toggle";
import { DataTableFilters } from "@gecko/ui/components/data-table/data-table-filters";
import { DataTablePagination } from "@gecko/ui/components/data-table/data-table-pagination";
import { DataTableSearch } from "@gecko/ui/components/data-table/data-table-search";
import { DataTableSelectActions } from "@gecko/ui/components/data-table/data-table-select-actions";
import {
  DataTableToolbar,
  DataTableToolbarGroup,
  DataTableToolbarSearchRow,
} from "@gecko/ui/components/data-table/data-table-toolbar";
import { TooltipProvider } from "@gecko/ui/components/tooltip";

import { SupabaseSetupNotice } from "@/components/supabase-setup-notice";
import { DataTablePageSkeleton } from "@/components/data-table-page-skeleton";
import { workflowsRepository } from "@/data/repositories/workflowsRepository";
import { useWorkflows } from "@/hooks/useWorkflows";

import { createWorkflowColumns } from "./workflows-columns";
import { WorkflowsEmpty } from "./workflows-empty";
import {
  createWorkflowFilterCategories,
  workflowRowActions,
  workflowSelectActions,
  getWorkflowPath,
  type Workflow,
} from "./workflows-data";

export default function WorkflowsPage() {
  const navigate = useNavigate();
  const {
    workflows,
    loading,
    configured,
    refetch,
    patchWorkflow,
    patchWorkflows,
    removeWorkflows,
  } = useWorkflows();

  const [workflowsToDelete, setWorkflowsToDelete] = React.useState<
    Workflow[] | null
  >(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const filterCategories = React.useMemo(
    () => createWorkflowFilterCategories(workflows),
    [workflows],
  );

  const workflowsRef = React.useRef(workflows);
  workflowsRef.current = workflows;

  const handleEnabledChange = React.useCallback(
    (workflowId: string, enabled: boolean) => {
      const workflow = workflowsRef.current.find(
        (item) => item.id === workflowId,
      );
      const previousEnabled = workflow?.enabled;

      patchWorkflow(workflowId, { enabled });

      void (async () => {
        try {
          await workflowsRepository.updateWorkflowEnabled(workflowId, enabled);
          if (workflow) {
            toast.add({
              title: enabled
                ? `${workflow.name} enabled`
                : `${workflow.name} disabled`,
              type: "success",
            });
          }
        } catch (err) {
          if (previousEnabled != null) {
            patchWorkflow(workflowId, { enabled: previousEnabled });
          } else {
            refetch();
          }
          toast.add({
            title:
              err instanceof Error
                ? err.message
                : "Failed to update workflow status",
            type: "error",
          });
        }
      })();
    },
    [patchWorkflow, refetch],
  );

  const columns = React.useMemo(
    () => createWorkflowColumns({ onEnabledChange: handleEnabledChange }),
    [handleEnabledChange],
  );

  const deleteDescription = React.useMemo(() => {
    if (!workflowsToDelete?.length) return null;

    if (workflowsToDelete.length === 1) {
      return `${workflowsToDelete[0].name} will be permanently removed. This action cannot be undone.`;
    }

    return `${workflowsToDelete.length} workflows will be permanently removed. This action cannot be undone.`;
  }, [workflowsToDelete]);

  const confirmDelete = async () => {
    if (!workflowsToDelete?.length) return;

    setIsDeleting(true);

    const ids = workflowsToDelete.map((workflow) => workflow.id);

    removeWorkflows(ids);

    try {
      await workflowsRepository.deleteWorkflows(ids);
      toast.add({
        title:
          workflowsToDelete.length === 1
            ? "Workflow deleted successfully"
            : `${workflowsToDelete.length} workflows deleted successfully`,
        type: "success",
      });
      setWorkflowsToDelete(null);
    } catch (err) {
      refetch();
      toast.add({
        title:
          err instanceof Error ? err.message : "Failed to delete workflows",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!configured) {
    return <SupabaseSetupNotice />;
  }

  if (loading) {
    return <DataTablePageSkeleton columnCount={5} />;
  }

  if (workflows.length === 0) {
    return <WorkflowsEmpty />;
  }

  return (
    <TooltipProvider>
      <DataTableProvider
        columns={columns}
        data={workflows}
        rowSelection
        rowActions={workflowRowActions}
        onRowAction={(actionId, { original }) => {
          if (actionId === "edit") {
            navigate(getWorkflowPath(original.id), {
              state: { workflowName: original.name },
            });
            return;
          }

          if (actionId === "clone") {
            toast.add({ title: `Cloned ${original.name}`, type: "success" });
            return;
          }

          if (actionId === "delete") {
            setWorkflowsToDelete([original]);
          }
        }}
        selectActions={workflowSelectActions}
        onSelectAction={(actionId, { selectedRows }) => {
          const selected = selectedRows.map((row) => row.original);

          if (actionId === "enable" || actionId === "disable") {
            const enabled = actionId === "enable";
            const ids = selected.map((workflow) => workflow.id);
            const previous = new Map(
              selected.map((workflow) => [workflow.id, workflow.enabled]),
            );

            patchWorkflows(ids, { enabled });

            void (async () => {
              try {
                await workflowsRepository.updateWorkflowsEnabled(ids, enabled);
                toast.add({
                  title:
                    selected.length === 1
                      ? enabled
                        ? "Workflow enabled"
                        : "Workflow disabled"
                      : enabled
                        ? `${selected.length} workflows enabled`
                        : `${selected.length} workflows disabled`,
                  type: "success",
                });
              } catch (err) {
                for (const [workflowId, wasEnabled] of previous) {
                  patchWorkflow(workflowId, { enabled: wasEnabled });
                }
                toast.add({
                  title:
                    err instanceof Error
                      ? err.message
                      : "Failed to update workflow statuses",
                  type: "error",
                });
              }
            })();
            return;
          }

          if (actionId === "delete") {
            setWorkflowsToDelete(selected);
          }
        }}
        sorting
        getRowId={(row) => row.id}
        initialState={{
          columnVisibility: {
            createdByUserId: false,
            labels: false,
          },
        }}
      >
        <div className="flex flex-col gap-4">
          <DataTableToolbar>
            <DataTableToolbarSearchRow>
              <DataTableSearch placeholder="Search workflows" />
              <DataTableFilters
                categories={filterCategories}
                triggerLabel="Filter"
              />
            </DataTableToolbarSearchRow>
            <DataTableToolbarGroup>
              <DataTableSelectActions />
              <DataTableColumnToggle />
            </DataTableToolbarGroup>
          </DataTableToolbar>
          <DataTableContent />
          <DataTablePagination />
        </div>
      </DataTableProvider>

      <AlertDialog
        open={workflowsToDelete != null}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setWorkflowsToDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {workflowsToDelete?.length === 1
                ? "Delete workflow?"
                : `Delete ${workflowsToDelete?.length ?? 0} workflows?`}
            </AlertDialogTitle>
            <AlertDialogDescription>{deleteDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              <X aria-hidden />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => void confirmDelete()}
              disabled={isDeleting}
            >
              <Trash2 aria-hidden />
              Delete workflow
              {workflowsToDelete && workflowsToDelete.length > 1 ? "s" : ""}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
