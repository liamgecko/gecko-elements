import * as React from "react"
import { CheckCheck } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@gecko/ui/components/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@gecko/ui/components/tabs"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@gecko/ui/components/toggle-group"

import {
  FormDesignerFieldOptionsTab,
  type ChargeableBadgePlacement,
} from "./form-designer-field-options-tab"
import { FormDesignerFieldSettingsForm } from "./form-designer-field-settings"
import {
  createDefaultFieldSettings,
  fieldHasOptionsTab,
  type FormDesignerField,
  type FormFieldCommonSettings,
} from "./form-designer-pages"

type FieldEditTab = "settings" | "options" | "conditions" | "integrations"

type FormDesignerFieldEditDialogProps = {
  field: FormDesignerField | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (fieldId: string, settings: FormFieldCommonSettings) => void
}

export function FormDesignerFieldEditDialog({
  field,
  open,
  onOpenChange,
  onSave,
}: FormDesignerFieldEditDialogProps) {
  const [tab, setTab] = React.useState<FieldEditTab>("settings")
  const [settings, setSettings] = React.useState<FormFieldCommonSettings>(
    createDefaultFieldSettings(""),
  )
  const [badgePlacement, setBadgePlacement] =
    React.useState<ChargeableBadgePlacement>("below")

  // Keep the last field while the close animation runs. Clearing `field` in the
  // parent on close otherwise collapses tabs/footer mid-exit.
  const fieldRef = React.useRef(field)
  if (field) fieldRef.current = field
  const activeField = field ?? fieldRef.current

  const showOptionsTab = activeField
    ? fieldHasOptionsTab(activeField.type)
    : false
  const showBadgePlacementToggle = showOptionsTab && tab === "options"

  React.useEffect(() => {
    if (!open || !field) return
    setTab("settings")
    setBadgePlacement("below")
    setSettings({
      ...createDefaultFieldSettings(field.label, field.type),
      ...field.settings,
      label: field.settings.label || field.label,
      choices:
        field.settings.choices.length > 0
          ? field.settings.choices.map((choice) => ({ ...choice }))
          : createDefaultFieldSettings(field.label, field.type).choices,
    })
  }, [open, field])

  React.useEffect(() => {
    if (!showOptionsTab && tab === "options") {
      setTab("settings")
    }
  }, [showOptionsTab, tab])

  const canSave = settings.label.trim().length > 0
  const titleLabel =
    settings.label.trim() || activeField?.label || "Field"

  const handleSettingsChange = (patch: Partial<FormFieldCommonSettings>) => {
    setSettings((current) => ({ ...current, ...patch }))
  }

  const handleSave = () => {
    if (!activeField || !canSave) return
    onSave(activeField.id, {
      ...settings,
      label: settings.label.trim(),
      choices: settings.choices.map((choice) => ({ ...choice })),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        size="md"
        showCloseButton
        className="flex max-h-[min(90dvh,40rem)] flex-col gap-0 p-0"
      >
        <Tabs
          variant="line"
          value={tab}
          onValueChange={(value) => setTab(value as FieldEditTab)}
          className="flex min-h-0 flex-1 flex-col gap-0 data-[variant=line]:border-b-0"
        >
          <div className="shrink-0 space-y-4 border-b border-border px-6 pt-6">
            <DialogHeader>
              <DialogTitle>{titleLabel}</DialogTitle>
              <DialogDescription className="sr-only">
                Configure settings, conditions, and integrations for this field.
              </DialogDescription>
            </DialogHeader>
            <TabsList variant="line">
              <TabsTrigger value="settings">Settings</TabsTrigger>
              {showOptionsTab ? (
                <TabsTrigger value="options">Options</TabsTrigger>
              ) : null}
              <TabsTrigger value="conditions">Conditions</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
          </div>

          <DialogBody className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
            <TabsContent value="settings" className="outline-none">
              {activeField ? (
                <FormDesignerFieldSettingsForm
                  fieldType={activeField.type}
                  settings={settings}
                  onChange={handleSettingsChange}
                />
              ) : null}
            </TabsContent>

            {showOptionsTab && activeField ? (
              <TabsContent value="options" className="outline-none">
                <FormDesignerFieldOptionsTab
                  fieldType={activeField.type}
                  settings={settings}
                  badgePlacement={badgePlacement}
                  onChange={handleSettingsChange}
                />
              </TabsContent>
            ) : null}

            <TabsContent value="conditions" className="outline-none">
              <p className="py-8 text-center text-sm text-muted-foreground">
                Conditions coming soon.
              </p>
            </TabsContent>

            <TabsContent value="integrations" className="outline-none">
              <p className="py-8 text-center text-sm text-muted-foreground">
                Integrations coming soon.
              </p>
            </TabsContent>
          </DialogBody>
        </Tabs>

        <DialogFooter
          className={
            showBadgePlacementToggle
              ? "shrink-0 sm:justify-between"
              : "shrink-0"
          }
        >
          {showBadgePlacementToggle ? (
            <ToggleGroup
              variant="outline"
              size="sm"
              aria-label="Chargeable item badge placement"
              value={[badgePlacement]}
              onValueChange={(value) => {
                const next = value[0]
                if (next === "below" || next === "inside") {
                  setBadgePlacement(next)
                }
              }}
            >
              <ToggleGroupItem value="below">Below</ToggleGroupItem>
              <ToggleGroupItem value="inside">Inside</ToggleGroupItem>
            </ToggleGroup>
          ) : null}
          <Button type="button" disabled={!canSave} onClick={handleSave}>
            <CheckCheck data-icon="inline-start" aria-hidden />
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
