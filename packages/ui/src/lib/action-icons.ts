import PlusIcon from "@hugeicons/core-free-icons/PlusIcon";
import XIcon from "@hugeicons/core-free-icons/XIcon";
import CheckCheckIcon from "@hugeicons/core-free-icons/CheckCheckIcon";
import Copy01Icon from "@hugeicons/core-free-icons/Copy01Icon";
import Delete02Icon from "@hugeicons/core-free-icons/Delete02Icon";
import DeletePutBackIcon from "@hugeicons/core-free-icons/DeletePutBackIcon";
import Edit02Icon from "@hugeicons/core-free-icons/Edit02Icon";
import SquareLockCheck01Icon from "@hugeicons/core-free-icons/SquareLockCheck01Icon";
import CheckmarkSquare03Icon from "@hugeicons/core-free-icons/CheckmarkSquare03Icon";

import Settings01Icon from "@hugeicons/core-free-icons/Settings01Icon";
import Tick02Icon from "@hugeicons/core-free-icons/Tick02Icon";

/** Shared action meaning. Labels, permissions and handlers belong to the app. */
export const actionIcons = {
  create: PlusIcon,
  add: PlusIcon,
  close: XIcon,
  edit: Edit02Icon,
  update: CheckCheckIcon,
  remove: Delete02Icon,
  copy: Copy01Icon,
  actions: Settings01Icon,
  confirm: Tick02Icon,
  cancel: XIcon,
  save: CheckCheckIcon,
  clone: Copy01Icon,
  delete: Delete02Icon,
  // Existing specialised keys remain available for compatibility.
  restore: DeletePutBackIcon,
  discard: Delete02Icon,
  keepEditing: Edit02Icon,
  lock: SquareLockCheck01Icon,
  updatePermissions: SquareLockCheck01Icon,
  submitForApproval: CheckmarkSquare03Icon,
} as const;
export type ActionIconName = keyof typeof actionIcons;
