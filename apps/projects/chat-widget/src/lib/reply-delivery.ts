export function wait(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"))
      return
    }

    const timeoutId = window.setTimeout(() => resolve(), ms)

    const onAbort = () => {
      window.clearTimeout(timeoutId)
      reject(new DOMException("Aborted", "AbortError"))
    }

    signal?.addEventListener("abort", onAbort, { once: true })
  })
}

function splitChunks(text: string) {
  return text.match(/\S+\s*/g) ?? [text]
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError"
}

/** Stream text in word-sized chunks for AI replies. */
export async function streamText(
  text: string,
  onUpdate: (value: string) => void,
  options?: { chunkDelayMs?: number; signal?: AbortSignal }
) {
  const delayMs = options?.chunkDelayMs ?? 28
  const chunks = splitChunks(text)
  let value = ""

  try {
    for (const chunk of chunks) {
      if (options?.signal?.aborted) return
      value += chunk
      onUpdate(value)
      await wait(delayMs, options?.signal)
    }
  } catch (error) {
    if (!isAbortError(error)) throw error
  }
}

/** Deliver a full agent reply after a short thinking delay. */
export async function deliverAgentReply(
  text: string,
  onComplete: (value: string) => void,
  options?: { delayMs?: number; signal?: AbortSignal }
) {
  try {
    await wait(options?.delayMs ?? 900, options?.signal)
  } catch (error) {
    if (isAbortError(error)) return
    throw error
  }

  if (options?.signal?.aborted) return
  onComplete(text)
}
