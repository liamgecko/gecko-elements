import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";
import { RefreshCw, Settings } from "lucide-react";
import { useState } from "react";

export function ButtonPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const importSnippet = `import { Button } from "@gecko/ui/components/button"`;

  const defaultSnippet = `<Button>Save changes</Button>`;

  const primarySnippet = `<Button>Primary</Button>`;

  const secondarySnippet = `<Button variant="secondary">Secondary</Button>`;

  const outlineSnippet = `<Button variant="outline">Outline</Button>`;

  const destructiveSnippet = `<Button variant="destructive">Destructive</Button>`;

  const ghostSnippet = `<Button variant="ghost">Ghost</Button>`;

  const ghostDestructiveSnippet = `<Button variant="ghost-destructive">Remove</Button>`;

  const disabledSnippet = `<Button disabled>
  Primary
</Button>
<Button variant="secondary" disabled>
  Secondary
</Button>
<Button variant="outline" disabled>
  Outline
</Button>
<Button variant="destructive" disabled>
  Destructive
</Button>
<Button variant="ghost" disabled>
  Ghost
</Button>
<Button variant="ghost-destructive" disabled>
  Ghost destructive
</Button>
<Button variant="link" disabled>
  Link
</Button>`;

  const dropdownSnippet = `<DropdownMenu>
  <DropdownMenuTrigger
    render={<Button variant="outline" dropdown>Actions</Button>}
  />
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

  const linkSnippet = `<Button variant="link">View documentation</Button>`;

  const sizesSnippet = `<Button size="xs|sm|default|lg">Button</Button>

<Button size="icon-xs|icon-sm|icon|icon-lg" aria-label="Settings">
  <Settings />
</Button>`;

  const iconLeftSnippet = `<Button>
  <Settings data-icon="inline-start" />
  Icon left
</Button>`;

  const iconRightSnippet = `<Button>
  Icon right
  <Settings data-icon="inline-end" />
</Button>`;

  const iconOnlySnippet = `<Button size="icon" aria-label="Open settings">
  <Settings />
</Button>`;

  const loadingSnippet = `import { useState } from "react"

import { Button } from "@gecko/ui/components/button"

