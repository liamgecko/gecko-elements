import { useOutletContext, useParams } from "react-router-dom"

import { FormDesigner } from "../form-designer"
import type { FormLayoutOutletContext } from "../forms-data"

export default function FormDesignerPage() {
  const { formId = "" } = useParams()
  const { draft, setDraft } = useOutletContext<FormLayoutOutletContext>()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <FormDesigner
        formId={formId}
        formName={draft.name}
        onFormNameChange={(name) =>
          setDraft((current) => ({ ...current, name }))
        }
      />
    </div>
  )
}
