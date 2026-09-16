import { useEffect, useRef, useState } from "react";

export type BlockedNavigation = { proceed: () => void; cancel?: () => void };

/** Feed router blocker transitions here, including POP. Do not patch history or confirm(). */
export function useUnsavedNavigation(dirty: boolean, discard: () => void) {
  const pending = useRef<BlockedNavigation | null>(null);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!dirty) return;
    const protect = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", protect);
    return () => window.removeEventListener("beforeunload", protect);
  }, [dirty]);
  useEffect(
    () => () => {
      pending.current?.cancel?.();
      pending.current = null;
    },
    [],
  );
  function request(intent: BlockedNavigation) {
    if (pending.current) {
      intent.cancel?.();
      return;
    }
    if (!dirty) {
      intent.proceed();
      return;
    }
    trigger.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    pending.current = intent;
    setOpen(true);
  }
  function resolve(leave: boolean) {
    const intent = pending.current;
    pending.current = null;
    setOpen(false);
    if (!intent) return;
    if (leave) {
      discard();
      intent.proceed();
    } else intent.cancel?.();
  }
  return { open, trigger, request, resolve };
}
