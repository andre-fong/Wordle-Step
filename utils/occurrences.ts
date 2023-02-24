export function occurrences(str: string, substr: string): number {
  return str.split(substr).length - 1;
}
