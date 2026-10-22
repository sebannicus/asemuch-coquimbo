import { notFound } from "next/navigation";
import { upsertDocument } from "@/app/admin/actions";
import { DocumentForm } from "@/components/admin/DocumentForm";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { requireAdminSession } from "@/lib/auth";
import { getAdminDocumentById } from "@/lib/content/documents";

export default async function AdminEditarDocumentoPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const document = await getAdminDocumentById(id);
  if (!document) notFound();
  return <ProtectedAdminPage><DocumentForm action={upsertDocument} document={document} /></ProtectedAdminPage>;
}
