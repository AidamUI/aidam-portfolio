import { existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

/**
 * Lets plain Node run the app's TypeScript modules unchanged, so the guestbook
 * test exercises the real code rather than a copy of it. Two things Next and
 * tsc do for free that Node ESM does not:
 *
 *   - the `@/*` path alias from tsconfig;
 *   - extensionless imports (`./schema` meaning `./schema.ts`).
 *
 * Test tooling only. Next resolves both itself and never loads this file.
 */
const SRC = new URL("../src/", import.meta.url);

function isFile(url) {
  const path = fileURLToPath(url);
  return existsSync(path) && statSync(path).isFile();
}

/** Order matters: `@/db` is src/db/index.ts, never the directory itself. */
function firstExisting(base) {
  const candidates = [
    new URL(base.href + ".ts"),
    new URL(base.href + ".tsx"),
    new URL(base.href + "/index.ts"),
    base,
  ];
  return candidates.find(isFile);
}

export function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const found = firstExisting(new URL(specifier.slice(2), SRC));
    if (found) return next(found.href, context);
  }

  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    !/\.[mc]?[jt]sx?$/.test(specifier) &&
    context.parentURL?.startsWith("file:")
  ) {
    const found = firstExisting(new URL(specifier, context.parentURL));
    if (found) return next(found.href, context);
  }

  return next(specifier, context);
}
