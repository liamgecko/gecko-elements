import { HeaderSection, MainSection } from "@/components/layout/docs-section";
import { Code } from "@/components/layout/docs-code";
import { AsyncFormRecipe } from "../../../../../packages/ui/docs/recipes/async-form";
import { PersistentEditorRecipe } from "../../../../../packages/ui/docs/recipes/persistent-editor";
import { RemoteComboboxRecipe } from "../../../../../packages/ui/docs/recipes/remote-combobox";
import { RemoteTableRecipe } from "../../../../../packages/ui/docs/recipes/remote-table";
import { UploadFieldsRecipe } from "../../../../../packages/ui/docs/recipes/upload-field";
import formSource from "../../../../../packages/ui/docs/recipes/async-form.tsx?raw";
import editorSource from "../../../../../packages/ui/docs/recipes/persistent-editor.tsx?raw";
import remoteSource from "../../../../../packages/ui/docs/recipes/remote-combobox.tsx?raw";
import tableSource from "../../../../../packages/ui/docs/recipes/remote-table.tsx?raw";
import uploadSource from "../../../../../packages/ui/docs/recipes/upload-field.tsx?raw";
import actionSource from "../../../../../packages/ui/docs/recipes/use-async-action.ts?raw";
import navigationSource from "../../../../../packages/ui/docs/recipes/use-unsaved-navigation.ts?raw";
import guide from "../../../../../packages/ui/docs/application-patterns.md?raw";
import checklist from "../../../../../packages/ui/docs/migration-checklist.md?raw";
const wait = () => new Promise<void>((resolve) => setTimeout(resolve, 600));
const save = async (_value: unknown) => {
  await wait();
};
const load = async () => {
  await wait();
  return "Edit this content, then change tabs.";
};
const forms = [
  { value: "one", label: "Admissions form" },
  { value: "two", label: "Visit form" },
];
const search = async (query: string, _signal: AbortSignal) => {
  await wait();
  return forms.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );
};
const fetchRows = async () => {
  await wait();
  return { rows: [], total: 0 };
};
const upload = async (file: File) => {
  await wait();
  return `demo-file:${file.name}`;
};
export function GuidesApplicationPatternsPage() {
  return (
    <div>
      <HeaderSection
        id="overview"
        title="Application patterns"
        description="Working starting points for reliable application screens. These examples and browser tests use the same source files. Demo adapters delay responses; they do not persist data."
      />
      <MainSection
        id="persistent-editor"
        title="Persistent editor"
        description="Keep the record shell mounted, preserve known metadata and guard unsaved navigation with AlertDialog. Connect the shared guard to your router blocker for links and Back/Forward."
      >
        <PersistentEditorRecipe load={load} save={save} />
        <Code variant="block" code={editorSource} language="tsx" />
      </MainSection>
      <MainSection
        id="async-form"
        title="Async form"
        description="Validate before submission, prevent duplicate saves and retain edits made while a save is pending."
      >
        <AsyncFormRecipe save={save} submitForApproval={save} />
        <Code variant="block" code={formSource} language="tsx" />
      </MainSection>
      <MainSection
        id="uploads"
        title="Independent uploads"
        description="The application adapter uploads and scans. Each field releases its own pending state and rejects abandoned results; Attachment owns retry presentation."
      >
        <UploadFieldsRecipe upload={upload} save={save} />
        <Code variant="block" code={uploadSource} language="tsx" />
      </MainSection>
      <MainSection
        id="remote-combobox"
        title="Remote selection"
        description="Keep selection separate from search. Reopen the list after selecting a form; all options remain available. Key dependent selectors by their parent ID."
      >
        <RemoteComboboxRecipe search={search} />
        <Code variant="block" code={remoteSource} language="tsx" />
      </MainSection>
      <MainSection
        id="remote-table"
        title="Remote collection"
        description="Unknown data uses a bounded neutral placeholder. A confirmed empty collection uses Empty without table headers or pagination."
      >
        <RemoteTableRecipe fetchRows={fetchRows} />
        <Code variant="block" code={tableSource} language="tsx" />
      </MainSection>
      <MainSection
        id="shared-helpers"
        title="Shared helpers"
        description="Copy these application-owned helpers alongside the recipes. All action entry points share one validation path; all route transitions share one unsaved-changes decision."
      >
        <Code variant="block" code={actionSource} language="ts" />
        <Code variant="block" code={navigationSource} language="ts" />
      </MainSection>
      <MainSection
        id="implementation-guide"
        title="Implementation guide"
        description="The same canonical guidance is distributed with the package for AI agents. Copy and adapt the recipe source into your application; these helpers are not public Elements APIs."
      >
        <Code variant="block" code={guide} language="markdown" />
      </MainSection>
      <MainSection
        id="migration-checklist"
        title="Migration evidence"
        description="Complete this record against the existing product before rebuilding a page. Preserve functionality and copy, and record unknown capabilities explicitly."
      >
        <Code variant="block" code={checklist} language="markdown" />
      </MainSection>
    </div>
  );
}
