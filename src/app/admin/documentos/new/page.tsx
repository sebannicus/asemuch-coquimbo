import { upsertDocument } from "@/app/admin/actions";
import { DocumentForm } from "@/components/admin/DocumentForm";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";

export default async function AdminNuevoDocumentoPage() {
  return (
    <ProtectedAdminPage>
      <DocumentForm action={upsertDocument} />
    </ProtectedAdminPage>
  );
}