export function SaveChangesButton({
  saveChanges,
}: {
  saveChanges: () => Promise<void>
}) {
  const [isSaving, setIsSaving] = useState(false)

  async function handleSave() {
    setIsSaving(true)

    try {
      await saveChanges()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Button loading={isSaving} onClick={handleSave}>
      {isSaving ? "Saving changes" : "Save changes"}
    </Button>
  )
}`;

  async function showLoadingState(setLoading: (loading: boolean) => void) {
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 2000));
    setLoading(false);
  }

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Button"
          description="The Button component starts an action. The label should say what will happen so people know what they are about to do."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Button when someone needs to take an action. Prefer one
              primary action per Header or area. Use the outline treatment for
              secondary actions, and the soft-filled treatment only in
              documented component compositions. Use quiet treatments for
              toolbar and icon chrome, and destructive treatments for delete or
              remove controls. Confirm irreversible deletes with Alert dialog.
              <br />
              <br />
              Avoid using a button for something that is not an action, or for
              navigation that is really a page link. Do not place several
              primary buttons next to each other.
            </>
          }
        />

        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import Button to start an action."
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

      <PageSection id="default" label="Default button">
        <PageSectionHeader
          title="Default button"
          description={
            <>
              The default Button, which uses{" "}
              <Code>variant=&quot;default&quot;</Code>. Use this as the main
              action on a page or in a dialog.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Button>Save changes</Button>
            <Code
              variant="block"
              language="tsx"
              code={defaultSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="variants" label="Variants">
        <PageSectionHeader
          title="Variants"
          description={
            <>
              Set emphasis with the <Code>variant</Code> prop. Use a strong
              style for the main action, and a quieter style for everything
              else.
            </>
          }
        />

        <PageSubsectionHeader
          id="variants-primary"
          title="Primary"
          description={
            <>
              The main action. <Code>default</Code> is already the fallback, so
              omit the variant prop. Use this for the thing you want people to
              do.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Button>Primary</Button>
            <Code
              variant="block"
              language="tsx"
              code={primarySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-secondary"
          title="Secondary"
          description={
            <>
              A soft-filled contextual action using{" "}
              <Code>variant=&quot;secondary&quot;</Code>. Use it only where
              another component’s documentation specifies this treatment; use
              Outline for a normal secondary action.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Button variant="secondary">Secondary</Button>
            <Code
              variant="block"
              language="tsx"
              code={secondarySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-outline"
          title="Outline"
          description={
            <>
              A bordered action using <Code>variant=&quot;outline&quot;</Code>.
              Use this when a solid button would be too loud.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Button variant="outline">Outline</Button>
            <Code
              variant="block"
              language="tsx"
              code={outlineSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-destructive"
          title="Destructive"
          description={
            <>
              A high-risk action using{" "}
              <Code>variant=&quot;destructive&quot;</Code>. Use this when the
              risk should be visible before someone clicks.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Button variant="destructive">Destructive</Button>
            <Code
              variant="block"
              language="tsx"
              code={destructiveSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-ghost"
          title="Ghost"
          description={
            <>
              A low-emphasis action using <Code>variant=&quot;ghost&quot;</Code>
              . Use this in a toolbar or dense layout, where a filled button
              would take too much attention.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Button variant="ghost">Ghost</Button>
            <Code
              variant="block"
              language="tsx"
              code={ghostSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="variants-ghost-destructive"
          title="Ghost destructive"
          description={
            <>
              A quiet remove action using{" "}
              <Code>variant=&quot;ghost-destructive&quot;</Code>. Use this in a
              list or menu where a red button would dominate the row.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Button variant="ghost-destructive">Remove</Button>
            <Code
              variant="block"
              language="tsx"
              code={ghostDestructiveSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="disabled" label="Disabled">
        <PageSectionHeader
          title="Disabled"
          description={
            <>
              Prevents interaction using the <Code>disabled</Code> prop. Use
              this only when the action is genuinely unavailable because of
              permissions or context. Keep form submission available before
              validation so submitting can reveal and focus errors.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Primary</Button>
              <Button variant="secondary" disabled>
                Secondary
              </Button>
              <Button variant="outline" disabled>
                Outline
              </Button>
              <Button variant="destructive" disabled>
                Destructive
              </Button>
              <Button variant="ghost" disabled>
                Ghost
              </Button>
              <Button variant="ghost-destructive" disabled>
                Ghost destructive
              </Button>
              <Button variant="link" disabled>
                Link
              </Button>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={disabledSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="dropdown" label="Dropdown">
        <PageSectionHeader
          title="Dropdown"
          description={
            <>
              Appends the approved chevron using the <Code>dropdown</Code> prop.
              Use it on the Button rendered by <Code>DropdownMenuTrigger</Code>;
              the trigger supplies the menu behaviour and expanded state.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" dropdown>
                    Actions
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Code
              variant="block"
              language="tsx"
              code={dropdownSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="link-button" label="Link button">
        <PageSectionHeader
          title="Link button"
          description={
            <>
              Looks like a link using <Code>variant=&quot;link&quot;</Code>. Use
              this for a low-emphasis action in a sentence, a footer, or
              anywhere a filled button would be too strong.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Button variant="link">View documentation</Button>
            <Code
              variant="block"
              language="tsx"
              code={linkSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="sizes" label="Sizes">
        <PageSectionHeader
          title="Sizes"
          description={
            <>
              Set the size with the <Code>size</Code> prop. Each standard size
              has a matching square size for icon-only controls. Use a smaller
              size in a dense toolbar, and a larger size when the action is the
              focus of the layout.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Button size="xs">Extra small</Button>
                <Button size="icon-xs" aria-label="Settings">
                  <Settings className="size-3" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="icon-sm" aria-label="Settings">
                  <Settings />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button>Default</Button>
                <Button size="icon" aria-label="Settings">
                  <Settings />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="lg">Large</Button>
                <Button size="icon-lg" aria-label="Settings">
                  <Settings />
                </Button>
              </div>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizesSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="icons" label="Icons">
        <PageSectionHeader
          title="Icons"
          description={
            <>
              Place the icon as a child and use <Code>data-icon</Code> to
              describe whether it appears before or after the label. The
              examples show both positions. Keep the wording clear; the icon
              should support the label, not replace it, unless the button is
              icon-only.
            </>
          }
        />

        <PageSubsectionHeader
          id="icons-left"
          title="Icon left"
          description={
            <>
              Place the icon as the first child and set{" "}
              <Code>data-icon=&quot;inline-start&quot;</Code>. Use this when a
              symbol helps people recognise the action.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Button>
              <Settings data-icon="inline-start" />
              Icon left
            </Button>
            <Code
              variant="block"
              language="tsx"
              code={iconLeftSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="icons-right"
          title="Icon right"
          description={
            <>
              Place the icon as the last child and set{" "}
              <Code>data-icon=&quot;inline-end&quot;</Code>. Use this when the
              button points somewhere or suggests there is more to do.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Button>
              Icon right
              <Settings data-icon="inline-end" />
            </Button>
            <Code
              variant="block"
              language="tsx"
              code={iconRightSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="icons-only"
          title="Icon only"
          description={
            <>
              An icon-only control using <Code>size=&quot;icon&quot;</Code> and
              an <Code>aria-label</Code>. Use this when space is tight and the
              action is already clear from the symbol.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Button size="icon" aria-label="Open settings">
              <Settings />
            </Button>
            <Code
              variant="block"
              language="tsx"
              code={iconOnlySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="loading" label="Loading button">
        <PageSectionHeader
          title="Loading button"
          description={
            <>
              Click either example to see the full flow. The Button supplies the
              Loader, prevents repeated activation, retains focus, and keeps
              action wording visible while work is in progress.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                loading={isSaving}
                onClick={() => void showLoadingState(setIsSaving)}
              >
                {isSaving ? "Saving changes" : "Save changes"}
              </Button>
              <Button
                size="icon"
                loading={isRefreshing}
                aria-label={isRefreshing ? "Refreshing" : "Refresh"}
                onClick={() => void showLoadingState(setIsRefreshing)}
              >
                <RefreshCw />
              </Button>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={loadingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use variant and size for emphasis. Do not restyle the button chrome."
        />
        <DocsDoDont
          doItems={[
            <>
              Use one default Button per area as the main action. Omit the
              variant prop.
            </>,
            <>
              Use <Code>outline</Code> for secondary actions; prefer it over{" "}
              <Code>secondary</Code>.
            </>,
            <>
              Use <Code>loading</Code> while an action is running. Keep the
              action wording visible beside the Loader.
            </>,
            <>
              Set <Code>type=&quot;submit&quot;</Code> explicitly when Button
              submits a form.
            </>,
            <>
              Keep the default intrinsic width. Add <Code>w-full</Code> only
              when the design explicitly requires a full-width action.
            </>,
            <>
              Use <Code>ghost-destructive</Code> for icon trash / remove
              controls (for example deleting a filter row).
            </>,
            <>
              Give icon-only buttons an <Code>aria-label</Code>.
            </>,
            <>
              Confirm irreversible deletion with an{" "}
              <DocsPageLink to="/components/alert-dialog">
                Alert dialog
              </DocsPageLink>
              .
            </>,
          ]}
          dontItems={[
            <>
              Don’t override padding, radius, or colour with{" "}
              <Code>className</Code>. Use <Code>variant</Code> and{" "}
              <Code>size</Code>.
            </>,
            <>
              Don’t use Button for a page link. Style a native{" "}
              <Code>&lt;a&gt;</Code> with <Code>buttonVariants</Code> instead.
            </>,
            <>Don’t place several default buttons next to each other.</>,
            <>
              Don’t disable a submit button merely because a form is incomplete.
              Submit first, then present and focus validation errors.
            </>,
            <>
              Don’t use <Code>variant=&quot;link&quot;</Code> as a substitute
              for a real URL. It is still a button.
            </>,
            <>
              Don’t use labels like “Click here”. The label should name the
              action.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Button."
        />
        <DocsApiTable
          rows={[
            {
              name: "variant",
              type: '"default" | "secondary" | "outline" | "ghost" | "ghost-light" | "ghost-dark" | "ghost-destructive" | "destructive" | "link"',
              defaultValue: '"default"',
              description:
                "Visual emphasis. Use default once per area and Outline for the normal secondary action. Secondary and the surface-specific ghost variants require a documented component composition.",
            },
            {
              name: "size",
              type: '"xs" | "sm" | "default" | "lg" | "icon-2xs" | "icon-xs" | "icon-sm" | "icon" | "icon-lg"',
              defaultValue: '"default"',
              description:
                "Height and padding. Icon sizes are square and need an accessible name.",
            },
            {
              name: "dropdown",
              type: "boolean",
              defaultValue: "false",
              description: (
                <>
                  Appends a chevron. Pair with a{" "}
                  <DocsPageLink to="/components/dropdown-menu">
                    Dropdown menu
                  </DocsPageLink>{" "}
                  when the button opens a list of actions.
                </>
              ),
            },
            {
              name: "loading",
              type: "boolean",
              defaultValue: "false",
              description:
                "Shows the approved Loader beside the action label, prevents activation, keeps focus, and exposes aria-busy.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Prevents interaction and shows the unavailable state.",
            },
            {
              name: "focusableWhenDisabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Advanced Base UI behaviour for a manually disabled control. Button enables it automatically while loading.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-reference"
          className="mt-6"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/button">
                Base UI Button API
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/button">
                Shadcn Button documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a different control when the Button is the wrong shape for the job."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>{" "}
            — when the button opens a list of actions. Pair with{" "}
            <Code>dropdown</Code>.
          </li>
          <li>
            <DocsPageLink to="/components/spinner">Spinner</DocsPageLink> — when
            a standalone loading state is needed. Button supplies its own Loader
            through <Code>loading</Code>.
          </li>
          <li>
            <DocsPageLink to="/components/alert-dialog">
              Alert dialog
            </DocsPageLink>{" "}
            — when the action is destructive and needs a clear yes or no.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
