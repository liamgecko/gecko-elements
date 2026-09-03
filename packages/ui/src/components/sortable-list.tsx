"use client"

import * as React from "react"
import type { Data, DragOperation, Draggable } from "@dnd-kit/abstract"
import { Accessibility } from "@dnd-kit/dom"
import type { SortableDraggable } from "@dnd-kit/dom/sortable"
import { DragDropProvider } from "@dnd-kit/react"
import { isSortable, useSortable } from "@dnd-kit/react/sortable"
import { GripVertical } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { cn } from "@gecko/ui/lib/utils"

const ROOT_GROUP = "__root__"
const SECTION_SORTABLE_TYPE = "sortable-section"
const ITEM_SORTABLE_TYPE = "sortable-item"
const SECTION_GROUP_PREFIX = "sortable-section:"
const SECTION_ID_PREFIX = "sortable-section-row:"
const ITEM_ID_PREFIX = "sortable-item-row:"

function getSectionGroup(sectionId: string) {
  return `${SECTION_GROUP_PREFIX}${sectionId}`
}

function getSectionIdFromGroup(group: string | number) {
  const value = String(group)
  return value.startsWith(SECTION_GROUP_PREFIX)
    ? value.slice(SECTION_GROUP_PREFIX.length)
    : null
}

function getSectionSortableId(sectionId: string) {
  return `${SECTION_ID_PREFIX}${sectionId}`
}

function getItemSortableId(itemId: string) {
  return `${ITEM_ID_PREFIX}${itemId}`
}

function isItemFromGroup(source: Draggable, group: string) {
  return (
    source.type === ITEM_SORTABLE_TYPE &&
    (source as SortableDraggable<Data>).group === group
  )
}

const sortableAccessibilityOptions: NonNullable<
  ConstructorParameters<typeof Accessibility>[1]
> = {
  announcements: {
    dragstart({ operation: { source } }) {
      if (!source) return
      return `Picked up ${source.data.label ?? source.id}.`
    },
    dragover({ operation: { source, target } }) {
      if (!source || !target || source.id === target.id) return
      return `Moved ${source.data.label ?? source.id} over ${target.data.label ?? target.id}.`
    },
    dragend({ operation: { source, target }, canceled }) {
      if (!source) return
      const label = source.data.label ?? source.id
      if (canceled) return `Cancelled moving ${label}.`
      return target
        ? `Dropped ${label} in its new position.`
        : `Dropped ${label}.`
    },
  },
}

const sortableAccessibility = Accessibility.configure(
  sortableAccessibilityOptions
)

/** One section in a {@link SortableList} with `variant="nested"`. Item `id`s must be unique across all sections. */
export type SortableNestedSection = {
  id: string
  title: string
  items: SortableNestedItem[]
}

export type SortableNestedItem = {
  id: string
  label: string
}

export type SortableNestedRowContext =
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
  /** Supplies the human-readable item name used by the drag handle. Defaults to the item id. */
  getItemLabel?: (id: string, index: number) => string
  /** Renders product-owned controls at the end of a row. */
  renderRowActions?: (context: { id: string; index: number }) => React.ReactNode
}

type SortableListNestedProps = SortableListBaseProps & {
  variant: "nested"
  /** Ordered sections; section order follows array order. */
  sections: SortableNestedSection[]
  onSectionsChange: (sections: SortableNestedSection[]) => void
  /**
   * Allows child items to move between sections.
   * @default true
   */
  allowCrossSectionMove?: boolean
  /** Renders product-owned controls at the end of a section or item row. */
  renderRowActions?: (context: SortableNestedRowContext) => React.ReactNode
}

export type SortableListProps = SortableListFlatProps | SortableListNestedProps

