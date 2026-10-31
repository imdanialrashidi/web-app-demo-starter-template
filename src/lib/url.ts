/** The deployment base, always with a leading and trailing slash. */
const rawBase = import.meta.env.BASE_URL;
export const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

/** Prefix a root-relative path with the deployment base. */
export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  if (path === "/") return base;
  return `${base}${path.replace(/^\//, "")}`;
}

