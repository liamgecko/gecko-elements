"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { Check, CloudUpload, FileWarning, RefreshCw, Trash2 } from "lucide-react"

import { cn } from "@gecko/ui/lib/utils"
import { Button } from "@gecko/ui/components/button"
import { Spinner } from "@gecko/ui/components/spinner"

type AttachmentState = "empty" | "uploading" | "error" | "done"

/** Performs the upload. Call `onProgress` with a value from 0 to 100. */
type AttachmentUpload = (
  file: File,
  onProgress: (percent: number) => void
) => void | Promise<void>

type AttachmentBaseProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  /** Secondary copy for the empty state or a status override in controlled mode. */
  description?: React.ReactNode
  /** Title for the empty file field. */
  label?: React.ReactNode
  /** File picker hint. Validate the selected file inside `onUpload` or `onFileChange`. */
  accept?: string
  /** Replaces the library-owned state icon. */
  icon?: React.ReactNode
  /** Notified when a file is selected or the managed file is cleared. */
  onFileChange?: (file: File | null) => void
  /** Called when the remove action is selected. */
  onRemove?: () => void
  /** Called when the retry action is selected in controlled mode. */
  onRetry?: () => void
  disabled?: boolean
}

type ManagedAttachmentProps = AttachmentBaseProps & {
  /** Omit `state` to let Attachment own the upload lifecycle. */
  state?: never
  /** Required in managed mode. Throw to enter the error state. */
  onUpload: AttachmentUpload
  name?: never
  progress?: never
}

type ControlledEmptyAttachmentProps = AttachmentBaseProps & {
  state: "empty"
  onUpload?: never
  name?: never
  progress?: never
  onFileChange: (file: File | null) => void
}

type ControlledFileAttachmentProps = AttachmentBaseProps & {
  state: Exclude<AttachmentState, "empty">
  onUpload?: never
  /** Filename shown in the uploading, error, or done state. */
  name: React.ReactNode
  /** Upload percentage for the controlled uploading state. */
  progress?: number
}

type AttachmentProps =
  | ManagedAttachmentProps
  | ControlledEmptyAttachmentProps
  | ControlledFileAttachmentProps

type ManagedState = {
  state: AttachmentState
  file: File | null
  progress: number
}

const INITIAL_MANAGED: ManagedState = {
  state: "empty",
  file: null,
  progress: 0,
}

const attachmentVariants = cva(
  "group/attachment relative flex w-full min-w-0 items-center gap-3 rounded border bg-card p-2 text-sm text-card-foreground transition-colors data-[state=error]:border-destructive/30",
  {
    variants: {
      interactive: {
        true: "cursor-pointer hover:border-input-hover hover:bg-muted/25 has-[input:focus-visible]:ring-1 has-[input:focus-visible]:ring-ring/30",
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
    },
  }
)

const mediaClass =
  "relative flex aspect-square w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-muted text-foreground group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive group-data-[dragging=true]/attachment:bg-blue-100 dark:group-data-[dragging=true]/attachment:bg-blue-900 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"

function clampProgress(percent: number) {
  if (!Number.isFinite(percent)) return 0
  return Math.min(100, Math.max(0, Math.round(percent)))
}

function formatBytes(bytes: number) {
  if (!bytes) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  )
  return `${(bytes / Math.pow(1024, index)).toFixed(index ? 1 : 0)} ${units[index]}`
}

function getMedia(state: AttachmentState) {
  switch (state) {
    case "uploading":
      return <Spinner size="sm" />
    case "error":
      return <FileWarning />
    case "done":
      return <Check />
    default:
      return <CloudUpload />
  }
}

