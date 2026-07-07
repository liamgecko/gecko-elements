"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Check, CloudUpload, FileWarning, RefreshCw, Trash2 } from "lucide-react"

import { cn } from "@gecko/ui/lib/utils"
import { Button } from "@gecko/ui/components/button"
import { Spinner } from "@gecko/ui/components/spinner"

type AttachmentState = "default" | "uploading" | "error" | "done"
type AttachmentSize = "default" | "sm" | "xs"

/** Performs the upload. Call `onProgress` (0–100) to drive the progress copy. */
type AttachmentUpload = (
  file: File,
  onProgress: (percent: number) => void
) => void | Promise<void>

const attachmentVariants = cva(
  "group/attachment relative flex w-full min-w-0 items-center gap-3 rounded border bg-card text-card-foreground transition-colors data-[state=default]:border-solid data-[state=error]:border-destructive/30",
  {
    variants: {
      size: {
        default: "p-2 text-sm",
        sm: "gap-2.5 p-1.5 text-xs",
        xs: "gap-2 rounded p-1 text-xs",
      },
      interactive: {
        true: "cursor-pointer hover:bg-muted/25 hover:border-input-hover focus-visible:ring-1 focus-visible:ring-ring/30 focus-visible:outline-none",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      interactive: false,
    },
  }
)

const mediaClass =
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-muted text-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive group-data-[dragging=true]/attachment:bg-blue-100 dark:group-data-[dragging=true]/attachment:bg-blue-900 group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 group-data-[size=xs]/attachment:rounded-md group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5"

type AttachmentProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  /**
   * Force a state (controlled / presentational). When omitted, the component
   * manages its own lifecycle from the `default` (empty) state.
   */
  state?: AttachmentState
  size?: AttachmentSize
  /** Filename shown for uploading/error/done. Defaults to the selected file's name. */
  name?: React.ReactNode
  /** Secondary line. Overrides the per-state default copy. */
  description?: React.ReactNode
  /** Title for the default (empty) state. */
  label?: React.ReactNode
  /** Upload progress percentage for the uploading state (controlled mode). */
  progress?: number
  /** File picker `accept` for the default state. */
  accept?: string
  /** Performs the upload when a file is chosen (self-managed mode). */
  onUpload?: AttachmentUpload
  /** Notified when the managed file changes (selected or cleared). */
  onFileChange?: (file: File | null) => void
  /** Called with chosen/dropped files from the default state. */
  onFiles?: (files: File[]) => void
  /** Trash action. In controlled mode, also controls whether it renders. */
  onRemove?: () => void
  /** Retry action. In controlled mode, also controls whether it renders. */
  onRetry?: () => void
  /** Custom media. Overrides the state-derived icon (e.g. a file-type icon). */
  icon?: React.ReactNode
  disabled?: boolean
}

type ManagedState = {
  state: AttachmentState
  file: File | null
  progress: number
}

const INITIAL_MANAGED: ManagedState = {
  state: "default",
  file: null,
  progress: 0,
}

function formatBytes(bytes: number) {
  if (!bytes) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  )
  return `${(bytes / Math.pow(1024, i)).toFixed(i ? 1 : 0)} ${units[i]}`
}

function getMedia(state: AttachmentState, size: AttachmentSize) {
  switch (state) {
    case "uploading":
      return <Spinner size={size === "xs" ? "xs" : "sm"} />
    case "error":
      return <FileWarning />
    case "done":
      return <Check />
    default:
      return <CloudUpload />
  }
}

