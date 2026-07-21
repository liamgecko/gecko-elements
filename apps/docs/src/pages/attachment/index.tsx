import { ImageUp } from "lucide-react"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { Code } from "@gecko/ui/components/code"
import { Attachment } from "@gecko/ui/components/attachment"

function simulateUpload(_file: File, onProgress: (percent: number) => void) {
  return new Promise<void>((resolve) => {
    let percent = 0
    const id = setInterval(() => {
      percent += 12
      onProgress(Math.min(percent, 100))
      if (percent >= 100) {
        clearInterval(id)
        resolve()
      }
    }, 220)
  })
}

function simulateFailingUpload(
  _file: File,
  onProgress: (percent: number) => void
) {
  return new Promise<void>((_resolve, reject) => {
    let percent = 0
    const id = setInterval(() => {
      percent += 20
      onProgress(Math.min(percent, 80))
      if (percent >= 60) {
        clearInterval(id)
        reject(new Error("Upload failed"))
      }
    }, 220)
  })
}

export function AttachmentPage() {
  const importSnippet = `import { Attachment } from "@gecko/ui/components/attachment"`

  const basicExampleSnippet = `<Attachment
  accept="image/*"
  label="Click to upload or drag and drop"
  description="SVG, PNG, JPG or GIF (max. 800x400px)"
  onUpload={async (file, onProgress) => {
    // Upload the file and report progress 0–100
    onProgress(100)
  }}
/>`

  const errorHandlingSnippet = `<Attachment
  accept="image/*"
  description="This upload always fails — try the retry action"
  onUpload={async (file, onProgress) => {
    onProgress(50)
    throw new Error("Upload failed")
  }}
/>`

  const stateDefaultSnippet = `<Attachment
  state="default"
  description="SVG, PNG, JPG or GIF (max. 800x400px)"
/>`

  const stateUploadingSnippet = `<Attachment
  state="uploading"
  name="design-system.zip"
  progress={64}
  onRemove={() => {}}
/>`

  const stateErrorSnippet = `<Attachment
  state="error"
  name="financial-model.xlsx"
  onRetry={() => {}}
  onRemove={() => {}}
/>`

  const stateSuccessSnippet = `<Attachment
  state="done"
  name="uploaded-report.pdf"
  description="Uploaded · 1.8 MB"
  onRemove={() => {}}
/>`

  const sizeDefaultSnippet = `<Attachment
  size="default"
  state="default"
  description="SVG, PNG, JPG or GIF (max. 800x400px)"
/>`

  const sizeSmSnippet = `<Attachment
  size="sm"
  state="default"
  description="SVG, PNG, JPG or GIF (max. 800x400px)"
/>`

  const sizeXsSnippet = `<Attachment
  size="xs"
  state="default"
  description="SVG, PNG, JPG or GIF (max. 800x400px)"
/>`

  const customisationSnippet = `import { ImageUp } from "lucide-react"

<Attachment
  accept="image/*"
  icon={<ImageUp />}
  label="Upload your brand assets"
  description="Drop a logo or image, or click to browse"
  onUpload={async (file, onProgress) => {
    onProgress(100)
  }}
/>`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Attachment"
          description="A self-managing file attachment row. It starts empty and transitions through uploading, error, and uploaded as the file is processed."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description="Import the Attachment component to handle file upload lifecycle in a single row."
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the Attachment component from the UI package."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description={
            <>
              Pass an <Code>onUpload</Code> handler and the component manages its
              own state: pick or drop a file and the same row moves from{" "}
              <Code>default</Code> → <Code>uploading</Code> → <Code>done</Code>.
              The trash action returns it to the empty state.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                accept="image/*"
                label="Click to upload or drag and drop"
                description="SVG, PNG, JPG or GIF (max. 800x400px)"
                onUpload={simulateUpload}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="error-handling" label="Error handling">
        <PageSectionHeader
          title="Error handling"
          description={
            <>
              If <Code>onUpload</Code> rejects, the row enters the{" "}
              <Code>error</Code> state with a retry action that re-runs the
              upload.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                accept="image/*"
                description="This upload always fails — try the retry action"
                onUpload={simulateFailingUpload}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={errorHandlingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="states" label="States">
        <PageSectionHeader
          title="States"
          description={
            <>
              For full control, force a state with the <Code>state</Code> prop.
              These rows are static (controlled) for demonstration.
            </>
          }
        />
        <PageSubsectionHeader
          id="states-default"
          title="Default"
          description="The empty interactive state — click or drag to upload."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                state="default"
                description="SVG, PNG, JPG or GIF (max. 800x400px)"
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={stateDefaultSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="states-uploading"
          title="Uploading"
          description="Shows progress while the file is being uploaded."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                state="uploading"
                name="design-system.zip"
                progress={64}
                onRemove={() => {}}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={stateUploadingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="states-error"
          title="Error"
          description="Failed upload with retry and remove actions."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                state="error"
                name="financial-model.xlsx"
                onRetry={() => {}}
                onRemove={() => {}}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={stateErrorSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="states-success"
          title="Success"
          description="Uploaded file with size in the description."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                state="done"
                name="uploaded-report.pdf"
                description="Uploaded · 1.8 MB"
                onRemove={() => {}}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={stateSuccessSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="sizing" label="Sizing">
        <PageSectionHeader
          title="Sizing"
          description={
            <>
              Use the <Code>size</Code> prop to switch between{" "}
              <Code>default</Code>, <Code>sm</Code>, and <Code>xs</Code>.
            </>
          }
        />
        <PageSubsectionHeader
          id="sizing-default"
          title="Default"
          description="The standard attachment row size."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                size="default"
                state="default"
                description="SVG, PNG, JPG or GIF (max. 800x400px)"
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizeDefaultSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="sizing-sm"
          title="Small"
          description="A compact row for tighter layouts."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                size="sm"
                state="default"
                description="SVG, PNG, JPG or GIF (max. 800x400px)"
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizeSmSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="sizing-xs"
          title="Extra small"
          description="The smallest variant — label only, no description."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                size="xs"
                state="default"
                description="SVG, PNG, JPG or GIF (max. 800x400px)"
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizeXsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="customisation" label="Customisation">
        <PageSectionHeader
          title="Customisation"
          description={
            <>
              Override the empty-state copy with <Code>label</Code> and{" "}
              <Code>description</Code>, and swap the default logo with the{" "}
              <Code>icon</Code> prop.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="w-full max-w-md">
              <Attachment
                accept="image/*"
                icon={<ImageUp />}
                label="Upload your brand assets"
                description="Drop a logo or image, or click to browse"
                onUpload={simulateUpload}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={customisationSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>
    </div>
  )
}
