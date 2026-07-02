/** Strip optional wrapping quotes from env values (common when pasting into hosting dashboards). */
export function readServerEnv(name: string): string | undefined {
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;

  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1).trim();
  }

  return raw;
}
