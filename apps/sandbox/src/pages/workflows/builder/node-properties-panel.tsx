import * as React from "react"
import { CheckCheck, PanelRightClose, PanelRightOpen, Trash2, X } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@gecko/ui/components/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@gecko/ui/components/alert"
import { Button } from "@gecko/ui/components/button"
import { cn } from "@gecko/ui/lib/utils"

import type { WorkflowGraphNodeData } from "../workflows-data"
import { NodePropertiesFields } from "./node-properties-fields"
import { getNodeDisplayName, type WorkflowFlowNode } from "./workflow-graph-types"
import {
  hasNodePropertiesValidationErrors,
  validateNodeProperties,
} from "./validate-node-properties"

const PANEL_EASE = "cubic-bezier(0.32, 0.72, 0, 1)"
const PANEL_OPEN_MS = 420
const PANEL_CLOSE_MS = 320
const PANEL_WIDTH_OPEN = "18rem"
const PANEL_WIDTH_CLOSED = "11.25rem"

type NodePropertiesPanelProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  hasSelection: boolean
  selectedNode: WorkflowFlowNode | null
  isDisconnected?: boolean
  onNodeDataSave: (nodeId: string, data: WorkflowGraphNodeData) => void
  onNodePropertiesErrorChange: (nodeId: string, hasError: boolean) => void
  onDeleteNode: (nodeId: string) => void
}

