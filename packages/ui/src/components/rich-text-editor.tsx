"use client";

import { editorChromeCss } from "@geckolabs/elements/lib/rich-text-editor-skin";

import * as React from "react";
import { Button } from "@geckolabs/elements/components/button";
import { Spinner } from "@geckolabs/elements/components/spinner";
import { cn } from "@geckolabs/elements/lib/utils";
import {
  legacyEmailConfig,
  preserveLegacyStyles,
  type LegacyEditor,
  type LegacyRuntime,
} from "@geckolabs/elements/lib/rich-text-editor-runtime";

export interface RichTextEditorHandle {
  /** Returns false before ready or when read-only; the caller can retain its action. */
  insertContent(html: string): boolean;
  focus(): void;
  getContent(): string;
  /** Call after a successful save, not when a request starts. */
  resetDirty(): void;
}

export interface RichTextEditorProps {
  id?: string;
  /** Accessible name; match the visible FieldLabel. */
  label: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (html: string) => void;
  onDirtyChange?: (dirty: boolean) => void;
  onReady?: () => void;
  onLoadError?: (error: Error) => void;
  /** Public directory containing the exact vendored runtime, plugins, themes and skins. */
  assetBaseUrl?: string;
  /** Editor viewport height in pixels (minimum 360). Dialogs stay inside this viewport. */
  height?: number;
  readOnly?: boolean;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  /** TinyMCE 4 language code, with a matching self-hosted pack. Defaults to English. */
  language?: string;
  languageUrl?: string;
  messages?: { loading?: string; loadError?: string; retry?: string };
  className?: string;
}

const frameHtml =
  '<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>';

export const RichTextEditor = React.forwardRef<
  RichTextEditorHandle,
  RichTextEditorProps
