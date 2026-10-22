"use client";

import { usePathname } from "next/navigation";

// Header y footer públicos no se muestran dentro del panel /admin, que tiene su propio menú.
export default function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return children;
}
