import { logoutAdmin } from "@/app/admin/actions";

export function AdminHeader({ userEmail }: { userEmail: string }) {
  return (
    <header className="border-b border-[#d9e6f5] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3]">
            Panel Administrador
          </p>
          <h1
            className="text-xl font-extrabold text-[#0c2340]"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            ASEMUCH Coquimbo
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-[#5d6675]">{userEmail}</p>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex rounded-xl border border-[#d9e6f5] px-4 py-2 text-sm font-semibold text-[#0c2340] transition-colors hover:border-[#0c71c3] hover:text-[#0c71c3]"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
