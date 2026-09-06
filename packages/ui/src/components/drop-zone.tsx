"use client";

import * as React from "react";
import Upload01Icon from "@hugeicons/core-free-icons/Upload01Icon";
import Trash2 from "@hugeicons/core-free-icons/Delete02Icon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

import { cn } from "@gecko/ui/lib/utils";
import { useControllableState } from "@gecko/ui/hooks/use-controllable-state";
import { Button, buttonVariants } from "@gecko/ui/components/button";
import { Input } from "@gecko/ui/components/input";

const DEFAULT_DESCRIPTION = "Or click to browse";
const DEFAULT_ERROR =
  "The selection couldn't be added. Check the file requirements and try again.";

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const power = Math.min(
    Math.floor(Math.log10(bytes) / Math.log10(1024)),
    units.length - 1,
  );
  const value = bytes / Math.pow(1024, power);
  const decimals = power === 0 ? 0 : 1;
  return `${value.toFixed(decimals)} ${units[power]}`;
}

export type DropZoneProps = {
  value?: File[];
  defaultValue?: File[];
  onValueChange?: (files: File[]) => void;

  multiple?: boolean;
  accept?: string;

  disabled?: boolean;
  className?: string;

  id?: string;
  name?: string;

  browseLabel?: string;
  label?: string;
  description?: string;
  error?: string;

  /** Passed to the native file input. `error` also sets this state. */
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
};

export function DropZone({
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  accept,
  disabled,
  className,
  id,
  name,
  browseLabel,
  label,
  description = DEFAULT_DESCRIPTION,
  error,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: DropZoneProps) {
  const invalid =
    Boolean(error) || ariaInvalid === true || ariaInvalid === "true";
  const displayLabel =
    label ?? (multiple ? "Drag & drop files here" : "Drag & drop a file here");
  const displayDescription = invalid ? (error ?? DEFAULT_ERROR) : description;
  const displayBrowseLabel =
    browseLabel ?? (multiple ? "Browse files" : "Browse file");

  const [files, setFiles] = useControllableState<File[]>({
    value,
    defaultValue: defaultValue ?? [],
    onChange: onValueChange,
  });

  const dragCounterRef = React.useRef(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const addFiles = React.useCallback(
    (incoming: File[]) => {
      if (!incoming.length) return;
      const next = multiple ? [...files, ...incoming] : incoming.slice(0, 1);
      setFiles(next);
    },
    [files, multiple, setFiles],
  );

  const handleDragEnter = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (disabled) return;
      dragCounterRef.current += 1;
      setIsDragging(true);
    },
    [disabled],
  );

  const handleDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (disabled) return;
      dragCounterRef.current = Math.max(0, dragCounterRef.current - 1);
      if (dragCounterRef.current === 0) {
        setIsDragging(false);
      }
    },
    [disabled],
  );

  const handleDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (disabled) {
        e.dataTransfer.dropEffect = "none";
        return;
      }
      e.dataTransfer.dropEffect = "copy";
      setIsDragging(true);
    },
    [disabled],
  );

  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragCounterRef.current = 0;
      setIsDragging(false);
      if (disabled) return;
      const dropped = Array.from(e.dataTransfer.files ?? []);
      if (dropped.length) addFiles(dropped);
    },
    [addFiles, disabled],
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files ?? []);
      // Allow selecting the same file twice.
      e.target.value = "";
      if (selected.length) addFiles(selected);
    },
    [addFiles],
  );

  const removeAtIndex = React.useCallback(
    (index: number) => {
      if (disabled) return;
      const next = files.filter((_, i) => i !== index);
      setFiles(next);
    },
    [disabled, files, setFiles],
  );

  const generatedInputId = React.useId();
  const labelId = React.useId();
  const descriptionId = React.useId();
  const inputId = id ?? generatedInputId;
  const describedBy = [descriptionId, ariaDescribedBy]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("w-full", className)}>
      <Input
        id={inputId}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        className="peer sr-only"
        aria-labelledby={labelId}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
      />

      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "group/drop-zone relative flex flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-border bg-transparent p-6 text-center outline-none transition-[color,background-color,border-color,box-shadow] hover:border-input-hover",
          "peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50",
          invalid &&
            "border-input-destructive bg-destructive/5 peer-focus-visible:border-input-destructive peer-focus-visible:ring-input-destructive/20 dark:bg-destructive/10 dark:peer-focus-visible:ring-input-destructive/40",
          isDragging && !disabled && !invalid && "border-ring bg-muted",
          disabled &&
            "cursor-not-allowed bg-muted opacity-75 hover:border-border",
        )}
      >
        <label
          htmlFor={inputId}
          className={cn(
            "absolute inset-0 z-10 cursor-pointer rounded-[inherit]",
            disabled && "cursor-not-allowed",
          )}
        >
          <span className="sr-only">{displayLabel}</span>
        </label>

        <div className="flex flex-col items-center gap-2">
          <div className="bg-background border border-border shadow-md text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors">
            <HugeiconsIcon icon={Upload01Icon} className="size-6" aria-hidden />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p
              id={labelId}
              className={cn(
                "text-sm font-medium",
                invalid ? "text-destructive" : "text-foreground",
              )}
            >
              {displayLabel}
            </p>
            <p
              id={descriptionId}
              aria-live="polite"
              className={cn(
                "text-2xs",
                invalid ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {displayDescription}
            </p>
          </div>
        </div>

        <span
          aria-hidden="true"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-2 w-fit group-hover/drop-zone:bg-muted group-hover/drop-zone:text-foreground",
            disabled && "pointer-events-none bg-muted opacity-75",
          )}
        >
          {displayBrowseLabel}
        </span>
      </div>

      <p className="sr-only" role="status">
        {files.length === 0
          ? "No files selected."
          : `${files.length} ${files.length === 1 ? "file" : "files"} selected.`}
      </p>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2" aria-label="Selected files">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center justify-between gap-4 rounded-sm border border-border bg-background px-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </div>
                <div className="text-2xs text-muted-foreground">
                  {formatBytes(file.size)}
                </div>
              </div>

              <Button
                type="button"
                variant="ghost-destructive"
                size="icon"
                className="size-7"
                disabled={disabled}
                onClick={() => removeAtIndex(index)}
                aria-label={`Remove ${file.name}`}
              >
                <HugeiconsIcon icon={Trash2} className="size-4" aria-hidden />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
