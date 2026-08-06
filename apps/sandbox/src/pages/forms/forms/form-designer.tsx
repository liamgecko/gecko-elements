import * as React from "react"
import type { Data } from "@dnd-kit/abstract"
import type { SortableDraggable } from "@dnd-kit/dom/sortable"
import { DragDropProvider, DragOverlay } from "@dnd-kit/react"
import { isSortable } from "@dnd-kit/react/sortable"

import { Card } from "@gecko/ui/components/card"
import { InlineEdit } from "@gecko/ui/components/inline-edit"
import { ScrollArea } from "@gecko/ui/components/scroll-area"

import {
  FormDesignerCanvasFields,
  isCanvasFieldTarget,
  reorderCanvasFields,
} from "./form-designer-canvas"
import {
  FORM_CANVAS_FIELD_TYPE,
  FORM_FIELD_PALETTE_TYPE,
  isFormFieldOptionData,
} from "./form-designer-dnd"
import {
  FormDesignerFieldOptions,
  type FormFieldOption,
} from "./form-designer-field-options"
import {
  FormDesignerPages,
  createDefaultFieldSettings,
  type FormDesignerField,
  type FormDesignerPage,
  type FormFieldCommonSettings,
} from "./form-designer-pages"
import {
  loadDraftFormDesignerPages,
  loadFormDesignerPages,
  saveDraftFormDesignerPages,
  saveFormDesignerPages,
} from "./form-designer-persistence"

function createPage(pageNumber: number, title: string): FormDesignerPage {
  return {
    id: crypto.randomUUID(),
    name: `Page ${pageNumber}`,
    title,
    description: "No description",
    submitLabel: "Submit",
    fields: [],
  }
}

function createField(option: { id: string; label: string }): FormDesignerField {
  return {
    id: crypto.randomUUID(),
    type: option.id,
    label: option.label,
    settings: createDefaultFieldSettings(option.label, option.id),
  }
}

function withSequentialPageNames(pages: FormDesignerPage[]): FormDesignerPage[] {
  return pages.map((page, index) => ({
    ...page,
    name: `Page ${index + 1}`,
  }))
}

type FormDesignerProps = {
  /** Saved form id. Omit on the create flow to use the draft store. */
  formId?: string
  formName: string
  onFormNameChange: (name: string) => void
}

