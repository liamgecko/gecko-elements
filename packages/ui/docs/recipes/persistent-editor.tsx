import { useEffect, useRef, useState } from "react";
import { Button } from "@geckolabs/elements/components/button";
import { Container } from "@geckolabs/elements/components/container";
import { Header } from "@geckolabs/elements/components/header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@geckolabs/elements/components/card";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@geckolabs/elements/components/field";
import { Textarea } from "@geckolabs/elements/components/textarea";
import { Skeleton } from "@geckolabs/elements/components/skeleton";
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
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import { useAsyncAction } from "./use-async-action";
import { useUnsavedNavigation } from "./use-unsaved-navigation";
import { toast } from "@geckolabs/elements/components/toast";
import { actionIcons } from "@geckolabs/elements/lib/action-icons";

/** Mount once per record ID. Route metadata contains presentation, never permission grants. */
export function PersistentEditorRecipe({
  name = "Example record",
  load,
  save,
}: {
  name?: string;
  load: () => Promise<string>;
  save: (body: string) => Promise<void>;
}) {
  const input = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState("");
  const [body, setBody] = useState<string>();
  const [baseline, setBaseline] = useState("");
  const [tab, setTab] = useState("editor");
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const dirty = body !== undefined && body !== baseline;
  useEffect(() => {
    let live = true;
    setFailed(false);
    load()
      .then((text) => {
        if (live) {
          setBody(text);
          setBaseline(text);
        }
      })
      .catch(() => {
        if (live) setFailed(true);
      });
    return () => {
      live = false;
    };
  }, [load, attempt]);
  const navigation = useUnsavedNavigation(dirty, () => {
    setBody(baseline);
    setError("");
  });
  const saving = useAsyncAction({
    perform: save,
    onSuccess: (_value, snapshot: string) => {
      setBaseline(snapshot);
      toast.add({ title: "Changes saved.", type: "success", timeout: 5000 });
    },
    onError: () =>
      toast.add({
        title: "Changes could not be saved. Try again.",
        type: "error",
        timeout: 0,
      }),
  });
  useEffect(() => {
    if (error && tab === "editor") input.current?.focus();
  }, [error, tab]);
  function submit() {
    if (body === undefined) return;
    if (!body.trim()) {
      setError("Enter body content.");
      setTab("editor");
      input.current?.focus();
      return;
    }
    setError("");
    void saving.run(body);
  }
  function select(next: string) {
    if (next !== tab) navigation.request({ proceed: () => setTab(next) });
  }
  return (
    <div data-testid="persistent-editor">
      <Header
        title={name}
        primaryAction={{
          label: "Save changes",
          icon: <HugeiconsIcon icon={actionIcons.save} aria-hidden="true" />,
          onClick: submit,
        }}
        secondaryActions={[
          {
            kind: "menu",
            label: "Actions",
            items: [
              { label: "Open settings", onSelect: () => select("settings") },
            ],
          },
        ]}
        breadcrumbs={{ items: [{ label: name, current: true }] }}
        tabs={{
          tabsProps: {
            value: tab,
            onValueChange: (value) => select(String(value)),
          },
          items: ["editor", "settings"].map((value) => ({
            value,
            label: value === "editor" ? "Editor" : "Settings",
          })),
        }}
      />
      <Container>
        <div hidden={tab !== "editor"}>
          <Card size="sm">
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Field data-invalid={Boolean(error)}>
                <FieldLabel htmlFor="recipe-body" required>
                  Body
                </FieldLabel>
                {body === undefined ? (
                  <div aria-busy={!failed} style={{ height: 160 }}>
                    {failed ? (
                      <>
                        <p role="alert">Content could not be loaded.</p>
                        <Button
                          variant="outline"
                          onClick={() => setAttempt((value) => value + 1)}
                        >
                          Retry content
                        </Button>
                      </>
                    ) : (
                      <>
                        <span role="status" className="sr-only">
                          Loading content…
                        </span>
                        <Skeleton
                          aria-hidden="true"
                          className="h-full motion-reduce:animate-none"
                        />
                      </>
                    )}
                  </div>
                ) : (
                  <Textarea
                    ref={input}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "recipe-body-error" : undefined}
                    id="recipe-body"
                    required
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    style={{ height: 160 }}
                  />
                )}
                {error && (
                  <FieldError id="recipe-body-error">{error}</FieldError>
                )}
              </Field>
            </CardContent>
          </Card>
        </div>
        <div hidden={tab !== "settings"}>
          <Card size="sm">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>Settings stay mounted across tabs.</CardContent>
          </Card>
        </div>
      </Container>
      <AlertDialog
        open={navigation.open}
        onOpenChange={(open) => {
          if (!open) navigation.resolve(false);
        }}
      >
        <AlertDialogContent finalFocus={navigation.trigger}>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Your changes have not been saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <HugeiconsIcon
                icon={actionIcons.keepEditing}
                aria-hidden="true"
                data-icon="inline-start"
              />
              Keep editing
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => navigation.resolve(true)}>
              <HugeiconsIcon
                icon={actionIcons.discard}
                aria-hidden="true"
                data-icon="inline-start"
              />
              Discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
