export const scale = (min: number, max: number, n: number): number => {
  const length = max - min
  return min + (length * n / 100)
}
