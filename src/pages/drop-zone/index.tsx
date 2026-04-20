import { useState } from "react"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Code } from "@/components/ui/code"
import { DropZone } from "@/components/ui/drop-zone"

export function DropZonePage() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Drop zone</h1>
          <p className="text-sm text-muted-foreground">
            A drag-and-drop file upload area with a manual browse button and a
            removable file list.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Drag files into the drop area, or click the browse button. Selected
            files will appear below and can be removed.
          </p>
          <ComponentExample>
            <DropZone
              multiple
              value={files}
              onValueChange={setFiles}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="custom-label-description" label="Custom label and description">
          <h2 className="text-lg font-semibold">Custom label and description</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Override the default text with the{" "}
            <Code>
              label
            </Code>{" "}
            and{" "}
            <Code>
              description
            </Code>{" "}
            props.
          </p>
          <ComponentExample>
            <DropZone
              label="Upload brand assets"
              description="Drop logos and images here, or click to browse"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Disabled state blocks both drag-and-drop and manual selection.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">
            Disabled
          </h3>
          <ComponentExample>
            <DropZone disabled />
          </ComponentExample>
        </PageSection>
    </div>
  )
}