function SortableFlatRow({
  id,
  index,
  children,
  itemLabel,
  renderRowActions,
}: {
  id: string
  index: number
  children: React.ReactNode
  itemLabel: string
  renderRowActions?: SortableListFlatProps["renderRowActions"]
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id: getItemSortableId(id),
    index,
    data: { itemId: id, label: itemLabel },
  })
  const rowActions = renderRowActions?.({ id, index })

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
        aria-label={`Reorder ${itemLabel}`}
      >
        <GripVertical className="size-4 shrink-0" aria-hidden />
      </Button>
      <div className="min-w-0 flex-1">{children}</div>
      {rowActions ? <div className="shrink-0">{rowActions}</div> : null}
    </li>
  )
}

function SortableNestedSectionRow({
  section,
  index,
  children,
  renderRowActions,
}: {
  section: SortableNestedSection
  index: number
  children: React.ReactNode
  renderRowActions?: SortableListNestedProps["renderRowActions"]
}) {
  const { ref, handleRef, isDragging } = useSortable({
    id: getSectionSortableId(section.id),
    index,
    group: ROOT_GROUP,
    type: SECTION_SORTABLE_TYPE,
    accept: SECTION_SORTABLE_TYPE,
    data: { kind: "section", sectionId: section.id, label: section.title },
  })
  const rowActions = renderRowActions?.({
    kind: "section",
    sectionId: section.id,
    index,
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
          aria-label={`Reorder section ${section.title}`}
        >
          <GripVertical className="size-4 shrink-0" aria-hidden />
        </Button>
        <span className="min-w-0 flex-1 text-sm font-medium text-foreground">
          {section.title}
        </span>
        {rowActions ? <div className="shrink-0">{rowActions}</div> : null}
      </div>
      {children}
    </li>
  )
}

function SortableNestedItemRow({
  itemId,
  label,
  sectionId,
  index,
  allowCrossSectionMove,
  renderRowActions,
}: {
  itemId: string
  label: string
  sectionId: string
  index: number
  allowCrossSectionMove: boolean
  renderRowActions?: SortableListNestedProps["renderRowActions"]
}) {
  const sectionGroup = getSectionGroup(sectionId)
  const { ref, handleRef, isDragging } = useSortable({
    id: getItemSortableId(itemId),
    index,
    group: sectionGroup,
    type: ITEM_SORTABLE_TYPE,
    accept: allowCrossSectionMove
      ? ITEM_SORTABLE_TYPE
      : (source) => isItemFromGroup(source, sectionGroup),
    data: { kind: "item", sectionId, itemId, label },
  })
  const rowActions = renderRowActions?.({
    kind: "item",
    sectionId,
    itemId,
    index,
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
        aria-label={`Reorder ${label}`}
      >
        <GripVertical className="size-4 shrink-0" aria-hidden />
      </Button>
      <span className="min-w-0 flex-1">{label}</span>
      {rowActions ? <div className="shrink-0">{rowActions}</div> : null}
    </li>
  )
}

function SortableNestedItems({
  section,
  allowCrossSectionMove,
  renderRowActions,
}: {
  section: SortableNestedSection
  allowCrossSectionMove: boolean
  renderRowActions?: SortableListNestedProps["renderRowActions"]
}) {
  return (
    <ul
      className="m-0 mt-2 flex list-none flex-col gap-2 pt-1"
      role="list"
    >
      {section.items.map((item, itemIndex) => (
        <SortableNestedItemRow
          key={item.id}
          allowCrossSectionMove={allowCrossSectionMove}
          index={itemIndex}
          label={item.label}
          renderRowActions={renderRowActions}
          sectionId={section.id}
          itemId={item.id}
        />
      ))}
    </ul>
  )
}

function SortableFlatList({
  items,
  onItemsChange,
  getLabel = (id) => id,
  getItemLabel = (id) => id,
  renderRowActions,
  className,
  ...props
}: SortableListFlatProps) {
  return (
    <div data-slot="sortable-list" className={cn(className)} {...props}>
      <DragDropProvider
        plugins={(defaults) =>
          defaults.map((plugin) =>
            plugin === Accessibility ? sortableAccessibility : plugin
          )
        }
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
          const itemId = source.data.itemId
          const sourceIndex =
            typeof itemId === "string" ? items.indexOf(itemId) : initialIndex
          if (sourceIndex === -1 || sourceIndex === index) return

          const next = [...items]
          const [removed] = next.splice(sourceIndex, 1)
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
              itemLabel={getItemLabel(id, index)}
              renderRowActions={renderRowActions}
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
    allowCrossSectionMove = true,
    renderRowActions,
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
      if (
        !source ||
        !isSortable(source as never) ||
        !("initialIndex" in source)
      ) {
        return
      }

      const { initialIndex, index, initialGroup, group } =
        source as SortableDraggable<Data>
      if (initialGroup == null || group == null) return

      const prev = sectionsRef.current

      if (initialGroup === ROOT_GROUP && group === ROOT_GROUP) {
        const sectionId = source.data.sectionId
        const sourceIndex =
          typeof sectionId === "string"
            ? prev.findIndex((section) => section.id === sectionId)
            : initialIndex
        if (sourceIndex === -1 || sourceIndex === index) return

        const next = [...prev]
        const [removed] = next.splice(sourceIndex, 1)
        next.splice(index, 0, removed)
        onSectionsChange(next)
        return
      }

      const initialSectionId = getSectionIdFromGroup(initialGroup)
      if (!initialSectionId) return

      const target = event.operation.target
      const targetSectionId =
        typeof target?.data?.sectionId === "string"
          ? target.data.sectionId
          : getSectionIdFromGroup(group)
      if (!targetSectionId) return
      if (!allowCrossSectionMove && initialSectionId !== targetSectionId) return

      const sourceSectionIndex = prev.findIndex(
        (section) => section.id === initialSectionId
      )
      const targetSectionIndex = prev.findIndex(
        (section) => section.id === targetSectionId
      )
      if (sourceSectionIndex === -1 || targetSectionIndex === -1) return

      const itemId = source.data.itemId
      const sourceItemIndex =
        typeof itemId === "string"
          ? prev[sourceSectionIndex].items.findIndex(
              (item) => item.id === itemId
            )
          : initialIndex
      if (sourceItemIndex === -1) return

      const targetIndex =
        index

      if (
        sourceSectionIndex === targetSectionIndex &&
        sourceItemIndex === targetIndex
      ) {
        return
      }

      const next = structuredClone(prev)
      const [removed] = next[sourceSectionIndex].items.splice(
        sourceItemIndex,
        1
      )
      if (!removed) return
      next[targetSectionIndex].items.splice(targetIndex, 0, removed)
      onSectionsChange(next)
    },
    [allowCrossSectionMove, onSectionsChange]
  )

  return (
    <div data-slot="sortable-list" className={cn(className)} {...rest}>
      <DragDropProvider
        plugins={(defaults) =>
          defaults.map((plugin) =>
            plugin === Accessibility ? sortableAccessibility : plugin
          )
        }
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <ul className="m-0 flex list-none flex-col gap-3 p-0" role="list">
          {sections.map((section, sectionIndex) => (
            <SortableNestedSectionRow
              key={section.id}
              index={sectionIndex}
              renderRowActions={renderRowActions}
              section={section}
            >
              <SortableNestedItems
                allowCrossSectionMove={allowCrossSectionMove}
                renderRowActions={renderRowActions}
                section={section}
              />
            </SortableNestedSectionRow>
          ))}
        </ul>
      </DragDropProvider>
    </div>
  )
}

/**
 * Sortable list built with [@dnd-kit/react](https://dndkit.com/react/quickstart).
 * - **`variant="flat"` (default):** reorder string ids.
 * - **`variant="nested"`:** reorder sections and their child items. Child items can move between sections unless `allowCrossSectionMove` is false.
 * - Use `renderRowActions` for product-owned controls at the end of a row.
 */
export function SortableList(props: SortableListProps) {
  if (props.variant === "nested") {
    return <SortableNestedList {...props} />
  }
  return <SortableFlatList {...props} />
}
