import { useEffect, useRef, useState } from "react";

export type ActionResult<T> =
  | { status: "success"; value: T }
  | { status: "error"; error: unknown }
  | { status: "busy" | "abandoned" };

/** Application recipe, not an Elements hook. Give each independent upload its own instance. */
export function useAsyncAction<Input, Output>(options: {
  perform: (snapshot: Input) => Promise<Output>;
  onSuccess?: (value: Output, snapshot: Input) => void;
  onError?: (error: unknown) => void;
}) {
  const [pending, setPending] = useState(false);
  const busy = useRef(false);
  const generation = useRef(0);
  useEffect(() => {
    generation.current += 1;
    return () => {
      generation.current += 1;
    };
  }, []);

  async function run(snapshot: Input): Promise<ActionResult<Output>> {
    if (busy.current) return { status: "busy" };
    busy.current = true;
    setPending(true);
    const started = generation.current;
    try {
      const value = await options.perform(snapshot);
      if (started !== generation.current) return { status: "abandoned" };
      options.onSuccess?.(value, snapshot);
      return { status: "success", value };
    } catch (error) {
      if (started !== generation.current) return { status: "abandoned" };
      options.onError?.(error);
      return { status: "error", error };
    } finally {
      busy.current = false;
      if (started === generation.current) setPending(false);
    }
  }
  return { pending, run };
}
