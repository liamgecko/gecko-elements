"use client"

import * as React from "react"
import { CloudUpload, Trash2 } from "lucide-react"

import { cn } from "@gecko/ui/lib/utils"
import { Button } from "@gecko/ui/components/button"
import { Input } from "@gecko/ui/components/input"

const DEFAULT_BROWSE_LABEL = "Browse files"
const DEFAULT_LABEL = "Drag & drop files here"
const DEFAULT_DESCRIPTION = "Or click to browse"

const DEFAULT_INVALID_LABEL = "This file couldn't be added."
const DEFAULT_INVALID_DESCRIPTION =
  "Check the file type and size, then try again."

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B"
  const units = ["B", "KB", "MB", "GB", "TB"]
  const power = Math.min(Math.floor(Math.log10(bytes) / Math.log10(1024)), units.length - 1)
  const value = bytes / Math.pow(1024, power)
  const decimals = power === 0 ? 0 : 1
  return `${value.toFixed(decimals)} ${units[power]}`
}

export type DropZoneProps = {
  value?: File[]
  defaultValue?: File[]
  onValueChange?: (files: File[]) => void

  multiple?: boolean
  accept?: string

  disabled?: boolean
  className?: string

  id?: string
  name?: string

  browseLabel?: string
  label?: string
  description?: string

  /** Overrides built-in error copy when `aria-invalid` is true. */
  invalidLabel?: string
  invalidDescription?: string

  /** Passed to the hidden file input. When true, built-in error label/description and styling apply. */
  "aria-invalid"?: boolean | "true" | "false"
  "aria-describedby"?: string
}

export function DropZone({
  value,
  defaultValue,
  onValueChange,
  multiple = true,
  accept,
  disabled,
  className,
  id,
  name,
  browseLabel = DEFAULT_BROWSE_LABEL,
  label = DEFAULT_LABEL,
  description = DEFAULT_DESCRIPTION,
  invalidLabel,
  invalidDescription,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: DropZoneProps) {
  const invalid =
    ariaInvalid === true || ariaInvalid === "true"

  const displayLabel = invalid
    ? (invalidLabel ?? DEFAULT_INVALID_LABEL)
    : label
  const displayDescription = invalid
    ? (invalidDescription ?? DEFAULT_INVALID_DESCRIPTION)
    : description

  const isControlled = value !== undefined
  const [internalFiles, setInternalFiles] = React.useState<File[]>(
    defaultValue ?? []
  )
  const files = isControlled ? value ?? [] : internalFiles

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const dragCounterRef = React.useRef(0)
  const [isDragging, setIsDragging] = React.useState(false)

  const setFiles = React.useCallback(
    (next: File[]) => {
      if (!isControlled) setInternalFiles(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const openPicker = React.useCallback(() => {
    if (disabled) return
    inputRef.current?.click()
  }, [disabled])

  const addFiles = React.useCallback(
    (incoming: File[]) => {
      const next = multiple ? [...files, ...incoming] : incoming.slice(0, 1)
      setFiles(next)
    },
    [files, multiple, setFiles]
  )

  const handleDragEnter = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return
      e.preventDefault()
      dragCounterRef.current += 1
      setIsDragging(true)
    },
    [disabled]
  )

  const handleDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return
      e.preventDefault()
      dragCounterRef.current = Math.max(0, dragCounterRef.current - 1)
      if (dragCounterRef.current === 0) {
        setIsDragging(false)
      }
    },
    [disabled]
  )

  const handleDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return
      e.preventDefault()
      e.dataTransfer.dropEffect = "copy"
      setIsDragging(true)
    },
    [disabled]
  )

  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (disabled) return
      e.preventDefault()
      dragCounterRef.current = 0
      setIsDragging(false)
      const dropped = Array.from(e.dataTransfer.files ?? [])
      if (dropped.length) addFiles(dropped)
    },
    [addFiles, disabled]
  )

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files ?? [])
      // Allow selecting the same file twice.
      e.target.value = ""
      if (selected.length) addFiles(selected)
    },
    [addFiles]
  )

  const removeAtIndex = React.useCallback(
    (index: number) => {
      if (disabled) return
      const next = files.filter((_, i) => i !== index)
      setFiles(next)
    },
    [disabled, files, setFiles]
  )

  const labelId = React.useId()
  const descriptionId = React.useId()
  const labelledBy = `${labelId} ${descriptionId}`

  return (
    <div className={cn("w-full", className)}>
      <Input
        ref={(node) => {
          inputRef.current = node
        }}
        id={id}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        className="sr-only"
        aria-labelledby={labelledBy}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
      />

      <div
        role="region"
        aria-labelledby={labelledBy}
        aria-disabled={disabled ? "true" : undefined}
        onClick={openPicker}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "rounded-sm border border-dashed border-border bg-transparent transition-colors",
          "flex flex-col items-center justify-center gap-2 p-6 text-center",
          invalid &&
            "border-input-destructive bg-destructive/5 dark:bg-destructive/10",
          isDragging &&
            !disabled &&
            !invalid &&
            "border-blue-500 bg-blue-50 dark:border-blue-700 dark:bg-blue-950",
          disabled && "pointer-events-none cursor-not-allowed opacity-75"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className="bg-background border border-border shadow-md text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors">
            <CloudUpload className="size-6" aria-hidden />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p
              id={labelId}
              className={cn(
                "text-sm font-medium",
                invalid ? "text-destructive" : "text-foreground"
              )}
            >
              {displayLabel}
            </p>
            <p
              id={descriptionId}
              className={cn(
                "text-xs",
                invalid ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {displayDescription}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-2 w-fit"
          disabled={disabled}
          onClick={(e) => {
            // Prevent double triggering when button is clicked within the wrapper.
            e.stopPropagation()
            openPicker()
          }}
        >
          {browseLabel}
        </Button>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center justify-between gap-4 rounded-sm border border-border bg-background px-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatBytes(file.size)}
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                disabled={disabled}
                onClick={() => removeAtIndex(index)}
                aria-label={`Remove ${file.name}`}
              >
                <Trash2 className="size-4" aria-hidden />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

