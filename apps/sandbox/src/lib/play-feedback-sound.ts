const audioBySrc = new Map<string, HTMLAudioElement>()

export function playFeedbackSound(src: string) {
  let audio = audioBySrc.get(src)
  if (!audio) {
    audio = new Audio(src)
    audioBySrc.set(src, audio)
  }

  audio.currentTime = 0
  void audio.play().catch(() => {})
}
