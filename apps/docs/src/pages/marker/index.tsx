import { BookOpenCheck, GitBranch, RotateCcw, Search } from "lucide-react"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { Code } from "@gecko/ui/components/code"
import { Marker, MarkerContent, MarkerIcon } from "@gecko/ui/components/marker"
import { Spinner } from "@gecko/ui/components/spinner"

export function MarkerPage() {
  const importSnippet = `import { Marker, MarkerIcon, MarkerContent } from "@gecko/ui/components/marker"`

  const compositionSnippet = `Marker
├── MarkerIcon
└── MarkerContent`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Marker"
          description="Displays an inline status, system note, bordered row, or labeled separator in a conversation."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description="Compose markers with an optional icon and content slot."
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the Marker primitives to build inline conversation markers."
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
        <PageSubsectionHeader
          id="usage-composition"
          title="Composition"
          description="Use the following composition to build a marker:"
        />
        <ComponentExample>
          <Code
            variant="block"
            language="text"
            code={compositionSnippet}
            showCopyButton
            copyLabel="Copy composition"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="variants" label="Variants">
        <PageSectionHeader
          title="Variants"
          description={
            <>
              Use the <Code>variant</Code> prop to switch between an inline
              marker, bordered row, and labeled separator.
            </>
          }
        />
        <PageSubsectionHeader
          id="variants-default"
          title="Default"
          description="An inline marker for status, notes, and actions."
        />
        <ComponentExample className="mb-6">
          <div className="w-full max-w-md">
            <Marker>
              <MarkerContent>A default marker for inline notes.</MarkerContent>
            </Marker>
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="variants-separator"
          title="Separator"
          description="A centered label with divider lines on each side."
        />
        <ComponentExample className="mb-6">
          <div className="w-full max-w-md">
            <Marker variant="separator">
              <MarkerContent>A separator marker</MarkerContent>
            </Marker>
          </div>
        </ComponentExample>
        <PageSubsectionHeader
          id="variants-border"
          title="Border"
          description="A default marker with a bottom border under the row."
        />
        <ComponentExample>
          <div className="w-full max-w-md">
            <Marker variant="border">
              <MarkerContent>A border marker for row boundaries.</MarkerContent>
            </Marker>
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="status" label="Status">
        <PageSectionHeader
          title="Status"
          description={
            <>
              Set <Code>role=&quot;status&quot;</Code> and include a{" "}
              <Code>Spinner</Code> for streaming or in-progress markers so
              updates are announced.
            </>
          }
        />
        <ComponentExample>
          <div className="flex w-full max-w-md flex-col gap-3">
            <Marker role="status">
              <MarkerIcon>
                <Spinner size="sm" />
              </MarkerIcon>
              <MarkerContent>Compacting conversation</MarkerContent>
            </Marker>
            <Marker role="status">
              <MarkerIcon>
                <Spinner size="sm" />
              </MarkerIcon>
              <MarkerContent>Running tests</MarkerContent>
            </Marker>
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="shimmer" label="Shimmer">
        <PageSectionHeader
          title="Shimmer"
          description={
            <>
              Add the <Code>shimmer</Code> prop to <Code>MarkerContent</Code> for
              an animated streaming-text effect.
            </>
          }
        />
        <ComponentExample>
          <div className="flex w-full max-w-md flex-col gap-3">
            <Marker>
              <MarkerContent shimmer>Thinking…</MarkerContent>
            </Marker>
            <Marker>
              <MarkerContent shimmer>Reading 4 files</MarkerContent>
            </Marker>
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="with-icon" label="With icon">
        <PageSectionHeader
          title="With icon"
          description={
            <>
              Use <Code>MarkerIcon</Code> to render an icon alongside the
              content.
            </>
          }
        />
        <ComponentExample>
          <div className="flex w-full max-w-md flex-col gap-3">
            <Marker>
              <MarkerIcon>
                <GitBranch />
              </MarkerIcon>
              <MarkerContent>Switched to a new branch</MarkerContent>
            </Marker>
            <Marker>
              <MarkerIcon>
                <Search />
              </MarkerIcon>
              <MarkerContent>Explored 4 files</MarkerContent>
            </Marker>
            <Marker>
              <MarkerIcon>
                <BookOpenCheck />
              </MarkerIcon>
              <MarkerContent>Syncing completed</MarkerContent>
            </Marker>
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="links-and-buttons" label="Links and buttons">
        <PageSectionHeader
          title="Links and buttons"
          description={
            <>
              Turn a marker into a link or button with the <Code>render</Code>{" "}
              prop on <Code>Marker</Code>.
            </>
          }
        />
        <ComponentExample>
          <div className="flex w-full max-w-md flex-col gap-3">
            <Marker render={<a href="#" />}>
              <MarkerIcon>
                <GitBranch />
              </MarkerIcon>
              <MarkerContent>View the pull request</MarkerContent>
            </Marker>
            <Marker render={<button type="button" />}>
              <MarkerIcon>
                <RotateCcw />
              </MarkerIcon>
              <MarkerContent>Revert this change</MarkerContent>
            </Marker>
          </div>
        </ComponentExample>
      </PageSection>
    </div>
  )
}
