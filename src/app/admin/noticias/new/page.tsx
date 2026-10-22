import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { NewsForm } from "@/components/admin/NewsForm";
import { upsertNews } from "@/app/admin/actions";

export default async function AdminNuevaNoticiaPage() {
  return (
    <ProtectedAdminPage>
      <NewsForm action={upsertNews} />
    </ProtectedAdminPage>
  );
}
