import Link from "next/link";
import { deleteCommunication } from "@/app/admin/actions";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getAdminCommunicationsList } from "@/lib/content/communications";

export default async function AdminComunicadosPage() {
  const communications = await getAdminCommunicationsList();

  return <ProtectedAdminPage><section className="space-y-6">
    <div className="flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-[#d9e6f5] bg-white p-6">
      <div><p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3]">Comunicados</p><h2 className="mt-2 text-3xl font-extrabold text-[#0c2340]" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>Gestionar comunicados</h2><p className="mt-2 max-w-2xl text-sm text-[#5d6675]">Publica pronunciamientos propios con texto, archivo adjunto o ambos.</p></div>
      <Link href="/admin/comunicados/new" className="inline-flex rounded-xl bg-[#0c71c3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2ea3f2]">Nuevo comunicado</Link>
    </div>
    <div className="overflow-hidden rounded-3xl border border-[#d9e6f5] bg-white">
      <div className="grid grid-cols-[1.5fr_1fr_130px] gap-4 border-b border-[#d9e6f5] px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#5d6675]"><span>Comunicado</span><span>Estado</span><span>Acciones</span></div>
      {communications.length ? communications.map((item) => <div key={item.id} className="grid grid-cols-[1.5fr_1fr_130px] gap-4 border-b border-[#eef4fb] px-6 py-5 last:border-b-0"><div><p className="font-semibold text-[#0c2340]">{item.title}</p><p className="mt-1 text-sm text-[#5d6675]">{item.excerpt}</p></div><div><StatusBadge status={item.status} /></div><div className="flex items-center gap-3 text-sm font-semibold"><Link href={`/admin/comunicados/${item.id}`} className="text-[#0c71c3] hover:text-[#2ea3f2]">Editar</Link><form action={deleteCommunication}><input type="hidden" name="id" value={item.id} /><button type="submit" className="text-rose-700 hover:text-rose-500">Eliminar</button></form></div></div>) : <div className="px-6 py-10 text-sm text-[#5d6675]">Todavía no hay comunicados creados.</div>}
    </div>
  </section></ProtectedAdminPage>;
}
