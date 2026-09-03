import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@gecko/ui/components/alert-dialog";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";

export function AlertDialogPage() {
  const importSnippet = `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@gecko/ui/components/alert-dialog"`;

  const compositionSnippet = `AlertDialog
├── AlertDialogTrigger
└── AlertDialogContent
    ├── AlertDialogHeader
    │   ├── AlertDialogTitle
    │   └── AlertDialogDescription
    └── AlertDialogFooter
        ├── AlertDialogCancel
        └── AlertDialogAction`;

  const confirmSaveSnippet = `<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Save changes
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Save changes?</AlertDialogTitle>
      <AlertDialogDescription>
        Saving will apply these changes to every active campaign
        using this form.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={saveChanges}>
        Save changes
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;

  const confirmDeletionSnippet = `<AlertDialog variant="destructive">
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Delete account
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete account?</AlertDialogTitle>
      <AlertDialogDescription>
        This permanently deletes the account and all of its data.
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={deleteAccount}>
        Delete account
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;

  const unsavedChangesSnippet = `<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Leave page
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
      <AlertDialogDescription>
        If you leave now, the changes you have made will be lost.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Keep editing</AlertDialogCancel>
      <AlertDialogAction onClick={discardChanges}>
        Discard changes
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Alert dialog"
        description="Alert dialog interrupts the page with an important decision that must be answered before the user can continue."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Alert dialog to confirm a consequential action before it
            happens. Deletion always requires an Alert dialog. It is also the
            canonical confirmation when leaving would discard unsaved work, or
            when changes must be confirmed before saving.
            <br />
            <br />
            For reversible actions such as closing a conversation, use a{" "}
            <DocsPageLink to="/components/toast">Toast</DocsPageLink> with undo.
            For information that does not require a decision, use an{" "}
            <DocsPageLink to="/components/alert">Alert</DocsPageLink>. For forms
            or general content, use a{" "}
            <DocsPageLink to="/components/dialog">Dialog</DocsPageLink>.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Alert dialog and the parts needed for its confirmation composition."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={importSnippet}
              showCopyButton
              copyLabel="Copy import"
            />
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="usage-composition"
          title="Composition"
          description="The title names the decision, the description explains its consequence, and the footer provides a safe exit and a specific confirmation action."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="text"
              code={compositionSnippet}
              showCopyButton
              copyLabel="Copy composition"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="examples"
        title="Examples"
        description="Use one of these three canonical configurations. They are usage patterns, not additional component variants."
      >
        <ChildSection
          id="examples-confirm-deletion"
          title="Confirm deletion"
          description={
            <>
              Use <Code>variant=&quot;destructive&quot;</Code> for deletion and
              name the object in both the title and action.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <AlertDialog variant="destructive">
                <AlertDialogTrigger render={<Button variant="outline" />}>
                  Delete account
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This permanently deletes the account and all of its data.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete account</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Code
                variant="block"
                language="tsx"
                code={confirmDeletionSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="examples-unsaved-changes"
          title="Discard changes"
          description="Use the default treatment when navigation would discard unsaved work. The cancel action keeps the user editing; the confirm action performs the discard and navigation."
        >
          <ComponentExample>
            <div className="space-y-6">
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="outline" />}>
                  Leave page
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Discard unsaved changes?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      If you leave now, the changes you have made will be lost.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep editing</AlertDialogCancel>
                    <AlertDialogAction>Discard changes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Code
                variant="block"
                language="tsx"
                code={unsavedChangesSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="examples-confirm-save"
          title="Confirm save"
          description="Use the default treatment when changes must be confirmed before saving."
        >
          <ComponentExample>
            <div className="space-y-6">
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="outline" />}>
                  Save changes
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Save changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Saving will apply these changes to every active campaign
                      using this form.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Save changes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Code
                variant="block"
                language="tsx"
                code={confirmSaveSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Make the decision and its consequences clear without inventing new component variants."
      >
        <DocsDoDont
          doItems={[
            <>
              Name the decision in <Code>AlertDialogTitle</Code> and explain its
              consequence in <Code>AlertDialogDescription</Code>.
            </>,
            <>
              Give <Code>AlertDialogCancel</Code> the safe exit and{" "}
              <Code>AlertDialogAction</Code> the consequential action.
            </>,
            <>
              Use <Code>variant=&quot;destructive&quot;</Code> for deletion.
            </>,
            <>
              Use the default treatment for discarding changes and confirming a
              save.
            </>,
            <>
              Let <Code>AlertDialog</Code> own the action treatment. Do not
              override <Code>variant</Code> directly on{" "}
              <Code>AlertDialogAction</Code>.
            </>,
          ]}
          dontItems={[
            <>Don’t allow deletion without an Alert dialog.</>,
            <>
              Don’t use Alert dialog to close a conversation. Use Toast with
              undo because that action is reversible.
            </>,
            <>
              Don’t use it for information, forms, or general content. Use Alert
              or Dialog instead.
            </>,
            <>
              Don’t use vague titles or actions such as “Are you sure?”, “OK”,
              “Continue”, or “Confirm”.
            </>,
            <>
              Don’t omit <Code>AlertDialogCancel</Code> or use colour as the
              only indication of risk.
            </>,
            <>Don’t add variants, props, or custom styling without consent.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Alert dialog."
      >
        <DocsApiTable
          rows={[
            {
              name: "variant",
              type: '"destructive"',
              defaultValue: "—",
              description:
                "On AlertDialog. Applies the destructive treatment to AlertDialogAction. Omit it when discarding changes or confirming a save.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/alert-dialog">
                Base UI Alert Dialog API
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/alert-dialog">
                Shadcn Alert Dialog documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a different component when the user does not need to make a blocking decision."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/dialog">Dialog</DocsPageLink> — forms
            and general content that are not a confirmation.
          </li>
          <li>
            <DocsPageLink to="/components/alert">Alert</DocsPageLink> —
            persistent page information that does not require a decision.
          </li>
          <li>
            <DocsPageLink to="/components/toast">Toast</DocsPageLink> — brief
            feedback and reversible actions that can offer undo.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
