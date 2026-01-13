export function parseLeadingNumber(input: string): number | null {
  const m = input.match(/^(\d+(\.\d*)?|\.\d+)/);
  if (!m) return null;

  const num = Number(m[0]);
  if (Number.isNaN(num)) return null;
  return num;
}
