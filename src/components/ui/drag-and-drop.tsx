"use client"

import * as React from "react"
import type { Data, DragOperation, Draggable } from "@dnd-kit/abstract"
import type { SortableDraggable } from "@dnd-kit/dom/sortable"
import { DragDropProvider } from "@dnd-kit/react"
import { isSortable, useSortable } from "@dnd-kit/react/sortable"
import { GripVertical, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const ROOT_GROUP = "__root__"
const SECTION_SORTABLE_TYPE = "sortable-section"
const ITEM_SORTABLE_TYPE = "sortable-item"

/** One section in a {@link SortableList} with `variant="nested"`. Task `id`s must be unique across all sections. */
export type SortableNestedSection = {
  id: string
  title: string
  items: SortableNestedItem[]
}

export type SortableNestedItem = {
  id: string
  label: string
}

/** Row action ids for {@link SortableList} when `rowActions` is enabled. */
export type SortableRowActionId =
  | "add-conditions"
  | "edit"
  | "delete"

/** Context for {@link SortableList} `variant="nested"` row actions. */
export type SortableNestedRowActionContext =
  | { kind: "section"; sectionId: string; index: number }
  | { kind: "item"; sectionId: string; itemId: string; index: number }

type SortableListBaseProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
>

type SortableListFlatProps = SortableListBaseProps & {
  variant?: "flat"
  /** Stable unique id per row. */
  items: string[]
  onItemsChange: (items: string[]) => void
  getLabel?: (id: string, index: number) => React.ReactNode
  /**
   * When true, shows the same kebab row menu pattern as data tables (trigger to the right of the label).
   * @default false
   */
  rowActions?: boolean
  /** Fired when a row action is chosen; omitted actions are no-ops. */
  onRowAction?: (
    action: SortableRowActionId,
    context: { id: string; index: number }
  ) => void
}

type SortableListNestedProps = SortableListBaseProps & {
  variant: "nested"
  /** Ordered sections; section order follows array order. */
  sections: SortableNestedSection[]
  onSectionsChange: (sections: SortableNestedSection[]) => void
  /**
   * When true, shows the kebab menu on each section header and each nested item row.
   * @default false
   */
  rowActions?: boolean
  /** Fired when a row action is chosen for a section or item row. */
  onRowAction?: (
    action: SortableRowActionId,
    context: SortableNestedRowActionContext
  ) => void
}

export type SortableListProps = SortableListFlatProps | SortableListNestedProps

/** Matches data-table row action trigger: ghost `icon-sm` + more icon. */
const SortableListRowActionsTrigger = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<typeof Button>, "children">
>((props, ref) => (
  <Button
    ref={ref}
    type="button"
    variant="ghost"
    size="icon-xs"
    aria-label="Open menu"
    {...props}
  >
    <MoreHorizontal className="size-4 shrink-0" />
  </Button>
))
SortableListRowActionsTrigger.displayName = "SortableListRowActionsTrigger"

function SortableFlatRowActions({
  onSelect,
}: {
  onSelect: (action: SortableRowActionId) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<SortableListRowActionsTrigger />} />
      <DropdownMenuContent align="end" className="w-max min-w-max">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              onSelect("add-conditions")
            }}
          >
            Add conditions
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onSelect("edit")
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              onSelect("delete")
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SortableFlatRow({
  id,
  index,
  children,
  rowActions,
  onRowAction,
}: {
  id: string
  index: number
  children: React.ReactNode
  rowActions?: boolean
  onRowAction?: (
    action: SortableRowActionId,
    context: { id: string; index: number }
  ) => void
}) {
  const { ref, handleRef, isDragging } = useSortable({ id, index })

  return (
    <li
      ref={ref}
      className={cn(
        "flex items-center gap-2 rounded-md border border-border bg-card px-2 py-2 text-sm",
        isDragging && "shadow-md"
      )}
    >
      <Button
        ref={handleRef}
        type="button"
        variant="ghost"
        size="icon-xs"
        className="cursor-grab touch-none active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="size-4 shrink-0" aria-hidden />
      </Button>
      <div className="min-w-0 flex-1">{children}</div>
      {rowActions ? (
        <div
          className="shrink-0"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <SortableFlatRowActions
            onSelect={(action) => {
              onRowAction?.(action, { id, index })
            }}
          />
        </div>
      ) : null}
    </li>
  )
}

