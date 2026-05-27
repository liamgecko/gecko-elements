function ordinal(n: number) {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`
  const mod10 = n % 10
  if (mod10 === 1) return `${n}st`
  if (mod10 === 2) return `${n}nd`
  if (mod10 === 3) return `${n}rd`
  return `${n}th`
}

export function formatLastRefreshed(iso: string) {
  const d = new Date(iso)
  const day = ordinal(d.getDate())
  const month = d.toLocaleString(undefined, { month: "long" })
  const year = d.getFullYear()
  const time = d
    .toLocaleString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\s/g, " ")
  return `Last refreshed @ ${day} ${month} ${year} at ${time}`
}
