import * as React from "react";
import { Archive, X } from "lucide-react";
import { toast } from "@gecko/ui/components/toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@gecko/ui/components/alert-dialog";

import { formsRepository } from "@/data/repositories/formsRepository";

import type { Form } from "./forms-data";

type FormArchiveDialogProps = {
  forms: Form[] | null;
  onOpenChange: (open: boolean) => void;
  onArchived?: () => void;
};

export function FormArchiveDialog({
  forms,
  onOpenChange,
  onArchived,
}: FormArchiveDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [targetForms, setTargetForms] = React.useState<Form[]>([]);
  const [isArchiving, setIsArchiving] = React.useState(false);

  React.useEffect(() => {
    if (!forms?.length) return;
    setTargetForms(forms);
    setOpen(true);
  }, [forms]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen || isArchiving) return;

    setOpen(false);
    onOpenChange(false);
  };

  const confirmArchive = async () => {
    if (!targetForms.length) return;

    setIsArchiving(true);

    try {
      await Promise.all(
        targetForms.map((form) => formsRepository.archiveForm(form.id)),
      );
      toast.add({
        title:
          targetForms.length === 1
            ? "Form archived successfully"
            : `${targetForms.length} forms archived successfully`,
        type: "success",
      });
      setOpen(false);
      onOpenChange(false);
      onArchived?.();
    } catch (err) {
      toast.add({
        title: err instanceof Error ? err.message : "Failed to archive form",
        type: "error",
      });
    } finally {
      setIsArchiving(false);
    }
  };

  if (!targetForms.length) return null;

  const isSingle = targetForms.length === 1;

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isSingle ? "Archive form?" : "Archive forms?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isSingle
              ? `${targetForms[0].name} will be moved to archived forms. You can restore it later from the Archived forms tab.`
              : `${targetForms.length} forms will be moved to archived forms. You can restore them later from the Archived forms tab.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isArchiving}>
            <X aria-hidden />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => void confirmArchive()}
            disabled={isArchiving}
          >
            <Archive aria-hidden />
            {isSingle ? "Archive form" : "Archive forms"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
