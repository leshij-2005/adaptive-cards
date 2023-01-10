export default function isObject (value: object | string): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  )
}
