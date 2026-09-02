import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { PlaceholderContentPage } from "@/components/admin/PlaceholderContentPage";

export default async function AdminDocumentosPage() {
  return (
    <ProtectedAdminPage>
      <PlaceholderContentPage
        eyebrow="Documentos"
        title="Gestión de documentos"
        description="La estructura del panel ya quedó sembrada para que mañana conectemos subida de PDFs, tipo de documento y publicación al sitio público."
        ctaHref="/admin/documentos/new"
        ctaLabel="Preparar formulario"
        emptyTitle="Base del módulo lista"
        emptyDescription="Siguiente paso: crear formulario con archivo, resumen y estado de publicación, conectado a Supabase Storage."
      />
    </ProtectedAdminPage>
  );
}
