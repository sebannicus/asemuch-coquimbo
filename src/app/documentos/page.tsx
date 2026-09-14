import type { Metadata } from "next";
import DocumentosClient from "./DocumentosClient";

export const metadata: Metadata = {
  title: "Documentos",
  description:
    "Leyes, guías y dictámenes de la Contraloría General de la República organizados para los funcionarios municipales de ASEMUCH Coquimbo.",
  alternates: { canonical: "/documentos" },
};

export default function DocumentosPage() {
  return <DocumentosClient />;
}
