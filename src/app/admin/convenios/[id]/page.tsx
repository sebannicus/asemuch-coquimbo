import { notFound } from "next/navigation";
import { upsertAgreement } from "@/app/admin/actions";
import { AgreementForm } from "@/components/admin/AgreementForm";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { requireAdminSession } from "@/lib/auth";
import { getAdminAgreementById } from "@/lib/content/agreements";

export default async function AdminEditarConvenioPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const agreement = await getAdminAgreementById(id);
  if (!agreement) notFound();
  return <ProtectedAdminPage><AgreementForm action={upsertAgreement} agreement={agreement} /></ProtectedAdminPage>;
}
