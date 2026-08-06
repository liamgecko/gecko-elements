export const FORM_FIELD_PALETTE_TYPE = "form-field-option"
export const FORM_CANVAS_DROPPABLE_ID = "form-canvas"
export const FORM_CANVAS_FIELD_TYPE = "form-canvas-field"
export const FORM_CANVAS_FIELDS_GROUP = "form-canvas-fields"

export type FormFieldOptionData = {
  fieldType: string
  label: string
}

export function isFormFieldOptionData(
  data: unknown,
): data is FormFieldOptionData {
  if (!data || typeof data !== "object") return false
  const record = data as Record<string, unknown>
  return (
    typeof record.fieldType === "string" && typeof record.label === "string"
  )
}