function Attachment({
  state: stateProp,
  size = "default",
  name,
  description,
  label = "Click to upload or drag and drop",
  progress,
  accept,
  onUpload,
  onFileChange,
  onFiles,
  onRemove,
  onRetry,
  icon,
  disabled,
  className,
  ...props
}: AttachmentProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [managed, setManaged] = React.useState<ManagedState>(INITIAL_MANAGED)

  const isControlled = stateProp !== undefined
  const state = isControlled ? stateProp : managed.state

  const startUpload = React.useCallback(
    async (file: File) => {
      setManaged({ state: "uploading", file, progress: 0 })
      onFileChange?.(file)
      try {
        if (onUpload) {
          await onUpload(file, (percent) =>
            setManaged((prev) =>
              prev.file === file
                ? { ...prev, progress: Math.round(percent) }
                : prev
            )
          )
        }
        setManaged((prev) =>
          prev.file === file ? { ...prev, state: "done", progress: 100 } : prev
        )
      } catch {
        setManaged((prev) =>
          prev.file === file ? { ...prev, state: "error" } : prev
        )
      }
    },
    [onUpload, onFileChange]
  )

  const handleFiles = (files: File[]) => {
    if (!files.length) return
    onFiles?.(files)
    if (!isControlled) startUpload(files[0])
  }

  const handleRemove = () => {
    onRemove?.()
    if (!isControlled) {
      setManaged(INITIAL_MANAGED)
      onFileChange?.(null)
    }
  }

  const handleRetry = () => {
    onRetry?.()
    if (!isControlled && managed.file) startUpload(managed.file)
  }

  const media = icon != null ? icon : getMedia(state, size)
  const displayName = isControlled ? name : managed.file?.name
  const ariaName = typeof displayName === "string" ? displayName : "attachment"

  const displayDescription = (() => {
    // The smallest variant is a single line and never shows a description.
    if (size === "xs") return null
    // `description` is the hint for the empty state; in controlled mode it can
    // also override the status line. In self-managed mode the status line is
    // always derived from the current state.
    if (state === "default") return description ?? null
    if (isControlled && description != null) return description

    const pct = isControlled ? progress : managed.progress
    switch (state) {
      case "uploading":
        return pct != null ? `Uploading · ${pct}%` : "Uploading"
      case "error":
        return "Upload failed. Try again."
      case "done":
        return !isControlled && managed.file
          ? `Uploaded · ${formatBytes(managed.file.size)}`
          : "Uploaded"
      default:
        return null
    }
  })()

  if (state === "default") {
    const openPicker = () => {
      if (disabled) return
      inputRef.current?.click()
    }

    return (
      <div
        data-slot="attachment"
        data-state={state}
        data-size={size}
        data-dragging={isDragging && !disabled ? "true" : undefined}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        onClick={openPicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            openPicker()
          }
        }}
        onDragOver={(event) => {
          if (disabled) return
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(event) => {
          event.preventDefault()
          setIsDragging(false)
        }}
        onDrop={(event) => {
          if (disabled) return
          event.preventDefault()
          setIsDragging(false)
          handleFiles(Array.from(event.dataTransfer.files ?? []))
        }}
        className={cn(
          attachmentVariants({ size, interactive: true }),
          isDragging &&
            !disabled &&
            "data-[state=default]:border-dashed border-blue-500 bg-blue-50 dark:border-blue-700 dark:bg-blue-950",
          disabled && "pointer-events-none opacity-75",
          className
        )}
        {...props}
      >
        <span className={mediaClass}>{media}</span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate font-medium">{label}</span>
          {displayDescription != null && (
            <span className="mt-0.5 block truncate text-xs text-muted-foreground group-data-[size=sm]/attachment:text-[11px]">
              {displayDescription}
            </span>
          )}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          className="sr-only"
          onChange={(event) => {
            const files = Array.from(event.target.files ?? [])
            event.target.value = ""
            handleFiles(files)
          }}
        />
      </div>
    )
  }

  const showRetry = state === "error" && (isControlled ? !!onRetry : true)
  const showRemove = isControlled ? !!onRemove : true

  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={size}
      className={cn(attachmentVariants({ size }), className)}
      {...props}
    >
      <span className={mediaClass}>{media}</span>
      <span className="min-w-0 flex-1 leading-tight">
        <span
          className={cn(
            "block truncate font-medium",
            state === "uploading" && "shimmer"
          )}
        >
          {displayName}
        </span>
        {displayDescription != null && (
          <span
            className={cn(
              "mt-0.5 block truncate text-xs text-muted-foreground group-data-[size=sm]/attachment:text-[11px]",
              state === "error" && "text-destructive/80"
            )}
          >
            {displayDescription}
          </span>
        )}
      </span>
      {(showRetry || showRemove) && (
        <div className="relative z-10 flex shrink-0 items-center gap-1">
          {showRetry && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={handleRetry}
              aria-label={`Retry ${ariaName}`}
            >
              <RefreshCw />
            </Button>
          )}
          {showRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={handleRemove}
              aria-label={`Remove ${ariaName}`}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { Attachment }
export type { AttachmentProps, AttachmentState, AttachmentSize, AttachmentUpload }