function SortableNestedSectionRow({
  section,
  index,
  children,
  rowActions,
  onRowAction,
}: {
  section: SortableNestedSection
  index: number
  children: React.ReactNode
  rowActions?: boolean
  onRowAction?: (
    action: SortableRowActionId,
    context: SortableNestedRowActionContext
  ) => void
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id: section.id,
    index,
    group: ROOT_GROUP,
    type: SECTION_SORTABLE_TYPE,
    accept: SECTION_SORTABLE_TYPE,
  })

  return (
    <li
      ref={ref}
      className={cn(
        "list-none rounded-md border border-border bg-gray-50 p-3",
        isDragging && "shadow-md"
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          ref={handleRef}
          type="button"
          variant="ghost"
          size="icon-xs"
          className="cursor-grab touch-none active:cursor-grabbing"
          aria-label={`Drag section ${section.title}`}
        >
          <GripVertical className="size-4 shrink-0" aria-hidden />
        </Button>
        <span className="min-w-0 flex-1 text-sm font-semibold text-foreground">
          {section.title}
        </span>
        {rowActions ? (
          <div
            className="shrink-0"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <SortableFlatRowActions
              onSelect={(action) => {
                onRowAction?.(action, {
                  kind: "section",
                  sectionId: section.id,
                  index,
                })
              }}
            />
          </div>
        ) : null}
      </div>
      {children}
    </li>
  )
}

function SortableNestedItemRow({
  taskId,
  label,
  sectionId,
  index,
  rowActions,
  onRowAction,
}: {
  taskId: string
  label: string
  sectionId: string
  index: number
  rowActions?: boolean
  onRowAction?: (
    action: SortableRowActionId,
    context: SortableNestedRowActionContext
  ) => void
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id: taskId,
    index,
    group: sectionId,
    type: ITEM_SORTABLE_TYPE,
    accept: ITEM_SORTABLE_TYPE,
  })

  return (
    <li
      ref={ref}
      className={cn(
        "flex list-none items-center gap-2 rounded-md border border-border bg-card px-2 py-2 text-sm",
        isDragging && "shadow-md"
      )}
    >
      <Button
        ref={handleRef}
        type="button"
        variant="ghost"
        size="icon-xs"
        className="cursor-grab touch-none active:cursor-grabbing"
        aria-label={`Drag to reorder ${label}`}
      >
        <GripVertical className="size-4 shrink-0" aria-hidden />
      </Button>
      <span className="min-w-0 flex-1">{label}</span>
      {rowActions ? (
        <div
          className="shrink-0"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <SortableFlatRowActions
            onSelect={(action) => {
              onRowAction?.(action, {
                kind: "item",
                sectionId,
                itemId: taskId,
                index,
              })
            }}
          />
        </div>
      ) : null}
    </li>
  )
}

function SortableFlatList({
  items,
  onItemsChange,
  getLabel = (id) => id,
  rowActions = false,
  onRowAction,
  className,
  ...props
}: SortableListFlatProps) {
  return (
    <div data-slot="drag-and-drop" className={cn(className)} {...props}>
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return

          const { source } = event.operation
          if (
            !source ||
            !isSortable(source as never) ||
            !("initialIndex" in source)
          ) {
            return
          }

          const { initialIndex, index } = source as SortableDraggable<Data>
          if (initialIndex === index) return

          const next = [...items]
          const [removed] = next.splice(initialIndex, 1)
          next.splice(index, 0, removed)
          onItemsChange(next)
        }}
      >
        <ul className="m-0 list-none flex flex-col gap-2 p-0" role="list">
          {items.map((id, index) => (
            <SortableFlatRow
              key={id}
              id={id}
              index={index}
              onRowAction={onRowAction}
              rowActions={rowActions}
            >
              {getLabel(id, index)}
            </SortableFlatRow>
          ))}
        </ul>
      </DragDropProvider>
    </div>
  )
}

