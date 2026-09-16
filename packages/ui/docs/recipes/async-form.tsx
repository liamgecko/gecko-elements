import { useRef, useState } from "react";
import { Button } from "@geckolabs/elements/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@geckolabs/elements/components/card";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@geckolabs/elements/components/field";
import { Input } from "@geckolabs/elements/components/input";
import { toast } from "@geckolabs/elements/components/toast";
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import { actionIcons } from "@geckolabs/elements/lib/action-icons";
import { useAsyncAction } from "./use-async-action";

export function AsyncFormRecipe({
  save,
  submitForApproval,
}: {
  save: (name: string) => Promise<void>;
  submitForApproval?: (name: string) => Promise<void>;
}) {
  const [name, setName] = useState("Example record");
  const [saved, setSaved] = useState(name);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const action = useAsyncAction({
    perform: (snapshot: { name: string; approval: boolean }) =>
      snapshot.approval && submitForApproval
        ? submitForApproval(snapshot.name)
        : save(snapshot.name),
    onSuccess: (_value, snapshot: { name: string; approval: boolean }) => {
      setSaved(snapshot.name); // Later edits remain dirty; never replace them with this snapshot.
      toast.add({
        title: snapshot.approval ? "Submitted for approval." : "Changes saved.",
        type: "success",
        timeout: 5000,
      });
    },
    onError: () =>
      toast.add({
        title: "Changes could not be saved. Try again.",
        type: "error",
        timeout: 0,
      }),
  });
  async function submit(approval = false) {
    if (!name.trim()) {
      setError("Enter a name.");
      input.current?.focus();
      return;
    }
    setError("");
    await action.run({ name, approval });
  }
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Edit record</CardTitle>
        <CardDescription>
          Changes made during a save remain available to save again.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="recipe-record-form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          <Field data-invalid={Boolean(error)}>
            <FieldLabel htmlFor="recipe-name" required>
              Name
            </FieldLabel>
            <Input
              ref={input}
              id="recipe-name"
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "recipe-name-error" : undefined}
            />
            {error && <FieldError id="recipe-name-error">{error}</FieldError>}
          </Field>
        </form>
        <span role="status" className="sr-only">
          {name !== saved ? "Unsaved changes" : "All changes saved"}
        </span>
      </CardContent>
      <CardFooter>
        {submitForApproval && (
          <Button variant="outline" onClick={() => void submit(true)}>
            <HugeiconsIcon
              icon={actionIcons.submitForApproval}
              aria-hidden="true"
              data-icon="inline-start"
            />
            Submit for approval
          </Button>
        )}
        <Button form="recipe-record-form" type="submit">
          <HugeiconsIcon
            icon={actionIcons.save}
            aria-hidden="true"
            data-icon="inline-start"
          />
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}
