export default function isResponseError(
  error: unknown
): error is { data: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).data === 'string'
  )
}