function Attachment(props: AttachmentProps) {
  const {
    state: stateProp,
    name,
    description,
    label = "Choose a file or drag and drop",
    progress,
    accept,
    onUpload,
    onFileChange,
    onRemove,
    onRetry,
    icon,
    disabled,
    className,
    ...rootProps
  } = props

  const [isDragging, setIsDragging] = React.useState(false)
  const [managed, setManaged] = React.useState<ManagedState>(INITIAL_MANAGED)

  const isControlled = stateProp !== undefined
  const state = isControlled ? stateProp : managed.state

  const startUpload = React.useCallback(
    async (file: File) => {
      if (!onUpload) return

      setManaged({ state: "uploading", file, progress: 0 })

      try {
        await onUpload(file, (percent) =>
          setManaged((previous) =>
            previous.file === file
              ? { ...previous, progress: clampProgress(percent) }
              : previous
          )
        )
        setManaged((previous) =>
          previous.file === file
            ? { ...previous, state: "done", progress: 100 }
            : previous
        )
      } catch {
        setManaged((previous) =>
          previous.file === file
            ? { ...previous, state: "error" }
            : previous
        )
      }
    },
    [onUpload]
  )

  const handleFile = (file: File) => {
    onFileChange?.(file)
    if (!isControlled) void startUpload(file)
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
    if (!isControlled && managed.file) void startUpload(managed.file)
  }

  const media = icon != null ? icon : getMedia(state)
  const displayName = isControlled ? name : managed.file?.name
  const ariaName = typeof displayName === "string" ? displayName : "attachment"
  const inputLabel = typeof label === "string" ? label : "Choose a file"

  const displayDescription = (() => {
    if (state === "empty") return description ?? null
    if (isControlled && description != null) return description

    const currentProgress = isControlled
      ? progress == null
        ? undefined
        : clampProgress(progress)
      : managed.progress

    switch (state) {
      case "uploading":
        return currentProgress != null
          ? `Uploading · ${currentProgress}%`
          : "Uploading"
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

  if (state === "empty") {
    return (
      <div
        data-slot="attachment"
        data-state={state}
        data-dragging={isDragging && !disabled ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
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
          const file = event.dataTransfer.files?.[0]
          if (file) handleFile(file)
        }}
        className={cn(
          attachmentVariants({ interactive: true }),
          isDragging &&
            !disabled &&
            "border-blue-500 bg-blue-50 dark:border-blue-700 dark:bg-blue-950",
          disabled && "cursor-not-allowed opacity-75",
          className
        )}
        {...rootProps}
      >
        <input
          type="file"
          accept={accept}
          disabled={disabled}
          aria-label={inputLabel}
          className="absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          onChange={(event) => {
            const file = event.target.files?.[0]
            event.target.value = ""
            if (file) handleFile(file)
          }}
        />
        <span className={mediaClass} aria-hidden="true">
          {media}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate font-medium">{label}</span>
          {displayDescription != null && (
            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
              {displayDescription}
            </span>
          )}
        </span>
      </div>
    )
  }

  const showRetry = state === "error" && (isControlled ? !!onRetry : true)
  const showRemove = isControlled ? !!onRemove : true

  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-disabled={disabled ? "true" : undefined}
      className={cn(
        attachmentVariants(),
        disabled && "opacity-75",
        className
      )}
      {...rootProps}
    >
      <span className={mediaClass} aria-hidden="true">
        {media}
      </span>
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
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={cn(
              "mt-0.5 block truncate text-xs text-muted-foreground",
              state === "error" && "text-destructive/80"
            )}
          >
            {displayDescription}
          </span>
        )}
      </span>
      {(showRetry || showRemove) && (
        <div className="relative z-20 flex shrink-0 items-center gap-1">
          {showRetry && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              disabled={disabled}
              onClick={handleRetry}
              aria-label={`Retry ${ariaName}`}
            >
              <RefreshCw aria-hidden="true" />
            </Button>
          )}
          {showRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              disabled={disabled}
              onClick={handleRemove}
              aria-label={`Remove ${ariaName}`}
            >
              <Trash2 aria-hidden="true" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { Attachment }
export type {
  AttachmentProps,
  AttachmentState,
  AttachmentUpload,
  ManagedAttachmentProps,
  ControlledEmptyAttachmentProps,
  ControlledFileAttachmentProps,
}
