export function flatten<T>(values: Array<T | T[]>): T[] {
  return ([] as Array<T | T[]>).concat(...values) as T[];
}
