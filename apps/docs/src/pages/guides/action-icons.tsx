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
  {
    key: "close",
    label: "Close / Cancel",
    glyph: "XIcon",
    aliases: ["cancel"],
  },
  {
    key: "save",
    label: "Save / Update",
    glyph: "CheckCheckIcon",
    aliases: ["update"],
  },
  {
    key: "edit",
    label: "Edit / Keep editing",
    glyph: "Edit02Icon",
    aliases: ["keepEditing"],
  },
  {
    key: "delete",
    label: "Delete / Remove / Discard",
    glyph: "Delete02Icon",
    aliases: ["remove", "discard"],
  },
  { key: "create", label: "Create / Add", glyph: "PlusIcon", aliases: ["add"] },
  {
    key: "copy",
    label: "Copy / Clone",
    glyph: "Copy01Icon",
    aliases: ["clone"],
  },
  { key: "actions", label: "Actions", glyph: "Settings01Icon", aliases: [] },
  { key: "confirm", label: "Confirm", glyph: "Tick02Icon", aliases: [] },
] satisfies Array<{
  key: ActionIconName;
  label: string;
  glyph: string;
  aliases: ActionIconName[];
}>;

const snippet = `import { Button } from "@geckolabs/elements/components/button";
import { actionIcons } from "@geckolabs/elements/lib/action-icons";
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";

<Button onClick={saveChanges}>
  <HugeiconsIcon
    icon={actionIcons.save}
    aria-hidden="true"
    data-icon="inline-start"
  />
  Save changes
</Button>`;

export function GuidesActionIconsPage() {
  return (
    <div>
      <HeaderSection
        id="overview"
        title="Action icons"
        description="Use the same icon for common actions throughout the application. These previews use the shared actionIcons mapping; feature-specific actions belong with their feature."
      />
      <MainSection
        id="icon-map"
        title="Icon map"
        description="Common actions shared across the React app. Equivalent labels share one glyph. Use Save / Update when committing changes and Edit when entering editing mode; Confirm acknowledges a decision."
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
            {commonActions.map(({ key, label, glyph, aliases }) => (
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
                    {[key, ...aliases].map((name) => (
                      <Code key={name}>{`actionIcons.${name}`}</Code>
                    ))}
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
        description="Render the icon inside a labelled Button. Button owns icon spacing and sizing; the application owns the handler. The preview below demonstrates appearance only."
      >
        <div className="mb-6">
          <Button>
            <HugeiconsIcon
              icon={actionIcons.save}
              aria-hidden="true"
              data-icon="inline-start"
            />
            Save changes
          </Button>
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
            Save buttons never show a loading/saving state or become disabled
            just because a save is pending. Guard duplicate saves in the handler
            and use Toast for the result. The mapping selects a glyph; it does
            not define permissions, validation or behaviour.
          </li>
          <li>
            For Header actions, pass the icon node through the <Code>icon</Code>{" "}
            property.
          </li>
          <li>
            The Confirm row names an icon category. Dialog buttons must name the
            consequence, such as Delete account or Discard changes.
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