>(function RichTextEditor(
  {
    id,
    label,
    name,
    value,
    defaultValue = "",
    onValueChange,
    onDirtyChange,
    onReady,
    onLoadError,
    assetBaseUrl = "/elements/tinymce-4",
    height = 480,
    readOnly = false,
    required = false,
    "aria-invalid": invalid = false,
    "aria-describedby": describedBy,
    language = "en",
    languageUrl,
    messages,
    className,
  },
  ref,
) {
  const generatedId = React.useId();
  const controlId = id ?? `rich-text-editor-${generatedId}`;
  const hostRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<LegacyEditor | null>(null);
  const replacingRef = React.useRef(false);
  const frameRef = React.useRef<HTMLIFrameElement | null>(null);
  const [html, setHtml] = React.useState(value ?? defaultValue);
  const htmlRef = React.useRef(html);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [attempt, setAttempt] = React.useState(0);
  const viewportHeight = Math.max(360, height);
  const latest = React.useRef({
    label,
    readOnly,
    required,
    invalid,
    describedBy,
    onValueChange,
    onDirtyChange,
    onReady,
    onLoadError,
  });
  React.useLayoutEffect(() => {
    latest.current = {
      label,
      readOnly,
      required,
      invalid,
      describedBy,
      onValueChange,
      onDirtyChange,
      onReady,
      onLoadError,
    };
  });

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => editorRef.current?.focus(),
      getContent: () =>
        editorRef.current?.initialized
          ? editorRef.current.getContent()
          : htmlRef.current,
      insertContent: (content) => {
        const editor = editorRef.current;
        if (!editor?.initialized || latest.current.readOnly) return false;
        editor.focus();
        editor.insertContent(content);
        return true;
      },
      resetDirty: () => {
        editorRef.current?.setDirty(false);
        latest.current.onDirtyChange?.(false);
      },
    }),
    [],
  );

  const syncAccessibility = React.useCallback(() => {
    const editor = editorRef.current;
    const frame = frameRef.current;
    if (frame) frame.title = latest.current.label;
    if (!editor?.initialized) return;
    const props = latest.current;
    const body = editor.getBody();
    body.setAttribute("role", "textbox");
    body.setAttribute("aria-multiline", "true");
    body.setAttribute("aria-label", props.label);
    body.setAttribute("aria-required", String(props.required));
    body.setAttribute("aria-invalid", String(props.invalid));
    body.setAttribute("aria-readonly", String(props.readOnly));
    body.tabIndex = 0;
    const innerFrame = editor.getContainer().querySelector("iframe");
    innerFrame?.setAttribute("title", props.label);
    // ARIA ID references cannot cross iframe boundaries. Mirror descriptive text locally.
    let description = editor
      .getDoc()
      .getElementById("elements-editor-description");
    if (!description) {
      description = editor.getDoc().createElement("div");
      description.id = "elements-editor-description";
      description.hidden = true;
      editor.getDoc().documentElement.append(description);
    }
    description.textContent =
      props.describedBy
        ?.split(/\s+/)
        .map((key) => document.getElementById(key)?.textContent ?? "")
        .join(" ") ?? "";
    if (description.textContent)
      body.setAttribute("aria-describedby", description.id);
    else body.removeAttribute("aria-describedby");
    if (Boolean(editor.settings.readonly) !== props.readOnly)
      editor.setMode(props.readOnly ? "readonly" : "design");
  }, []);

  // TinyMCE cleanup must run before React detaches its iframe host. A passive
  // cleanup can trigger nodeChange against a detached document during remove().
  React.useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    setStatus("loading");
    let disposed = false;
    let instance: LegacyEditor | null = null;
    let themeObserver: MutationObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let lastReported = htmlRef.current;
    let lastDirty = false;
    const frame = document.createElement("iframe");
    frameRef.current = frame;
    frame.title = latest.current.label;
    frame.style.cssText =
      "display:block;width:100%;height:100%;border:0;visibility:hidden";
    // Separate JS realm prevents TinyMCE 4/7 globals, skins and popup handlers colliding.
    // This same-origin iframe is style/runtime isolation, not a security sandbox.
    frame.srcdoc = frameHtml;
    const fail = (error: Error) => {
      if (disposed) return;
      disposed = true;
      clearTimeout(timeout);
      themeObserver?.disconnect();
      resizeObserver?.disconnect();
      instance?.remove();
      instance = null;
      editorRef.current = null;
      frame.remove();
      setStatus("error");
      latest.current.onLoadError?.(error);
    };
    const timeout = window.setTimeout(
      () =>
        fail(
          new Error(
            "Rich text editor assets did not initialise within 20 seconds.",
          ),
        ),
      20000,
    );
    const load = () => {
      const doc = frame.contentDocument;
      const win = frame.contentWindow as
        | (Window & { tinymce?: LegacyRuntime })
        | null;
      if (!doc || !win || disposed) return;
      const style = doc.createElement("style");
      style.textContent = editorChromeCss;
      doc.head.append(style);
      const syncTheme = () => {
        const styles = getComputedStyle(host);
        for (const token of [
          "background",
          "backdrop",
          "foreground",
          "muted-foreground",
          "input",
          "input-background",
          "input-hover",
          "radius",
          "elevation-sm",
          "elevation-md",
          "border",
          "muted",
          "accent",
          "ring",
          "primary",
          "primary-foreground",
        ]) {
          doc.documentElement.style.setProperty(
            `--rte-${token}`,
            styles.getPropertyValue(`--${token}`),
          );
        }
        doc.documentElement.toggleAttribute(
          "data-dark",
          Boolean(host.closest(".dark")),
        );
      };
      syncTheme();
      themeObserver = new MutationObserver(syncTheme);
      for (
        let element: HTMLElement | null = host;
        element;
        element = element.parentElement
      ) {
        themeObserver.observe(element, {
          attributes: true,
          attributeFilter: ["class", "style"],
        });
      }
      const textarea = doc.createElement("textarea");
      textarea.id = "elements-editor";
      textarea.value = htmlRef.current;
      doc.body.append(textarea);
      const base = new URL(
        `${assetBaseUrl.replace(/\/$/, "")}/`,
        document.baseURI,
      );
      const script = doc.createElement("script");
      script.src = new URL("tinymce.min.js", base).href;
      script.onerror = () =>
        fail(
          new Error("Unable to load the self-hosted TinyMCE 4.7.1 runtime."),
        );
      script.onload = () => {
        if (disposed) return;
        const runtime = win.tinymce;
        if (runtime?.majorVersion !== "4" || runtime.minorVersion !== "7.1") {
          fail(
            new Error(
              "Rich text editor requires the vendored TinyMCE 4.7.1 runtime.",
            ),
          );
          return;
        }
        try {
          Promise.resolve(
            runtime.init({
              ...legacyEmailConfig,
              target: textarea,
              // Fixed viewport avoids loading shifts and contains legacy dialogs/menus.
              plugins: legacyEmailConfig.plugins.replace("autoresize ", ""),
              height: viewportHeight - 2,
              resize: false,
              code_dialog_width: Math.max(160, host.clientWidth - 48),
              code_dialog_height: Math.max(140, viewportHeight - 160),
              language,
              ...(languageUrl
                ? { language_url: new URL(languageUrl, document.baseURI).href }
                : {}),
              readonly: latest.current.readOnly,
              setup: (editor: LegacyEditor) => {
                instance = editor;
                editorRef.current = editor;
                editor.on("init", () => {
                  if (disposed) {
                    editor.remove();
                    return;
                  }
                  clearTimeout(timeout);
                  preserveLegacyStyles(editor);
                  // A controlled value may change while the script and plugins load.
                  if (textarea.value !== htmlRef.current)
                    editor.setContent(htmlRef.current);
                  lastReported = editor.getContent();
                  editor.setDirty(false);
                  resizeObserver = new ResizeObserver(() => {
                    editor.settings.code_dialog_width = Math.max(
                      160,
                      host.clientWidth - 48,
                    );
                  });
                  resizeObserver.observe(host);
                  syncAccessibility();
                  // Keep the theme override after the asynchronously loaded legacy skin.
                  doc.head.append(style);
                  frame.style.visibility = "visible";
                  setStatus("ready");
                  latest.current.onReady?.();
                });
                editor.on(
                  "change input compositionend setcontent undo redo",
                  () => {
                    if (disposed || !editor.initialized || replacingRef.current)
                      return;
                    const next = editor.getContent();
                    if (next !== lastReported) {
                      lastReported = next;
                      htmlRef.current = next;
                      setHtml(next);
                      latest.current.onValueChange?.(next);
                    }
                    const dirty = editor.isDirty();
                    if (dirty !== lastDirty) {
                      lastDirty = dirty;
                      latest.current.onDirtyChange?.(dirty);
                    }
                  },
                );
                editor.on("dirty", () => {
                  if (!disposed && !replacingRef.current) {
                    lastDirty = true;
                    latest.current.onDirtyChange?.(true);
                  }
                });
              },
            }),
          ).catch((error: unknown) =>
            fail(error instanceof Error ? error : new Error(String(error))),
          );
        } catch (error) {
          fail(error instanceof Error ? error : new Error(String(error)));
        }
      };
      doc.head.append(script);
    };
    frame.addEventListener("load", load, { once: true });
    host.append(frame);
    return () => {
      disposed = true;
      clearTimeout(timeout);
      themeObserver?.disconnect();
      resizeObserver?.disconnect();
      frame.removeEventListener("load", load);
      instance?.remove();
      if (editorRef.current === instance) editorRef.current = null;
      frame.remove();
    };
  }, [
    assetBaseUrl,
    language,
    languageUrl,
    viewportHeight,
    attempt,
    syncAccessibility,
  ]);

  React.useEffect(() => {
    if (value === undefined || value === htmlRef.current) return;
    htmlRef.current = value;
    setHtml(value);
    const editor = editorRef.current;
    if (editor?.initialized && value !== editor.getContent()) {
      replacingRef.current = true;
      try {
        editor.setContent(value);
        editor.undoManager.clear();
        editor.setDirty(false);
      } finally {
        replacingRef.current = false;
      }
      latest.current.onDirtyChange?.(false);
    }
  }, [value]);

  React.useEffect(() => {
    syncAccessibility();
  });
  React.useEffect(() => {
    const focusFromLabel = (event: MouseEvent) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("label")?.htmlFor === controlId
      )
        editorRef.current?.focus();
    };
    document.addEventListener("click", focusFromLabel);
    return () => document.removeEventListener("click", focusFromLabel);
  }, [controlId]);

  return (
    <div
      data-slot="rich-text-editor"
      className={cn(
        "relative min-w-0 overflow-hidden rounded-md border border-border bg-background focus-within:ring-2 focus-within:ring-ring/50 data-[invalid=true]:border-input-destructive",
        className,
      )}
      data-invalid={invalid}
      style={{ height: viewportHeight }}
    >
      <div
        ref={hostRef}
        id={`${controlId}-host`}
        role="group"
        aria-label={label}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-busy={status === "loading"}
        className="h-full"
      />
      <textarea
        hidden
        tabIndex={-1}
        id={controlId}
        name={name}
        aria-required={required}
        value={value ?? html}
        readOnly
      />
      {status === "loading" && (
        <div
          role="status"
          className="absolute inset-0 flex items-center justify-center gap-2 bg-background text-sm text-muted-foreground"
        >
          <Spinner size="sm" aria-hidden="true" />
          {messages?.loading ?? "Loading editor…"}
        </div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background p-4">
          <p role="alert" className="text-sm text-destructive">
            {messages?.loadError ?? "The editor could not load. Try again."}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setStatus("loading");
              setAttempt((current) => current + 1);
            }}
          >
            {messages?.retry ?? "Try again"}
          </Button>
        </div>
      )}
    </div>
  );
});
