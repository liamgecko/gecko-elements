import { StrictMode, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import "@geckolabs/elements/globals.css";
import { Toaster } from "@geckolabs/elements/components/toast";
import { Button } from "@geckolabs/elements/components/button";
import { AsyncFormRecipe } from "../../packages/ui/docs/recipes/async-form";
import { PersistentEditorRecipe } from "../../packages/ui/docs/recipes/persistent-editor";
import { RemoteComboboxRecipe } from "../../packages/ui/docs/recipes/remote-combobox";
import { RemoteTableRecipe } from "../../packages/ui/docs/recipes/remote-table";
import { UploadFieldsRecipe } from "../../packages/ui/docs/recipes/upload-field";
import {
  RichTextEditor,
  type RichTextEditorHandle,
} from "@geckolabs/elements/components/rich-text-editor";
import { Field, FieldLabel } from "@geckolabs/elements/components/field";
import { useUnsavedNavigation } from "../../packages/ui/docs/recipes/use-unsaved-navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@geckolabs/elements/components/alert-dialog";

type Pending = {
  kind: string;
  value: unknown;
  resolve: (value: any) => void;
  reject: (error: Error) => void;
};
const pending: Pending[] = [];
const calls: { kind: string; value: unknown }[] = [];
function request<T>(kind: string, value?: unknown): Promise<T> {
  calls.push({ kind, value });
  return new Promise((resolve, reject) =>
    pending.push({ kind, value, resolve, reject }),
  );
}
const save = (value: unknown) => request<void>("save", value);
const load = () => request<string>("load");
const search = (value: string) => request<any[]>("search", value);
const fetchRows = (value: unknown) => request<any>("rows", value);
const upload = (file: File) => request<string>("upload", file.name);
const sample =
  "<!DOCTYPE html><html><head><title>Roundtrip</title><style>p { color: #123456; }</style></head><body><table><tbody><tr><td><p>Welcome {{contact.name}} — café 😀</p><table><tbody><tr><td>Nested content</td></tr></tbody></table></td></tr></tbody></table></body></html>";
function RTE({ id = "rte" }: { id?: string }) {
  const ref = useRef<RichTextEditorHandle>(null);
  const [value, setValue] = useState(sample);
  const [key, setKey] = useState(0);
  const [locked, setLocked] = useState(false);
  return (
    <div data-testid={id}>
      <Field>
        <FieldLabel htmlFor={id} required>
          Body
        </FieldLabel>
        <RichTextEditor
          key={key}
          id={id}
          ref={ref}
          value={value}
          onValueChange={setValue}
          label="Body"
          required
          height={360}
          readOnly={locked}
        />
      </Field>
      <Button
        onClick={() => {
          const saved = ref.current?.getContent();
          if (saved) {
            window.localStorage.setItem("roundtrip", saved);
            setValue(saved);
            setKey(key + 1);
          }
        }}
      >
        Save and reload editor
      </Button>
      <Button
        variant="outline"
        onClick={() => setValue("<p>Replacement content</p>")}
      >
        Replace content
      </Button>
      <Button variant="outline" onClick={() => setLocked(!locked)}>
        Toggle editor lock
      </Button>
    </div>
  );
}
function Guard() {
  const [dirty, setDirty] = useState(true);
  const [destination, setDestination] = useState("Current page");
  const guard = useUnsavedNavigation(dirty, () => setDirty(false));
  return (
    <>
      <p>{destination}</p>
      <Button
        onClick={() =>
          guard.request({
            proceed: () => {
              calls.push({ kind: "proceed", value: null });
              setDestination("Destination page");
            },
            cancel: () => calls.push({ kind: "cancel", value: null }),
          })
        }
      >
        Navigate
      </Button>
      <AlertDialog
        open={guard.open}
        onOpenChange={(open) => {
          if (!open) guard.resolve(false);
        }}
      >
        <AlertDialogContent finalFocus={guard.trigger}>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Changes have not been saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction onClick={() => guard.resolve(true)}>
              Discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
function App() {
  const [visible, setVisible] = useState(true);
  const [parent, setParent] = useState(0);
  const recipe = new URLSearchParams(location.search).get("recipe");
  (window as any).recipeTest = {
    calls,
    pending,
    resolve: (kind: string, value: unknown, index = 0) => {
      const found = pending.filter((item) => item.kind === kind)[index];
      if (!found) throw new Error("Missing " + kind);
      pending.splice(pending.indexOf(found), 1);
      found.resolve(value);
    },
    reject: (kind: string) => {
      const found = pending.find((item) => item.kind === kind);
      if (!found) throw new Error("Missing " + kind);
      pending.splice(pending.indexOf(found), 1);
      found.reject(new Error("Simulated failure"));
    },
    unmount: () => setVisible(false),
    resetParent: () => setParent((v) => v + 1),
  };
  return (
    <main className="min-w-[1024px] p-6">
      <Toaster />
      {visible && (
        <>
          {recipe === "form" && (
            <AsyncFormRecipe save={save} submitForApproval={save} />
          )}
          {recipe === "editor" && (
            <PersistentEditorRecipe
              name="Known record"
              load={load}
              save={save}
            />
          )}
          {recipe === "combobox" && (
            <RemoteComboboxRecipe key={parent} search={search} />
          )}
          {recipe === "table" && <RemoteTableRecipe fetchRows={fetchRows} />}
          {recipe === "cached-empty" && (
            <RemoteTableRecipe
              fetchRows={fetchRows}
              initial={{ rows: [], total: 0 }}
            />
          )}
          {recipe === "upload" && (
            <UploadFieldsRecipe upload={upload} save={save} />
          )}
          {recipe === "rte" && <RTE />}
          {recipe === "rte-multiple" && (
            <>
              <RTE id="first" />
              <RTE id="second" />
            </>
          )}
          {recipe === "guard" && <Guard />}
        </>
      )}
    </main>
  );
}
// Recipes also need to survive React StrictMode's effect replay.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
