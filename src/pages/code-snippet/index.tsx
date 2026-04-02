import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Code } from "@/components/ui/code"

export function CodeSnippetPage() {
  const blockExample = `import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputFile() {
  return (
    <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  )
}`

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Code snippet</h1>
          <p className="text-sm text-muted-foreground">
            Inline and block code presentation for documentation and examples.
          </p>
        </PageSection>

        <PageSection id="inline" label="Inline">
          <h2 className="text-lg font-semibold">Inline</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>inline code</Code> to highlight short tokens inside prose.
          </p>
          <ComponentExample>
            <p className="text-sm text-foreground">
              <Code>Inline code snippet</Code>
            </p>
          </ComponentExample>
        </PageSection>

        <PageSection id="block" label="Block">
          <h2 className="text-lg font-semibold">Block</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use a block snippet for multiline examples with syntax highlighting.
          </p>

          <h3 id="block-basic" className="mb-3 text-base font-semibold">
            Basic
          </h3>
          <ComponentExample className="mb-6">
            <Code variant="block" language="tsx" code={blockExample} />
          </ComponentExample>

          <h3 id="block-with-copy" className="mb-3 text-base font-semibold">
            With copy button
          </h3>
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={blockExample}
              showCopyButton
              copyLabel="Copy code"
            />
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}

