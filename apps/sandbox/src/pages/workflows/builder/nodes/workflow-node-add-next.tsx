import {
  NodeToolbar,
  Position,
  useNodeId,
  useReactFlow,
  useStore,
  type Align,
} from "@xyflow/react"
import { Plus } from "lucide-react"
import type { MouseEvent, PointerEvent } from "react"

import { Button } from "@gecko/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuEmpty,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import { cn } from "@gecko/ui/lib/utils"

import type { WorkflowNodeKind } from "../../workflows-data"
import {
  WORKFLOW_NODE_CATALOG_LIST,
  type WorkflowNodeCatalogEntry,
} from "../workflow-node-catalog"
import {
  createWorkflowNode,
  normalizeWorkflowEdge,
} from "../workflow-graph-types"

const NEW_NODE_OFFSET_Y = 112

function stopFlowPointerEvent(event: PointerEvent | MouseEvent) {
  event.stopPropagation()
}

type WorkflowNodeAddNextProps = {
  sourceHandle?: string | null
  align?: Align
}

function useSourceHandleConnected(
  nodeId: string | null,
  sourceHandle?: string | null,
) {
  return useStore((state) => {
    if (!nodeId) return false

    return state.edges.some((edge) => {
      if (edge.source !== nodeId) return false
      if (sourceHandle === undefined) return true
      return (edge.sourceHandle ?? null) === sourceHandle
    })
  })
}

function getHorizontalOffset(sourceHandle?: string | null) {
  if (sourceHandle === "yes") return -56
  if (sourceHandle === "no") return 56
  return 0
}

function NodeLibraryMenuItem({
  item,
  onSelect,
}: {
  item: WorkflowNodeCatalogEntry
  onSelect: (kind: WorkflowNodeKind) => void
}) {
  const Icon = item.icon

  return (
    <DropdownMenuItem
      searchValue={`${item.title} ${item.description}`}
      onClick={() => onSelect(item.kind)}
    >
      <Icon
        aria-hidden
        className={cn("size-4 shrink-0", item.iconClassName)}
      />
      <span className="flex min-w-0 flex-col items-start gap-0.5">
        <span className="font-medium leading-none">{item.title}</span>
        <span className="text-xs text-muted-foreground">{item.description}</span>
      </span>
    </DropdownMenuItem>
  )
}

export function WorkflowNodeAddNext({
  sourceHandle,
  align = "center",
}: WorkflowNodeAddNextProps) {
  const nodeId = useNodeId()
  const { getNode, setEdges, setNodes } = useReactFlow()
  const hasOutgoing = useSourceHandleConnected(nodeId, sourceHandle)

  if (!nodeId || hasOutgoing) return null

  const handleSelect = (kind: WorkflowNodeKind) => {
    const parent = getNode(nodeId)
    if (!parent) return

    const newNode = createWorkflowNode(kind, {
      x: parent.position.x + getHorizontalOffset(sourceHandle),
      y: parent.position.y + NEW_NODE_OFFSET_Y,
    })

    setNodes((nodes) => [
      ...nodes.map((node) => ({ ...node, selected: false })),
      { ...newNode, selected: true },
    ])
    setEdges((edges) => [
      ...edges,
      normalizeWorkflowEdge({
        id: crypto.randomUUID(),
        source: nodeId,
        target: newNode.id,
        sourceHandle: sourceHandle ?? null,
      }),
    ])
  }

  return (
    <NodeToolbar
      isVisible
      position={Position.Bottom}
      offset={6}
      align={align}
      className="nopan nodrag pointer-events-auto"
      style={{ pointerEvents: "all" }}
      onPointerDown={stopFlowPointerEvent}
      onMouseDown={stopFlowPointerEvent}
    >
      <div
        className="nopan nodrag flex flex-col items-center gap-1.5"
        onPointerDown={stopFlowPointerEvent}
        onMouseDown={stopFlowPointerEvent}
      >
        <div
          aria-hidden
          className="h-3 w-px border-l border-dashed border-border"
        />
        <DropdownMenu searchable searchPlaceholder="Search nodes">
          <DropdownMenuTrigger
            nativeButton={false}
            render={
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="nopan nodrag rounded-full bg-background"
                aria-label="Add node"
                onPointerDown={stopFlowPointerEvent}
                onMouseDown={stopFlowPointerEvent}
              >
                <Plus aria-hidden className="size-3.5" />
              </Button>
            }
          />
          <DropdownMenuContent
            align="center"
            className="min-w-64 max-h-72 overflow-y-auto"
          >
            {WORKFLOW_NODE_CATALOG_LIST.map((item) => (
              <NodeLibraryMenuItem
                key={item.kind}
                item={item}
                onSelect={handleSelect}
              />
            ))}
            <DropdownMenuEmpty>No nodes found.</DropdownMenuEmpty>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </NodeToolbar>
  )
}
