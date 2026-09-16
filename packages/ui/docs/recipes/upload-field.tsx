import { useEffect, useRef, useState } from "react";
import { Attachment } from "@geckolabs/elements/components/attachment";
import { Button } from "@geckolabs/elements/components/button";
import {
  Field,
  FieldLabel,
  FieldGroup,
} from "@geckolabs/elements/components/field";
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import { actionIcons } from "@geckolabs/elements/lib/action-icons";
import { toast } from "@geckolabs/elements/components/toast";
import { useAsyncAction } from "./use-async-action";

/** The staged upload and scan must both complete before a value reaches the form. */
export function UploadFieldsRecipe({
  upload,
  save,
}: {
  upload: (file: File) => Promise<string>;
  save: (values: Record<string, string>) => Promise<void>;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [pending, setPending] = useState<Record<string, boolean>>({});
  const active = useRef(true);
  const tokens = useRef<Record<string, number>>({});
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);
  const saving = useAsyncAction({
    perform: save,
    onSuccess: () =>
      toast.add({ title: "Images saved.", type: "success", timeout: 5000 }),
    onError: () =>
      toast.add({
        title: "Images could not be saved. Try again.",
        type: "error",
        timeout: 0,
      }),
  });
  // Use managed Attachment: it owns error, retry and duplicate upload protection.
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (Object.values(pending).some(Boolean)) return;
        void saving.run({ ...values });
      }}
    >
      <FieldGroup>
        {["logo", "banner"].map((id) => (
          <Field key={id}>
            <FieldLabel htmlFor={`recipe-upload-${id}`}>
              {id === "logo" ? "Logo" : "Banner"}
            </FieldLabel>
            <Attachment
              inputId={`recipe-upload-${id}`}
              accept="image/*"
              onUpload={async (file) => {
                const token = (tokens.current[id] ?? 0) + 1;
                tokens.current[id] = token;
                setPending((previous) => ({ ...previous, [id]: true }));
                try {
                  if (!file.type.startsWith("image/"))
                    throw new Error("Choose an image.");
                  const url = await upload(file); // App adapter uploads AND scans; throws on either failure.
                  if (active.current && tokens.current[id] === token)
                    setValues((previous) => ({ ...previous, [id]: url }));
                } finally {
                  if (active.current && tokens.current[id] === token)
                    setPending((previous) => ({ ...previous, [id]: false }));
                }
              }}
              preview={false}
              onRemove={() => {
                tokens.current[id] = (tokens.current[id] ?? 0) + 1;
                setPending((previous) => ({ ...previous, [id]: false }));
                setValues((previous) => {
                  const next = { ...previous };
                  delete next[id];
                  return next;
                });
              }}
            />
          </Field>
        ))}
      </FieldGroup>
      <Button
        className="mt-4"
        type="submit"
        disabled={Object.values(pending).some(Boolean)}
      >
        <HugeiconsIcon
          icon={actionIcons.save}
          aria-hidden="true"
          data-icon="inline-start"
        />
        Save images
      </Button>
    </form>
  );
}