export function NodePropertiesPanel({
  open,
  onOpenChange,
  hasSelection,
  selectedNode,
  isDisconnected = false,
  onNodeDataSave,
  onNodePropertiesErrorChange,
  onDeleteNode,
}: NodePropertiesPanelProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [draftData, setDraftData] = React.useState<WorkflowGraphNodeData | null>(
    null,
  )
  const [showValidation, setShowValidation] = React.useState(false)
  const editingRef = React.useRef<{
    id: string
    data: WorkflowGraphNodeData
  } | null>(null)

  React.useEffect(() => {
    if (selectedNode && draftData) {
      editingRef.current = { id: selectedNode.id, data: draftData }
    }
  }, [draftData, selectedNode])

  React.useEffect(() => {
    const currentId = selectedNode?.id ?? null

    return () => {
      const editing = editingRef.current
      if (!editing || !currentId || editing.id !== currentId) return

      onNodePropertiesErrorChange(
        editing.id,
        hasNodePropertiesValidationErrors(
          validateNodeProperties(editing.data),
        ),
      )
    }
  }, [onNodePropertiesErrorChange, selectedNode?.id])

  React.useEffect(() => {
    if (!selectedNode) {
      setDraftData(null)
      return
    }

    setDraftData({ ...selectedNode.data })
    setShowValidation(Boolean(selectedNode.data.hasPropertiesError))
  }, [selectedNode?.id])

  const draftNode = React.useMemo(() => {
    if (!selectedNode || !draftData) return null
    return { ...selectedNode, data: draftData }
  }, [draftData, selectedNode])

  const validationErrors = React.useMemo(() => {
    if (!showValidation || !draftData) return {}
    return validateNodeProperties(draftData)
  }, [draftData, showValidation])

  const nodeDisplayName = draftNode
    ? getNodeDisplayName(draftNode.data)
    : selectedNode
      ? getNodeDisplayName(selectedNode.data)
      : ""

  const handleDraftChange = React.useCallback(
    (nodeId: string, patch: Partial<WorkflowGraphNodeData>) => {
      if (!selectedNode || nodeId !== selectedNode.id) return

      setDraftData((current) =>
        current ? { ...current, ...patch } : current,
      )
    },
    [selectedNode],
  )

  React.useEffect(() => {
    if (!selectedNode || !draftData || !showValidation) return

    onNodePropertiesErrorChange(
      selectedNode.id,
      hasNodePropertiesValidationErrors(validateNodeProperties(draftData)),
    )
  }, [
    draftData,
    onNodePropertiesErrorChange,
    selectedNode?.id,
    showValidation,
  ])

  const handleSaveNode = () => {
    if (!selectedNode || !draftData) return

    const errors = validateNodeProperties(draftData)
    if (hasNodePropertiesValidationErrors(errors)) {
      setShowValidation(true)
      onNodePropertiesErrorChange(selectedNode.id, true)
      return
    }

    setShowValidation(false)
    onNodeDataSave(selectedNode.id, {
      ...draftData,
      hasPropertiesError: false,
    })
    toast.success(`${nodeDisplayName} updated`)
  }

  const handleConfirmDelete = () => {
    if (!selectedNode) return
    onDeleteNode(selectedNode.id)
    setDeleteDialogOpen(false)
  }

  return (
    <>
      <div className="pointer-events-none absolute inset-4 z-10 flex items-start justify-end">
        <div
          className={cn(
            "pointer-events-auto flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-md motion-reduce:transition-none",
            open ? "max-h-full" : "max-h-[3.25rem]",
          )}
          style={{
            width: open ? PANEL_WIDTH_OPEN : PANEL_WIDTH_CLOSED,
            transition: `max-height ${open ? PANEL_OPEN_MS : PANEL_CLOSE_MS}ms ${PANEL_EASE}, width ${open ? PANEL_OPEN_MS : PANEL_CLOSE_MS}ms ${PANEL_EASE}`,
          }}
        >
          <div
            className={cn(
              "flex shrink-0 items-center justify-between gap-2 border-b p-3 motion-reduce:transition-none",
              open ? "border-border" : "border-transparent",
            )}
            style={{
              transition: `border-color ${open ? PANEL_OPEN_MS : PANEL_CLOSE_MS}ms ${PANEL_EASE}`,
            }}
          >
            <p className="truncate text-sm font-semibold whitespace-nowrap">
              Properties
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="aria-expanded:bg-transparent aria-expanded:text-foreground aria-expanded:hover:bg-muted"
              aria-label={open ? "Collapse properties" : "Open properties"}
              aria-expanded={open}
              disabled={!hasSelection}
              onClick={() => onOpenChange(!open)}
            >
              {open ? (
                <PanelRightClose aria-hidden className="size-4" />
              ) : (
                <PanelRightOpen aria-hidden className="size-4" />
              )}
            </Button>
          </div>
          <div
            className={cn(
              "grid min-h-0 motion-reduce:transition-none",
              open ? "flex-1 grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
            style={{
              transition: `grid-template-rows ${open ? PANEL_OPEN_MS : PANEL_CLOSE_MS}ms ${PANEL_EASE}`,
            }}
          >
            <div className="flex min-h-0 flex-col overflow-hidden">
              <div
                className={cn(
                  "min-h-0 flex-1 overflow-y-auto motion-reduce:transition-none",
                  open
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0",
                )}
                style={{
                  transition: `opacity ${open ? 280 : 160}ms ${PANEL_EASE}`,
                  transitionDelay: open ? "80ms" : "0ms",
                }}
              >
                {isDisconnected ? (
                  <div className="border-b border-border p-3">
                    <Alert variant="destructive" icon className="px-3 py-2.5">
                      <AlertTitle className="text-xs">
                        Node not connected
                      </AlertTitle>
                      <AlertDescription className="text-xs">
                        Connect this node to the workflow to continue.
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : null}
                {draftNode ? (
                  <NodePropertiesFields
                    node={draftNode}
                    onNodeDataChange={handleDraftChange}
                    errors={validationErrors}
                    showValidation={showValidation}
                  />
                ) : null}
              </div>
              {selectedNode ? (
                <div
                  className={cn(
                    "mt-auto flex shrink-0 flex-col gap-2 border-t border-border p-3 motion-reduce:transition-none",
                    open
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0",
                  )}
                  style={{
                    transition: `opacity ${open ? 280 : 160}ms ${PANEL_EASE}`,
                    transitionDelay: open ? "80ms" : "0ms",
                  }}
                >
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost-destructive"
                      size="sm"
                      onClick={() => setDeleteDialogOpen(true)}
                    >
                      <Trash2 data-icon="inline-start" aria-hidden />
                      Delete node
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleSaveNode}
                    >
                      <CheckCheck data-icon="inline-start" aria-hidden />
                      Save node
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete node?</AlertDialogTitle>
            <AlertDialogDescription>
              {`${nodeDisplayName} will be removed from this workflow. This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <X aria-hidden />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              <Trash2 aria-hidden />
              Delete node
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
