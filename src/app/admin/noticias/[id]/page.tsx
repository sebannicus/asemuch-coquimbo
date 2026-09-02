import { notFound } from "next/navigation";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { NewsForm } from "@/components/admin/NewsForm";
import { upsertNews } from "@/app/admin/actions";
import { getAdminNewsById } from "@/lib/content/news";

export default async function AdminEditarNoticiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getAdminNewsById(id);

  if (!news) {
    notFound();
  }

  return (
    <ProtectedAdminPage>
      <NewsForm
        action={upsertNews}
        news={news}
        title="Editar noticia"
        description="Ajusta título, resumen, imagen y contenido antes de volver a publicarla."
        isFallback={news.source === "fallback"}
      />
    </ProtectedAdminPage>
  );
}
