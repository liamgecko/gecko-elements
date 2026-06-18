import * as React from "react"
import { useNavigate } from "react-router-dom"
import { CheckCheck, ChevronLeft, X } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@gecko/ui/components/combobox"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogWrapper,
} from "@gecko/ui/components/dialog"
import { Field, FieldLabel } from "@gecko/ui/components/field"
import { RadioGroup, RadioGroupItem } from "@gecko/ui/components/radio-group"
import { cn } from "@gecko/ui/lib/utils"

import { useWorkflowTemplates } from "@/hooks/useWorkflowTemplates"

import {
  getWorkflowNewPath,
  type WorkflowDefinition,
  type WorkflowTemplate,
} from "./workflows-data"

type WorkflowCreateMethod = "scratch" | "template"

type WorkflowCreateDialogStep = "choice" | "template"

type WorkflowCreateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type WorkflowCreateDialogContextValue = {
  openCreateWorkflowDialog: () => void
}

const WorkflowCreateDialogContext =
  React.createContext<WorkflowCreateDialogContextValue | null>(null)

export function useWorkflowCreateDialog() {
  const context = React.useContext(WorkflowCreateDialogContext)
  if (!context) {
    throw new Error(
      "useWorkflowCreateDialog must be used within WorkflowCreateDialogProvider",
    )
  }
  return context
}

export type WorkflowNewLocationState = {
  initialDefinition?: WorkflowDefinition | null
  workflowName?: string
}

export function WorkflowCreateDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)

  const openCreateWorkflowDialog = React.useCallback(() => {
    setOpen(true)
  }, [])

  return (
    <WorkflowCreateDialogContext.Provider value={{ openCreateWorkflowDialog }}>
      {children}
      <WorkflowCreateDialog open={open} onOpenChange={setOpen} />
    </WorkflowCreateDialogContext.Provider>
  )
}