function SortableNestedList(props: SortableListNestedProps) {
  const {
    variant,
    sections,
    onSectionsChange,
    rowActions = false,
    onRowAction,
    className,
    ...rest
  } = props
  void variant

  const snapshot = React.useRef(structuredClone(sections))
  const sectionsRef = React.useRef(sections)
  React.useEffect(() => {
    sectionsRef.current = sections
  }, [sections])

  const handleDragStart = React.useCallback(() => {
    snapshot.current = structuredClone(sectionsRef.current)
  }, [])

  const handleDragEnd = React.useCallback(
    (event: { canceled: boolean; operation: DragOperation }) => {
      if (event.canceled) {
        onSectionsChange(snapshot.current)
        return
      }

      const { source } = event.operation as DragOperation & {
        source: Draggable | null
      }
      if (!source || !isSortable(source as never) || !("initialIndex" in source)) {
        return
      }

      const { initialIndex, index, initialGroup, group } =
        source as SortableDraggable<Data>
      if (initialGroup == null || group == null) return
      if (initialIndex === index && initialGroup === group) return

      const prev = sectionsRef.current

      if (initialGroup === ROOT_GROUP && group === ROOT_GROUP) {
        const next = [...prev]
        const [removed] = next.splice(initialIndex, 1)
        next.splice(index, 0, removed)
        onSectionsChange(next)
        return
      }

      if (initialGroup !== ROOT_GROUP && initialGroup === group) {
        const sectionId = group as string
        const si = prev.findIndex((s) => s.id === sectionId)
        if (si === -1) return
        const section = prev[si]
        const nextItems = [...section.items]
        const [removed] = nextItems.splice(initialIndex, 1)
        nextItems.splice(index, 0, removed)
        const next = [...prev]
        next[si] = { ...section, items: nextItems }
        onSectionsChange(next)
      }
    },
    [onSectionsChange]
  )

  return (
    <div data-slot="drag-and-drop" className={cn(className)} {...rest}>
      <DragDropProvider onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <ul className="m-0 flex list-none flex-col gap-3 p-0" role="list">
          {sections.map((section, sectionIndex) => (
            <SortableNestedSectionRow
              key={section.id}
              index={sectionIndex}
              onRowAction={onRowAction}
              rowActions={rowActions}
              section={section}
            >
              <ul
                className="m-0 mt-2 flex list-none flex-col gap-2 pt-1"
                role="list"
              >
                {section.items.map((item, itemIndex) => (
                  <SortableNestedItemRow
                    key={item.id}
                    index={itemIndex}
                    label={item.label}
                    onRowAction={onRowAction}
                    rowActions={rowActions}
                    sectionId={section.id}
                    taskId={item.id}
                  />
                ))}
              </ul>
            </SortableNestedSectionRow>
          ))}
        </ul>
      </DragDropProvider>
    </div>
  )
}

/**
 * Sortable list built with [@dnd-kit/react](https://dndkit.com/react/quickstart).
 * - **`variant="flat"` (default):** reorder string ids. Optional **`rowActions`** + **`onRowAction`** for the table-style kebab menu.
 * - **`variant="nested"`:** reorder sections and items within sections; item ids must be unique across sections. **`rowActions`** adds the same menu on section headers and nested item rows (`onRowAction` receives {@link SortableNestedRowActionContext}).
 */
export function SortableList(props: SortableListProps) {
  if (props.variant === "nested") {
    return <SortableNestedList {...props} />
  }
  return <SortableFlatList {...props} />
}

/** Alias for {@link SortableList}. */
export const DragAndDrop = SortableList
