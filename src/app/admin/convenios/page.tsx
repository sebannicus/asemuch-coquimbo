import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";
import { PlaceholderContentPage } from "@/components/admin/PlaceholderContentPage";

export default async function AdminConveniosPage() {
  return (
    <ProtectedAdminPage>
      <PlaceholderContentPage
        eyebrow="Convenios"
        title="Gestión de convenios"
        description="Esta sección ya quedó abierta para administrar convenios activos, imagen de apoyo, detalle del beneficio y posible archivo adjunto."
        ctaHref="/admin/convenios/new"
        ctaLabel="Preparar formulario"
        emptyTitle="Estructura base creada"
        emptyDescription="Siguiente paso: conectar campos de beneficio, vigencia, código promocional y archivos del convenio."
      />
    </ProtectedAdminPage>
  );
}
