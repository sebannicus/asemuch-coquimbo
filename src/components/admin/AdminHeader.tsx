import Image from "next/image";
import Link from "next/link";
import { logoutAdmin } from "@/app/admin/actions";

export function AdminHeader({ userEmail }: { userEmail: string }) {
  return (
    <header className="border-b-2 border-[#d9e6f5] bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/images/logo.webp" alt="" width={48} height={48} className="h-12 w-12" />
          <span>
            <span className="block text-sm font-bold uppercase tracking-widest text-[#0c71c3]">Panel de administración</span>
            <span className="block text-2xl font-extrabold text-[#0c2340]" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
              ASEMUCH Coquimbo
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <p className="hidden text-base text-[#3d4756] md:block">{userEmail}</p>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center rounded-lg border-2 border-[#b9cde3] px-5 text-lg font-bold text-[#0c2340] transition-colors hover:border-[#0c71c3] hover:text-[#0c71c3]"
            >
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
