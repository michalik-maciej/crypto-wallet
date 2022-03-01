export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export function weightedAverage(nums: number[], weights: number[]) {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] += nums[i] * w
      acc[1] += w
      return acc
    },
    [0, 0]
  )
  return sum / weightSum
}

export function compareStrings(strA: string, strB: string) {
  if (strA.toUpperCase() < strB.toUpperCase()) return -1
  if (strA.toUpperCase() > strB.toUpperCase()) return 1
  return 0
}