export function FormDesigner({
  formId,
  formName,
  onFormNameChange,
}: FormDesignerProps) {
  const [pages, setPages] = React.useState<FormDesignerPage[]>(() => {
    const stored = formId
      ? loadFormDesignerPages(formId)
      : loadDraftFormDesignerPages()
    if (stored) return stored
    return [createPage(1, formName)]
  })
  const [activePageId, setActivePageId] = React.useState(pages[0]!.id)
  const pagesRef = React.useRef(pages)
  const activePageIdRef = React.useRef(activePageId)

  React.useEffect(() => {
    pagesRef.current = pages
  }, [pages])

  React.useEffect(() => {
    activePageIdRef.current = activePageId
  }, [activePageId])

  React.useEffect(() => {
    if (formId) {
      saveFormDesignerPages(formId, pages)
    } else {
      saveDraftFormDesignerPages(pages)
    }
  }, [formId, pages])

  const activePage =
    pages.find((page) => page.id === activePageId) ?? pages[0] ?? null

  const getActivePage = () => {
    const currentPages = pagesRef.current
    const currentActivePageId = activePageIdRef.current
    return (
      currentPages.find((page) => page.id === currentActivePageId) ??
      currentPages[0] ??
      null
    )
  }

  const updateActivePage = (patch: Partial<FormDesignerPage>) => {
    setPages((current) =>
      current.map((page) =>
        page.id === activePageId ? { ...page, ...patch } : page,
      ),
    )
  }

  const updatePageFields = (
    pageId: string,
    fields: FormDesignerField[],
  ) => {
    setPages((current) =>
      current.map((page) =>
        page.id === pageId ? { ...page, fields } : page,
      ),
    )
  }

  const handleTitleChange = (title: string) => {
    updateActivePage({ title })
    onFormNameChange(title)
  }

  const handleAddField = (option: FormFieldOption) => {
    if (!activePage) return
    updatePageFields(activePage.id, [
      ...activePage.fields,
      createField(option),
    ])
  }

  const handleUpdateField = (
    fieldId: string,
    settings: FormFieldCommonSettings,
  ) => {
    if (!activePage) return
    updatePageFields(
      activePage.id,
      activePage.fields.map((field) =>
        field.id === fieldId
          ? { ...field, label: settings.label, settings }
          : field,
      ),
    )
  }

  const handleCloneField = (fieldId: string) => {
    if (!activePage) return
    const field = activePage.fields.find((item) => item.id === fieldId)
    if (!field) return

    const fieldIndex = activePage.fields.findIndex((item) => item.id === fieldId)
    const nextFields = [...activePage.fields]
    nextFields.splice(fieldIndex + 1, 0, {
      ...field,
      id: crypto.randomUUID(),
      settings: {
        ...field.settings,
        choices: field.settings.choices.map((choice) => ({
          ...choice,
          id: crypto.randomUUID(),
        })),
      },
    })
    updatePageFields(activePage.id, nextFields)
  }

  const handleDeleteField = (fieldId: string) => {
    if (!activePage) return
    updatePageFields(
      activePage.id,
      activePage.fields.filter((field) => field.id !== fieldId),
    )
  }

  const handleAddPage = () => {
    const nextPage = createPage(pages.length + 1, formName)
    setPages((current) => [...current, nextPage])
    setActivePageId(nextPage.id)
  }

  const handleDeletePage = (pageId: string) => {
    if (pages.length <= 1) return

    const nextPages = withSequentialPageNames(
      pages.filter((page) => page.id !== pageId),
    )
    setPages(nextPages)

    if (pageId === activePageId) {
      setActivePageId(nextPages[0]!.id)
    }
  }

  const handlePagesChange = (nextPages: FormDesignerPage[]) => {
    setPages(withSequentialPageNames(nextPages))
  }

  return (
    <Card className="flex min-h-0 flex-1 flex-col overflow-hidden border border-border ring-0">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return

          const { source, target } = event.operation
          const currentActivePage = getActivePage()
          if (!currentActivePage) return

          if (source?.type === FORM_FIELD_PALETTE_TYPE) {
            if (
              !target ||
              !isCanvasFieldTarget(target.id, currentActivePage.fields)
            ) {
              return
            }
            if (!isFormFieldOptionData(source.data)) return

            updatePageFields(currentActivePage.id, [
              ...currentActivePage.fields,
              createField({
                id: source.data.fieldType,
                label: source.data.label,
              }),
            ])
            return
          }

          if (
            !source ||
            source.type !== FORM_CANVAS_FIELD_TYPE ||
            !isSortable(source as never) ||
            !("initialIndex" in source)
          ) {
            return
          }

          const nextFields = reorderCanvasFields(
            currentActivePage.fields,
            source as SortableDraggable<Data>,
          )
          if (!nextFields) return
          updatePageFields(currentActivePage.id, nextFields)
        }}
      >
        <div className="flex min-h-0 flex-1">
          <aside className="flex w-26 shrink-0 flex-col overflow-hidden border-r border-border bg-gray-50">
            <ScrollArea className="h-full">
              <FormDesignerPages
                pages={pages}
                activePageId={activePageId}
                onSelectPage={setActivePageId}
                onAddPage={handleAddPage}
                onDeletePage={handleDeletePage}
                onPagesChange={handlePagesChange}
              />
            </ScrollArea>
          </aside>

          <section
            id={activePage ? `form-page-panel-${activePage.id}` : undefined}
            role="tabpanel"
            aria-labelledby={
              activePage ? `form-page-tab-${activePage.id}` : undefined
            }
            className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-r border-border"
          >
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-6">
              {activePage ? (
                <>
                  <div className="shrink-0 space-y-2">
                    <InlineEdit
                      size="lg"
                      value={formName}
                      placeholder="Your form title"
                      showCharacterCount
                      maxLength={100}
                      onValueChange={handleTitleChange}
                      onSave={handleTitleChange}
                      className="h-10 text-2xl font-bold [&>span]:px-2 [&_input]:h-10 [&_input]:pl-2 [&_input]:text-2xl [&_input]:font-bold"
                    />
                    <InlineEdit
                      size="sm"
                      value={activePage.description}
                      placeholder="No description"
                      showCharacterCount
                      maxLength={100}
                      onSave={(description) =>
                        updateActivePage({ description })
                      }
                      className="h-8 text-sm font-normal text-muted-foreground [&>span]:px-2 [&_input]:h-8 [&_input]:pl-2 [&_input]:text-sm [&_input]:font-normal [&_input]:text-muted-foreground"
                    />
                  </div>

                  <FormDesignerCanvasFields
                    fields={activePage.fields}
                    submitLabel={activePage.submitLabel || "Submit"}
                    onSubmitLabelChange={(submitLabel) =>
                      updateActivePage({ submitLabel })
                    }
                    onUpdateField={handleUpdateField}
                    onCloneField={handleCloneField}
                    onDeleteField={handleDeleteField}
                  />
                </>
              ) : null}
            </div>
          </section>

          <aside className="flex w-72 shrink-0 flex-col overflow-hidden">
            <FormDesignerFieldOptions onAddField={handleAddField} />
          </aside>
        </div>

        <DragOverlay dropAnimation={null}>
          {(source) =>
            source?.type === FORM_FIELD_PALETTE_TYPE &&
            isFormFieldOptionData(source.data) ? (
              <div className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-md">
                {source.data.label}
              </div>
            ) : null
          }
        </DragOverlay>
      </DragDropProvider>
    </Card>
  )
}
