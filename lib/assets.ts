import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Returns the public path if the file exists in /public at build time, otherwise undefined.
 * Lets components show a placeholder until a real asset is dropped in.
 * Server components only.
 */
export function publicAsset(path: string): string | undefined {
  return existsSync(join(process.cwd(), "public", path)) ? path : undefined;
}
