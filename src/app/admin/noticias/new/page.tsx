import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { NewsForm } from "@/components/admin/NewsForm";
import { upsertNews } from "@/app/admin/actions";

export default async function AdminNuevaNoticiaPage() {
  return (
    <ProtectedAdminPage>
      <NewsForm
        action={upsertNews}
        title="Crear noticia"
        description="Redacta una novedad regional y déjala publicada o en borrador para revisarla después."
      />
    </ProtectedAdminPage>
  );
}
