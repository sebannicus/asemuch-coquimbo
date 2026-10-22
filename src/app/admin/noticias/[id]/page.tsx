import { notFound } from "next/navigation";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { NewsForm } from "@/components/admin/NewsForm";
import { upsertNews } from "@/app/admin/actions";
import { getAdminNewsById } from "@/lib/content/news";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminEditarNoticiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
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
        isFallback={news.source === "fallback"}
      />
    </ProtectedAdminPage>
  );
}
