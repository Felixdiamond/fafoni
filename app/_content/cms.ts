/** Helpers for reading the JSON files in ./data, which the client edits through Pages CMS (.pages.yml).
 *  The CMS may write an emptied field as "", null or leave it out, so every read goes through these. */

/** A string that may be missing. Missing becomes "". */
export const str = (v: unknown): string => (typeof v === "string" ? v : v == null ? "" : String(v));

/** An optional string. Blank becomes undefined so `{x && ...}` checks keep working. */
export const opt = (v: unknown): string | undefined => {
  const s = str(v).trim();
  return s ? s : undefined;
};

/** A number that may arrive as a string. Anything unreadable becomes 0. */
export const num = (v: unknown): number => {
  const n = typeof v === "number" ? v : Number(str(v).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

/** A list that may be missing. */
export const list = <T>(v: readonly T[] | null | undefined): readonly T[] => v ?? [];
