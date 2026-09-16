import { useEffect, useRef, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@geckolabs/elements/components/combobox";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@geckolabs/elements/components/field";
import { Button } from "@geckolabs/elements/components/button";
export type RemoteOption = { value: string; label: string };

/** Reset by key when the parent/model changes. Keep labels for selected remote values. */
export function RemoteComboboxRecipe({
  search,
}: {
  search: (query: string, signal: AbortSignal) => Promise<RemoteOption[]>;
}) {
  const [value, setValue] = useState<RemoteOption | null>(null);
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<RemoteOption[]>([]);
  const [pending, setPending] = useState(true);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const request = useRef(0);
  useEffect(() => {
    const current = ++request.current;
    const controller = new AbortController();
    setPending(true);
    setFailed(false);
    // Clear results from the previous query; the selected value remains independently stored.
    setRows([]);
    search(query, controller.signal)
      .then((next) => {
        if (!controller.signal.aborted && current === request.current)
          setRows(next);
      })
      .catch(() => {
        if (!controller.signal.aborted && current === request.current)
          setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted && current === request.current)
          setPending(false);
      });
    return () => controller.abort();
  }, [query, search, attempt]);
  return (
    <Field>
      <FieldLabel htmlFor="recipe-form">Form</FieldLabel>
      <Combobox<RemoteOption>
        name="form"
        items={rows}
        value={value}
        filter={null}
        isItemEqualToValue={(item, selected) => item.value === selected.value}
        itemToStringLabel={(item) => item.label}
        itemToStringValue={(item) => item.value}
        onValueChange={setValue}
        onInputValueChange={(text, details) =>
          setQuery(details.reason === "input-change" ? text : "")
        }
        onOpenChange={(open) => {
          if (open) setQuery("");
        }}
      >
        <ComboboxInput
          id="recipe-form"
          showClear
          aria-busy={pending}
          aria-describedby="recipe-form-status"
        />
        <ComboboxContent>
          <ComboboxEmpty>
            {pending
              ? "Loading forms…"
              : failed
                ? "Forms could not be loaded."
                : "No forms found."}
          </ComboboxEmpty>
          <ComboboxList>
            {(item: RemoteOption) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription id="recipe-form-status" role="status">
        {pending
          ? "Loading forms…"
          : failed
            ? "Forms could not be loaded."
            : "Search for a form or open the complete list."}
      </FieldDescription>
      {failed && (
        <Button
          variant="outline"
          onClick={() => setAttempt((count) => count + 1)}
        >
          Retry forms
        </Button>
      )}
    </Field>
  );
}
