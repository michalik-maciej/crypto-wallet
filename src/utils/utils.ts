export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export function compareStrings(strA: string, strB: string) {
  if (strA.toUpperCase() < strB.toUpperCase()) return -1
  if (strA.toUpperCase() > strB.toUpperCase()) return 1
  return 0
}

export function timestampToDate(timestamp: number) {
  const rawDate = new Date(timestamp)
  const date = `${rawDate.getUTCFullYear()}-${String(
    rawDate.getUTCMonth() + 1
  ).padStart(2, '0')}-${String(rawDate.getUTCDate()).padStart(2, '0')}`

  return date
}
