import Link from "next/link";
import { deleteCommunication } from "@/app/admin/actions";
import { AdminContentList } from "@/components/admin/AdminContentList";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { AdminPageHeader, adminPrimaryButtonClassName } from "@/components/admin/ui";
import { requireAdminSession } from "@/lib/auth";
import { getAdminCommunicationsList } from "@/lib/content/communications";

export default async function AdminComunicadosPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;
  await requireAdminSession();
  const communications = await getAdminCommunicationsList();

  return (
    <ProtectedAdminPage>
      <section className="space-y-6">
        <AdminNotice ok={ok} />
        <AdminPageHeader
          title="Comunicados"
          description="Pronunciamientos oficiales, con texto, archivo adjunto o ambos."
          action={<Link href="/admin/comunicados/new" className={adminPrimaryButtonClassName}>+ Escribir un comunicado</Link>}
        />
        <AdminContentList
          items={communications.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.excerpt,
            status: item.status,
            meta: item.attachment_name ? <>📎 {item.attachment_name}</> : null,
            editHref: `/admin/comunicados/${item.id}`,
            publicHref: `/comunicados/${item.slug}`,
          }))}
          deleteAction={deleteCommunication}
          emptyText="Todavía no hay comunicados."
          newHref="/admin/comunicados/new"
          newLabel="+ Escribir el primer comunicado"
        />
      </section>
    </ProtectedAdminPage>
  );
}
