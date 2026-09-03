import { notFound } from "next/navigation";
import { upsertCommunication } from "@/app/admin/actions";
import { CommunicationForm } from "@/components/admin/CommunicationForm";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { getAdminCommunicationById } from "@/lib/content/communications";

export default async function AdminEditarComunicadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const communication = await getAdminCommunicationById(id);
  if (!communication) notFound();
  return <ProtectedAdminPage><CommunicationForm action={upsertCommunication} communication={communication} title="Editar comunicado" description="Actualiza el texto, el archivo adjunto y el estado de publicación." /></ProtectedAdminPage>;
}
