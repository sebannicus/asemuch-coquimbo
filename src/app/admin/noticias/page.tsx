import Link from "next/link";
import { deleteNews } from "@/app/admin/actions";
import { AdminContentList } from "@/components/admin/AdminContentList";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { AdminPageHeader, adminPrimaryButtonClassName } from "@/components/admin/ui";
import { requireAdminSession } from "@/lib/auth";
import { getAdminNewsList } from "@/lib/content/news";

export default async function AdminNoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;
  await requireAdminSession();
  const news = await getAdminNewsList();

  return (
    <ProtectedAdminPage>
      <section className="space-y-6">
        <AdminNotice ok={ok} />
        <AdminPageHeader
          title="Noticias"
          description="Las 3 noticias publicadas más recientes aparecen en la portada del sitio."
          action={<Link href="/admin/noticias/new" className={adminPrimaryButtonClassName}>+ Escribir una noticia</Link>}
        />
        <AdminContentList
          items={news.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.excerpt,
            status: item.status,
            editHref: `/admin/noticias/${item.id}`,
            publicHref: `/noticias/${item.slug}`,
          }))}
          deleteAction={deleteNews}
          emptyText="Todavía no hay noticias."
          newHref="/admin/noticias/new"
          newLabel="+ Escribir la primera noticia"
        />
      </section>
    </ProtectedAdminPage>
  );
}
