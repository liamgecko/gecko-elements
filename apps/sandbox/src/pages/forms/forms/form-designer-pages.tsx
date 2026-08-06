import * as React from "react"
import type { Data } from "@dnd-kit/abstract"
import type { SortableDraggable } from "@dnd-kit/dom/sortable"
import { DragDropProvider } from "@dnd-kit/react"
import { isSortable, useSortable } from "@dnd-kit/react/sortable"
import { AlignLeft, Plus, Trash2 } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { asButtonCheckboxVariants } from "@gecko/ui/components/checkbox"
import { cn } from "@gecko/ui/lib/utils"

export type FormFieldChoice = {
  id: string
  label: string
  paymentItemId: string
}

export type FormFieldCommonSettings = {
  label: string
  helpText: string
  placeholder: string
  templateTag: string
  contactFieldId: string
  required: boolean
  hidden: boolean
  parentFieldId: string
  optionTemplate: string
  choices: FormFieldChoice[]
}

export type FormDesignerField = {
  id: string
  type: string
  label: string
  settings: FormFieldCommonSettings
}

export function createEmptyFieldChoice(): FormFieldChoice {
  return {
    id: crypto.randomUUID(),
    label: "",
    paymentItemId: "",
  }
}

export function fieldHasOptionsTab(fieldType: string): boolean {
  return (
    fieldType === "dropdown-single" ||
    fieldType === "dropdown-multiple" ||
    fieldType === "radio-single" ||
    fieldType === "checkbox-multiple"
  )
}

export function createDefaultFieldSettings(
  label: string,
  fieldType?: string,
): FormFieldCommonSettings {
  return {
    label,
    helpText: "",
    placeholder: "",
    templateTag: "",
    contactFieldId: "",
    required: false,
    hidden: false,
    parentFieldId: "",
    optionTemplate: "",
    choices: fieldHasOptionsTab(fieldType ?? "")
      ? [createEmptyFieldChoice()]
      : [],
  }
}

export type FormDesignerPage = {
  id: string
  name: string
  title: string
  description: string
  submitLabel: string
  fields: FormDesignerField[]
}

type FormDesignerPagesProps = {
  pages: FormDesignerPage[]
  activePageId: string
  onSelectPage: (pageId: string) => void
  onAddPage: () => void
  onDeletePage: (pageId: string) => void
  onPagesChange: (pages: FormDesignerPage[]) => void
}

type FormDesignerPageCardProps = {
  page: FormDesignerPage
  index: number
  isActive: boolean
  canDelete: boolean
  onSelectPage: (pageId: string) => void
  onDeletePage: (pageId: string) => void
}

function FormDesignerPageCard({
  page,
  index,
  isActive,
  canDelete,
  onSelectPage,
  onDeletePage,
}: FormDesignerPageCardProps) {
  const { ref, isDragging } = useSortable({ id: page.id, index })
  const suppressClickRef = React.useRef(false)

  React.useEffect(() => {
    if (isDragging) {
      suppressClickRef.current = true
    }
  }, [isDragging])

  return (
    <div
      ref={ref}
      role="tab"
      tabIndex={0}
      aria-selected={isActive}
      aria-controls={`form-page-panel-${page.id}`}
      id={`form-page-tab-${page.id}`}
      data-checked={isActive ? "" : undefined}
      className={cn(
        asButtonCheckboxVariants(),
        "aspect-3/4 w-full flex-col px-2 py-2.5 text-center data-checked:bg-background",
      )}
      onClick={() => {
        if (suppressClickRef.current) {
          suppressClickRef.current = false
          return
        }
        onSelectPage(page.id)
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onSelectPage(page.id)
        }
      }}
    >
      <span className="text-xs font-medium leading-none">{page.name}</span>
      <AlignLeft aria-hidden className="my-auto size-6" />
      {canDelete ? (
        <Button
          type="button"
          variant="ghost-destructive"
          size="icon-sm"
          aria-label={`Delete ${page.name}`}
          onClick={(event) => {
            event.stopPropagation()
            onDeletePage(page.id)
          }}
          onPointerDown={(event) => {
            // Keep delete clicks from starting a drag on the card.
            event.stopPropagation()
          }}
        >
          <Trash2 aria-hidden />
        </Button>
      ) : null}
    </div>
  )
}

export function FormDesignerPages({
  pages,
  activePageId,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onPagesChange,
}: FormDesignerPagesProps) {
  const canDelete = pages.length > 1
  const pagesRef = React.useRef(pages)

  React.useEffect(() => {
    pagesRef.current = pages
  }, [pages])

  return (
    <div className="flex h-full flex-col items-center gap-3 p-3">
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

          const next = [...pagesRef.current]
          const [removed] = next.splice(initialIndex, 1)
          if (!removed) return
          next.splice(index, 0, removed)
          onPagesChange(next)
        }}
      >
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Form pages"
          className="flex w-full flex-col items-center gap-3"
        >
          {pages.map((page, index) => (
            <FormDesignerPageCard
              key={page.id}
              page={page}
              index={index}
              isActive={page.id === activePageId}
              canDelete={canDelete}
              onSelectPage={onSelectPage}
              onDeletePage={onDeletePage}
            />
          ))}
        </div>
      </DragDropProvider>

      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Add page"
        onClick={onAddPage}
      >
        <Plus aria-hidden />
      </Button>
    </div>
  )
}
