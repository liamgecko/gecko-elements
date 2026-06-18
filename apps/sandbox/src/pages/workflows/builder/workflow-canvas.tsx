import * as React from "react"
import {
  Background,
  ConnectionLineType,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type OnSelectionChangeParams,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import type {
  WorkflowDefinition,
  WorkflowGraphNodeData,
  WorkflowNodeKind,
} from "../workflows-data"
import { cn } from "@gecko/ui/lib/utils"
import { Spinner } from "@gecko/ui/components/spinner"
import { NodePalettePanel } from "./node-palette-panel"
import { NodePropertiesPanel } from "./node-properties-panel"
import { WorkflowCanvasEmpty } from "./workflow-canvas-empty"
import { AgentCursor, type AgentCursorHandle } from "./agent-cursor/agent-cursor"
import { playAdmissionsWorkflowBuild } from "./workflow-agent-player"
import { workflowNodeTypes } from "./node-types"
import {
  WORKFLOW_DRAG_MIME,
  WORKFLOW_DEFAULT_EDGE_OPTIONS,
  createWorkflowNode,
  getCenteredNodePosition,
  normalizeWorkflowEdge,
  normalizeWorkflowFlowNode,
  type WorkflowFlowNode,
} from "./workflow-graph-types"

export type WorkflowCanvasRef = {
  getDefinition: () => WorkflowDefinition
}

type WorkflowCanvasProps = {
  initialDefinition?: WorkflowDefinition | null
  variant?: "workflow" | "template"
  loading?: boolean
}

const DRAG_HIGHLIGHT_EASE = "cubic-bezier(0.32, 0.72, 0, 1)"
const DRAG_HIGHLIGHT_FADE_IN_MS = 200
const DRAG_HIGHLIGHT_FADE_OUT_MS = 160

function definitionToFlowState(definition: WorkflowDefinition | null | undefined) {
  if (!definition) {
    return { nodes: [] as WorkflowFlowNode[], edges: [] as Edge[] }
  }

  return {
    nodes: definition.nodes.map((node) =>
      normalizeWorkflowFlowNode(node as WorkflowFlowNode),
    ),
    edges: definition.edges.map((edge) =>
      normalizeWorkflowEdge(edge as Edge),
    ),
  }
}

function WorkflowCanvasInner(
  { initialDefinition, variant = "workflow", loading = false }: WorkflowCanvasProps,
  ref: React.Ref<WorkflowCanvasRef>,
) {
  const initial = React.useMemo(
    () => definitionToFlowState(initialDefinition),
    [initialDefinition],
  )
  const [nodes, setNodes, onNodesChange] = useNodesState(initial.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initial.edges)
  const [propertiesOpen, setPropertiesOpen] = React.useState(false)
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null)
  const [isPaletteDragging, setIsPaletteDragging] = React.useState(false)
  const [isPaletteDragOver, setIsPaletteDragOver] = React.useState(false)
  const [agentBuilding, setAgentBuilding] = React.useState(false)
  const agentCursorRef = React.useRef<AgentCursorHandle>(null)
  const { screenToFlowPosition, fitView } = useReactFlow()

  const isPaletteDrag = React.useCallback((event: React.DragEvent) => {
    return event.dataTransfer.types.includes(WORKFLOW_DRAG_MIME)
  }, [])

  const hasNodeSelection = selectedNodeId != null

  const selectedNode = React.useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  )

  const onNodeDataSave = React.useCallback(
    (nodeId: string, data: WorkflowGraphNodeData) => {
      setNodes((current) =>
        current.map((node) =>
          node.id === nodeId ? { ...node, data } : node,
        ),
      )
    },
    [setNodes],
  )

  const onDeleteNode = React.useCallback(
    (nodeId: string) => {
      setNodes((current) => current.filter((node) => node.id !== nodeId))
      setEdges((current) =>
        current.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId,
        ),
      )
      setSelectedNodeId(null)
      setPropertiesOpen(false)
    },
    [setEdges, setNodes],
  )

  const onSelectionChange = React.useCallback(
    ({ nodes: selectedNodes }: OnSelectionChangeParams) => {
      const nextSelectedId = selectedNodes[0]?.id ?? null
      setSelectedNodeId(nextSelectedId)

      if (nextSelectedId) {
        setPropertiesOpen(true)
      } else {
        setPropertiesOpen(false)
      }
    },
    [],
  )

  React.useImperativeHandle(ref, () => ({
    getDefinition: () => ({
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type ?? "default",
        position: node.position,
        data: node.data,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
      })),
    }),
  }))

  React.useLayoutEffect(() => {
    if (loading) return

    const next = definitionToFlowState(initialDefinition)
    setNodes(next.nodes)
    setEdges(next.edges)
  }, [initialDefinition, loading, setEdges, setNodes])

  const onConnect = React.useCallback(
    (connection: Connection) => {
      setEdges((current) =>
        addEdge({ ...connection, ...WORKFLOW_DEFAULT_EDGE_OPTIONS }, current),
      )
    },
    [setEdges],
  )

  const onDragOver = React.useCallback(
    (event: React.DragEvent) => {
      if (!isPaletteDrag(event)) return

      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
      setIsPaletteDragOver(true)
    },
    [isPaletteDrag],
  )

  const onDragLeave = React.useCallback(
    (event: React.DragEvent) => {
      if (!isPaletteDrag(event)) return
      setIsPaletteDragOver(false)
    },
    [isPaletteDrag],
  )

  const onDrop = React.useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      setIsPaletteDragOver(false)
      setIsPaletteDragging(false)

      const kind = event.dataTransfer.getData(
        WORKFLOW_DRAG_MIME,
      ) as WorkflowNodeKind

      if (!kind) return

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const newNode = createWorkflowNode(kind, position)
      setNodes((current) => [
        ...current.map((node) => ({ ...node, selected: false })),
        { ...newNode, selected: true },
      ])
      setSelectedNodeId(newNode.id)
      setPropertiesOpen(true)
    },
    [screenToFlowPosition, setNodes],
  )

  const insertTriggerNode = React.useCallback(() => {
    const pane = canvasRef.current?.querySelector(".react-flow__pane")
    const bounds =
      pane?.getBoundingClientRect() ??
      canvasRef.current?.getBoundingClientRect()
    if (!bounds) return

    const center = screenToFlowPosition({
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    })

    const newNode = createWorkflowNode(
      "trigger",
      getCenteredNodePosition(center),
    )
    setNodes([{ ...newNode, selected: true }])
    setSelectedNodeId(newNode.id)
    setPropertiesOpen(true)
  }, [screenToFlowPosition, setNodes])

  const canvasRef = React.useRef<HTMLDivElement>(null)

  const getCanvasCenter = React.useCallback(() => {
    const pane = canvasRef.current?.querySelector(".react-flow__pane")
    const bounds =
      pane?.getBoundingClientRect() ??
      canvasRef.current?.getBoundingClientRect()
    if (!bounds) return { x: 0, y: 0 }

    return screenToFlowPosition({
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    })
  }, [screenToFlowPosition])

  const handleDescribeWorkflow = React.useCallback(async () => {
    if (agentBuilding) return

    setAgentBuilding(true)

    try {
      await playAdmissionsWorkflowBuild({
        cursor: agentCursorRef,
        getCanvasCenter,
        setNodes,
        setEdges,
        setSelectedNodeId,
        setPropertiesOpen,
        fitView,
      })
    } finally {
      setAgentBuilding(false)
    }
  }, [
    agentBuilding,
    fitView,
    getCanvasCenter,
    setEdges,
    setNodes,
  ])

  return (
    <div
      ref={canvasRef}
      className={cn(
        "relative min-h-0 h-full flex-1",
        isPaletteDragging && "cursor-grabbing",
        agentBuilding && "cursor-none",
      )}
    >
      <AgentCursor ref={agentCursorRef} visible={agentBuilding} />
      {agentBuilding ? (
        <div className="pointer-events-none absolute inset-x-4 top-4 z-[60] flex justify-center">
          <div className="rounded-full border border-border bg-card/95 px-4 py-2 text-sm font-medium shadow-md backdrop-blur-sm">
            Building your workflow…
          </div>
        </div>
      ) : null}
      <div
        className={cn(
          "relative min-h-0 h-full w-full",
          agentBuilding && "pointer-events-none",
        )}
      >
        <ReactFlow
          className={cn(
            "h-full w-full",
            "[&_.react-flow__node.selectable.selected]:shadow-none",
            isPaletteDragging &&
              "[&_.react-flow__pane]:cursor-grabbing [&_.react-flow__viewport]:cursor-grabbing",
          )}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onSelectionChange={onSelectionChange}
          nodeTypes={workflowNodeTypes}
          defaultEdgeOptions={WORKFLOW_DEFAULT_EDGE_OPTIONS}
          connectionLineType={ConnectionLineType.SmoothStep}
          connectionLineStyle={WORKFLOW_DEFAULT_EDGE_OPTIONS.style}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={16} size={1} />
        </ReactFlow>
        {isPaletteDragging ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-primary/2 motion-reduce:transition-none"
            style={{
              opacity: isPaletteDragOver ? 1 : 0,
              transition: `opacity ${isPaletteDragOver ? DRAG_HIGHLIGHT_FADE_IN_MS : DRAG_HIGHLIGHT_FADE_OUT_MS}ms ${DRAG_HIGHLIGHT_EASE}`,
            }}
          />
        ) : null}
        {nodes.length === 0 && !loading ? (
          <WorkflowCanvasEmpty
            variant={variant}
            onInsertTrigger={insertTriggerNode}
            onDescribeWorkflow={handleDescribeWorkflow}
            agentBuilding={agentBuilding}
          />
        ) : null}
        {loading ? (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-background"
            aria-busy="true"
          >
            <Spinner size="lg" />
          </div>
        ) : null}
      </div>
      <NodePalettePanel
        onPaletteDragChange={setIsPaletteDragging}
        disabled={agentBuilding}
      />
      <NodePropertiesPanel
        open={propertiesOpen}
        onOpenChange={setPropertiesOpen}
        hasSelection={hasNodeSelection}
        selectedNode={selectedNode}
        onNodeDataSave={onNodeDataSave}
        onDeleteNode={onDeleteNode}
      />
    </div>
  )
}

const WorkflowCanvasInnerWithRef = React.forwardRef(WorkflowCanvasInner)

export const WorkflowCanvas = React.forwardRef<
  WorkflowCanvasRef,
  WorkflowCanvasProps
>(function WorkflowCanvas(props, ref) {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInnerWithRef {...props} ref={ref} />
    </ReactFlowProvider>
  )
})
