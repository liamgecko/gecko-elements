import { HeaderSection, MainSection } from "@/components/layout/docs-section";
import { Code } from "@/components/layout/docs-code";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { Button } from "@geckolabs/elements/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@geckolabs/elements/components/table";
import {
  actionIcons,
  type ActionIconName,
} from "@geckolabs/elements/lib/action-icons";
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";

const commonActions = [
  { key: "add", label: "Add", glyph: "PlusIcon" },
  { key: "save", label: "Save", glyph: "CheckCheckIcon" },
  { key: "cancel", label: "Cancel", glyph: "XIcon" },
  { key: "edit", label: "Edit", glyph: "Edit02Icon" },
  { key: "delete", label: "Delete", glyph: "Delete02Icon" },
  { key: "copy", label: "Copy", glyph: "Copy01Icon" },
  { key: "actions", label: "Actions", glyph: "Settings01Icon" },
  { key: "retry", label: "Retry", glyph: "ReloadIcon" },
  { key: "next", label: "Next", glyph: "ChevronRightIcon" },
  { key: "previous", label: "Previous", glyph: "ChevronLeftIcon" },
] satisfies Array<{ key: ActionIconName; label: string; glyph: string }>;

const snippet = `import { Button } from "@geckolabs/elements/components/button";

<Button preset="save" onClick={saveChanges}>
  Save changes
</Button>`;

export function GuidesActionIconsPage() {
  return (
    <div>
      <HeaderSection
        id="overview"
        title="Action icons"
        description="Use the same icon for common actions throughout the application. Button presets use the shared actionIcons mapping; feature-specific actions belong with their feature."
      />
      <MainSection
        id="icon-map"
        title="Icon map"
        description="Common actions shared across the React app. Equivalent labels share one glyph. Use Save when committing changes and Edit when entering editing mode."
      >
        <Table aria-label="Standard action icon mapping">
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Mapping</TableHead>
              <TableHead>Glyph</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commonActions.map(({ key, label, glyph }) => (
              <TableRow key={key}>
                <TableCell>
                  <HugeiconsIcon
                    icon={actionIcons[key]}
                    size={20}
                    aria-hidden="true"
                  />
                </TableCell>
                <TableHead scope="row">{label}</TableHead>
                <TableCell>
                  <div className="flex flex-col items-start gap-1">
                    <Code>{`preset="${key}"`}</Code>
                  </div>
                </TableCell>
                <TableCell>
                  <Code>{glyph}</Code>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MainSection>
      <MainSection
        id="usage"
        title="Usage"
        description="Choose an explicit action preset on a labelled Button. Button owns the icon, spacing and default variant; the application owns the handler. The preview below demonstrates appearance only."
      >
        <div className="mb-6">
          <Button preset="save">Save changes</Button>
        </div>
        <Code
          variant="block"
          language="tsx"
          code={snippet}
          showCopyButton
          copyLabel="Copy action icon example"
        />
      </MainSection>
      <MainSection id="guidelines" title="Guidelines">
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Keep a visible action label. Decorative icons use{" "}
            <Code>aria-hidden="true"</Code>.
          </li>
          <li>
            Use outline buttons for Cancel. Confirm irreversible deletion with a
            destructive Alert dialog; discarding edits uses the default dialog
            treatment.
          </li>
          <li>
            Save and Update buttons may use loading while the action is in
            progress. Keep the button label unchanged. Guard duplicate saves in
            the handler and use Toast for the result. The mapping selects a
            glyph; it does not define permissions, validation or behaviour.
          </li>
          <li>
            For Header actions, use the same <Code>preset</Code> property.
            Explicit variants override preset defaults; labels and handlers
            remain application-owned.
          </li>
          <li>
            Dialog buttons must name the consequence, such as Delete account or
            Discard changes; both use the Delete preset.
          </li>
          <li>
            For a feature-specific action, choose its icon deliberately and
            document the agreed choice.
          </li>
        </ul>
      </MainSection>
      <MainSection id="related" title="Related">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/button">Button</DocsPageLink> — action
            labels, variants and loading states.
          </li>
          <li>
            <DocsPageLink to="/components/alert-dialog#examples-unsaved-changes">
              Alert dialog
            </DocsPageLink>{" "}
            — confirmations and unsaved changes.
          </li>
          <li>
            <DocsPageLink to="/guides/application-patterns">
              Application patterns
            </DocsPageLink>{" "}
            — working examples using the shared mapping.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
