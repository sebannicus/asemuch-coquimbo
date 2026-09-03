import { upsertCommunication } from "@/app/admin/actions";
import { CommunicationForm } from "@/components/admin/CommunicationForm";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";

export default async function AdminNuevoComunicadoPage() {
  return <ProtectedAdminPage><CommunicationForm action={upsertCommunication} title="Crear comunicado" description="Redacta un comunicado, adjunta un archivo o combina ambas opciones." /></ProtectedAdminPage>;
}
