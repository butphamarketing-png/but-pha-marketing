/** Paths where marketing chrome (mascot, visitor tracking) should be hidden. */
export function isInternalAppPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return (
    pathname.startsWith("/adminbp") ||
    pathname.startsWith("/cms") ||
    pathname === "/admin"
  );
}
