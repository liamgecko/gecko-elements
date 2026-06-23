/** 8-digit numeric id for sandbox prototype rows. */
export function generateSandboxId(): string {
  return String(Math.floor(10_000_000 + Math.random() * 90_000_000))
}
