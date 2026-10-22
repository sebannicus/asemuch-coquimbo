import { notFound } from "next/navigation";
import { upsertCommunication } from "@/app/admin/actions";
import { CommunicationForm } from "@/components/admin/CommunicationForm";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { getAdminCommunicationById } from "@/lib/content/communications";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminEditarComunicadoPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const communication = await getAdminCommunicationById(id);
  if (!communication) notFound();
  return <ProtectedAdminPage><CommunicationForm action={upsertCommunication} communication={communication} /></ProtectedAdminPage>;
}
