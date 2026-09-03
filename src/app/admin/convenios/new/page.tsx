import { upsertAgreement } from "@/app/admin/actions";
import { AgreementForm } from "@/components/admin/AgreementForm";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";

export default async function AdminNuevoConvenioPage() {
  return (
    <ProtectedAdminPage>
      <AgreementForm action={upsertAgreement} />
    </ProtectedAdminPage>
  );
}
