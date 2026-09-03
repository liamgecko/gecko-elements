"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "@gecko/ui/components/toast";

import { cn } from "@gecko/ui/lib/utils";
import { Button } from "@gecko/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip";

type CodeInlineProps = {
  variant?: "inline";
  className?: string;
  children: React.ReactNode;
};

const codeLanguages = [
  "text",
  "tsx",
  "ts",
  "jsx",
  "js",
  "json",
  "bash",
  "css",
  "html",
  "markdown",
] as const;

export type CodeLanguage = (typeof codeLanguages)[number];

type CodeBlockProps = {
  variant: "block";
  className?: string;
  code: string;
  language: CodeLanguage;
  showCopyButton?: boolean;
  copyLabel?: string;
};

export type CodeProps = CodeInlineProps | CodeBlockProps;

type Shiki = typeof import("shiki");
type Highlighter = Awaited<ReturnType<Shiki["createHighlighter"]>>;

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({ createHighlighter }) =>
      Promise.resolve(
        createHighlighter({
          themes: ["github-light", "github-dark"],
          langs: [...codeLanguages],
        }),
      ),
    );
  }
  return highlighterPromise;
}

function useIsDarkMode() {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const el = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(el.classList.contains("dark"));
    });
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.top = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

export function Code(props: CodeProps) {
  if (!("variant" in props) || props.variant === "inline") {
    const { className, children } = props;
    return (
      <code
        className={cn(
          "rounded bg-muted text-destructive dark:text-rose-400 px-1.5 py-0.5 font-mono text-xs",
          className,
        )}
      >
        {children}
      </code>
    );
  }

  return <CodeBlock {...(props as CodeBlockProps)} />;
}

function CodeBlock({
  className,
  code,
  language,
  showCopyButton = false,
  copyLabel = "Copy",
}: CodeBlockProps) {
  const isDark = useIsDarkMode();
  const highlightKey = `${isDark ? "dark" : "light"}:${language}:${code}`;
  const [highlighted, setHighlighted] = React.useState<{
    key: string;
    html: string;
  } | null>(null);
  const [isCopying, setIsCopying] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const highlighter = await getHighlighter();
        const rendered = highlighter.codeToHtml(code, {
          lang: language,
          theme: isDark ? "github-dark" : "github-light",
          transformers: [
            {
              pre(node) {
                if (node.properties && "style" in node.properties) {
                  delete (node.properties as Record<string, unknown>).style;
                }
              },
            },
          ],
        });

        if (!cancelled) {
          setHighlighted({ key: highlightKey, html: rendered });
        }
      } catch {
        if (!cancelled) {
          setHighlighted({
            key: highlightKey,
            html: `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`,
          });
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [code, highlightKey, isDark, language]);

  return (
    <div
      className={cn(
        "bg-muted/40 border-border relative isolate overflow-hidden rounded-md border",
        className,
      )}
    >
      {showCopyButton ? (
        <div className="absolute end-2 top-2 z-10">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={copyLabel}
                  disabled={isCopying}
                  onClick={async () => {
                    try {
                      setIsCopying(true);
                      await copyText(code);
                      setCopied(true);
                      toast.add({ title: "Copied", type: "success" });
                      window.setTimeout(() => setCopied(false), 1200);
                    } catch {
                      toast.add({ title: "Failed to copy", type: "error" });
                    } finally {
                      setIsCopying(false);
                    }
                  }}
                >
                  {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
                </Button>
              }
            />
            <TooltipContent side="bottom">
              <p>{copied ? "Copied" : copyLabel}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ) : null}

      <div
        className={cn(
          "overflow-auto outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50",
          "[&_.shiki]:m-0 [&_.shiki]:bg-transparent [&_.shiki]:p-4",
          "[&_.shiki]:font-mono [&_.shiki]:text-xs [&_.shiki_code]:block [&_.shiki_code]:min-w-max",
          showCopyButton && "me-10",
        )}
        tabIndex={0}
        role="region"
        aria-label="Code snippet"
        dangerouslySetInnerHTML={{
          __html:
            (highlighted?.key === highlightKey ? highlighted.html : null) ??
            `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`,
        }}
      />
    </div>
  );
}
