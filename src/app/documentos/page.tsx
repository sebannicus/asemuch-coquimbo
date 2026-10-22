import type { Metadata } from "next";
import { getPublishedDocuments } from "@/lib/content/documents";
import DocumentosClient from "./DocumentosClient";

export const metadata: Metadata = {
  title: "Documentos",
  description:
    "Leyes, guías y dictámenes de la Contraloría General de la República organizados para los funcionarios municipales de ASEMUCH Coquimbo.",
  alternates: { canonical: "/documentos" },
};

export default async function DocumentosPage() {
  const localDocuments = await getPublishedDocuments();
  return <DocumentosClient localDocuments={localDocuments} />;
}
