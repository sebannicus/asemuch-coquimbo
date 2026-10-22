import Link from "next/link";
import { deleteAgreement } from "@/app/admin/actions";
import { AdminContentList } from "@/components/admin/AdminContentList";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { AdminPageHeader, adminPrimaryButtonClassName } from "@/components/admin/ui";
import { requireAdminSession } from "@/lib/auth";
import { getAdminAgreementsList } from "@/lib/content/agreements";

function formatShortDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
}

export default async function AdminConveniosPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;
  await requireAdminSession();
  const agreements = await getAdminAgreementsList();
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(new Date());

  return (
    <ProtectedAdminPage>
      <section className="space-y-6">
        <AdminNotice ok={ok} />
        <AdminPageHeader
          title="Convenios"
          description="Beneficios para afiliados. Se muestran en la página Convenios mientras estén publicados y vigentes."
          action={<Link href="/admin/convenios/new" className={adminPrimaryButtonClassName}>+ Agregar un convenio</Link>}
        />
        <AdminContentList
          items={agreements.map((item) => {
            const isExpired = Boolean(item.valid_until && item.valid_until < today);

            return {
              id: item.id,
              title: item.title,
              description: item.summary,
              status: item.status,
              meta: item.valid_until ? (
                isExpired ? (
                  <strong className="text-rose-700">⏰ Venció el {formatShortDate(item.valid_until)}: ya no se muestra en el sitio.</strong>
                ) : (
                  <>Vigente hasta el {formatShortDate(item.valid_until)}</>
                )
              ) : null,
              editHref: `/admin/convenios/${item.id}`,
              publicHref: isExpired ? null : "/convenios",
            };
          })}
          deleteAction={deleteAgreement}
          emptyText="Todavía no hay convenios."
          newHref="/admin/convenios/new"
          newLabel="+ Agregar el primer convenio"
        />
      </section>
    </ProtectedAdminPage>
  );
}
