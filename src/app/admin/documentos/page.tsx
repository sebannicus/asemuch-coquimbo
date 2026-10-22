import Link from "next/link";
import { deleteDocument } from "@/app/admin/actions";
import { AdminContentList } from "@/components/admin/AdminContentList";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { AdminPageHeader, adminPrimaryButtonClassName } from "@/components/admin/ui";
import { requireAdminSession } from "@/lib/auth";
import { getAdminDocumentsList } from "@/lib/content/documents";

export default async function AdminDocumentosPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;
  await requireAdminSession();
  const documents = await getAdminDocumentsList();

  return (
    <ProtectedAdminPage>
      <section className="space-y-6">
        <AdminNotice ok={ok} />
        <AdminPageHeader
          title="Documentos"
          description="Actas, circulares y otros PDF. Los publicados aparecen en la página Documentos del sitio."
          action={<Link href="/admin/documentos/new" className={adminPrimaryButtonClassName}>+ Subir un documento</Link>}
        />
        <AdminContentList
          items={documents.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.summary,
            status: item.status,
            meta: <>Tipo: {item.document_type}</>,
            editHref: `/admin/documentos/${item.id}`,
            publicHref: item.file_url,
            publicLabel: "Ver PDF",
          }))}
          deleteAction={deleteDocument}
          emptyText="Todavía no hay documentos."
          newHref="/admin/documentos/new"
          newLabel="+ Subir el primer documento"
        />
      </section>
    </ProtectedAdminPage>
  );
}