function WorkflowCreateDialog({
  open,
  onOpenChange,
}: WorkflowCreateDialogProps) {
  const navigate = useNavigate()
  const { templates, loading } = useWorkflowTemplates()

  const [step, setStep] = React.useState<WorkflowCreateDialogStep>("choice")
  const [method, setMethod] = React.useState<WorkflowCreateMethod>("scratch")
  const [selectedTemplateId, setSelectedTemplateId] = React.useState<
    string | null
  >(null)

  const resetDialog = React.useCallback(() => {
    setStep("choice")
    setMethod("scratch")
    setSelectedTemplateId(null)
  }, [])

  React.useEffect(() => {
    if (!open) {
      resetDialog()
    }
  }, [open, resetDialog])

  const selectedTemplate = React.useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) ?? null,
    [selectedTemplateId, templates],
  )

  const choicePanelRef = React.useRef<HTMLDivElement>(null)
  const templatePanelRef = React.useRef<HTMLDivElement>(null)
  const [choiceHeight, setChoiceHeight] = React.useState<number | undefined>(
    undefined,
  )
  const [templateHeight, setTemplateHeight] = React.useState<number | undefined>(
    undefined,
  )

  const measurePanels = React.useCallback(() => {
    if (choicePanelRef.current) {
      setChoiceHeight(choicePanelRef.current.offsetHeight)
    }
    if (templatePanelRef.current) {
      setTemplateHeight(templatePanelRef.current.offsetHeight)
    }
  }, [])

  React.useLayoutEffect(() => {
    if (!open) {
      setChoiceHeight(undefined)
      setTemplateHeight(undefined)
      return
    }

    measurePanels()
  }, [open, measurePanels, loading, templates.length, method])

  React.useLayoutEffect(() => {
    if (!open) return

    const nodes = [choicePanelRef.current, templatePanelRef.current].filter(
      (node): node is HTMLDivElement => node != null,
    )
    if (nodes.length === 0) return

    const observer = new ResizeObserver(measurePanels)
    for (const node of nodes) {
      observer.observe(node)
    }

    return () => observer.disconnect()
  }, [open, measurePanels])

  const contentHeight = step === "choice" ? choiceHeight : templateHeight

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen)
  }

  const handleStartFromScratch = () => {
    onOpenChange(false)
    navigate(getWorkflowNewPath())
  }

  const handleCreateFromTemplate = () => {
    if (!selectedTemplate) return

    onOpenChange(false)
    navigate(getWorkflowNewPath(), {
      state: {
        initialDefinition: selectedTemplate.definition,
        workflowName: selectedTemplate.name,
      } satisfies WorkflowNewLocationState,
    })
  }

  const handlePrimaryAction = () => {
    if (step === "choice") {
      if (method === "scratch") {
        handleStartFromScratch()
        return
      }

      setStep("template")
      return
    }

    handleCreateFromTemplate()
  }

  const primaryDisabled =
    step === "template" && (loading || selectedTemplateId == null)

  const primaryLabel =
    step === "choice" && method === "scratch"
      ? "Create workflow"
      : step === "choice"
        ? "Continue"
        : "Create workflow"

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent size="xs" showCloseButton={false}>
        <div
          className="overflow-hidden transition-[height] duration-300 ease-in-out"
          style={contentHeight != null ? { height: contentHeight } : undefined}
        >
          <div
            className={cn(
              "flex w-[200%] items-start transition-transform duration-300 ease-in-out",
              step === "template" && "-translate-x-1/2",
            )}
          >
            <div
              ref={choicePanelRef}
              className="w-1/2 shrink-0"
              aria-hidden={step !== "choice"}
            >
              <DialogWrapper>
                <DialogHeader>
                  <DialogTitle>Create a workflow</DialogTitle>
                  <DialogDescription>
                    Start with a blank canvas or use an existing template.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody className="w-full [&_[data-slot=radio-group-item]]:w-full">
                  <RadioGroup
                    value={method}
                    onValueChange={(value) =>
                      setMethod(value as WorkflowCreateMethod)
                    }
                    className="w-full"
                  >
                    <RadioGroupItem
                      asButton
                      value="scratch"
                      id="workflow-create-scratch"
                      label="Start from scratch"
                      description="Build a workflow on an empty canvas."
                      className="w-full"
                    />
                    <RadioGroupItem
                      asButton
                      value="template"
                      id="workflow-create-template"
                      label="Create from a template"
                      description="Pre-fill your workflow from a saved template."
                      className="w-full"
                    />
                  </RadioGroup>
                </DialogBody>
              </DialogWrapper>
            </div>

            <div
              ref={templatePanelRef}
              className="w-1/2 shrink-0"
              aria-hidden={step !== "template"}
            >
              <DialogWrapper>
                <DialogHeader>
                  <DialogTitle>Choose a template</DialogTitle>
                  <DialogDescription>
                    Select a template to populate your new workflow.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody>
                  <Field>
                    <FieldLabel htmlFor="workflow-create-template-selector">
                      Template
                    </FieldLabel>
                    <Combobox
                      items={templates}
                      value={selectedTemplate}
                      onValueChange={(template: WorkflowTemplate | null) => {
                        setSelectedTemplateId(template?.id ?? null)
                      }}
                      itemToStringLabel={(template) => template?.name ?? ""}
                      isItemEqualToValue={(item, selected) =>
                        item?.id === selected?.id
                      }
                      disabled={loading}
                    >
                      <ComboboxInput
                        id="workflow-create-template-selector"
                        placeholder={
                          loading ? "Loading templates…" : "Search templates"
                        }
                        showClear
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>
                          {loading
                            ? "Loading templates…"
                            : "No templates found."}
                        </ComboboxEmpty>
                        <ComboboxList>
                          {(template: WorkflowTemplate) => (
                            <ComboboxItem key={template.id} value={template}>
                              {template.name}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </Field>
                </DialogBody>
              </DialogWrapper>
            </div>
          </div>
        </div>

        <DialogFooter
          showCloseButton={step === "choice"}
          closeButtonText="Cancel"
          closeButtonIcon={X}
        >
          {step === "template" ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("choice")}
            >
              <ChevronLeft data-icon="inline-start" aria-hidden />
              Back
            </Button>
          ) : null}
          <Button
            type="button"
            disabled={primaryDisabled}
            onClick={handlePrimaryAction}
          >
            <CheckCheck data-icon="inline-start" aria-hidden />
            {primaryLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
