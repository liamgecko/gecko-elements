import type { FormDesignerPage } from "./form-designer-pages"

const DRAFT_STORAGE_KEY = "sandbox:form-designer:draft"
const formStorageKey = (formId: string) => `sandbox:form-designer:${formId}`

function readPages(key: string): FormDesignerPage[] | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed) || parsed.length === 0) return null
    return parsed as FormDesignerPage[]
  } catch {
    return null
  }
}

function writePages(key: string, pages: FormDesignerPage[]) {
  try {
    sessionStorage.setItem(key, JSON.stringify(pages))
  } catch {
    // Ignore quota / private-mode failures in the sandbox.
  }
}

export function loadFormDesignerPages(formId: string): FormDesignerPage[] | null {
  return readPages(formStorageKey(formId))
}

export function loadDraftFormDesignerPages(): FormDesignerPage[] | null {
  return readPages(DRAFT_STORAGE_KEY)
}

export function saveFormDesignerPages(
  formId: string,
  pages: FormDesignerPage[],
) {
  writePages(formStorageKey(formId), pages)
}

export function saveDraftFormDesignerPages(pages: FormDesignerPage[]) {
  writePages(DRAFT_STORAGE_KEY, pages)
}

/** Move create-flow draft pages onto the saved form id. */
export function promoteDraftFormDesignerPages(
  formId: string,
): FormDesignerPage[] | null {
  const pages = readPages(DRAFT_STORAGE_KEY)
  if (!pages) return null
  writePages(formStorageKey(formId), pages)
  try {
    sessionStorage.removeItem(DRAFT_STORAGE_KEY)
  } catch {
    // Ignore.
  }
  return pages
}
