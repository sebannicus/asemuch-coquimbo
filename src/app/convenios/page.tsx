import type { Metadata } from "next";
import { getPublishedAgreements } from "@/lib/content/agreements";
import ConveniosClient from "./ConveniosClient";

// Revalida cada hora para que los convenios vencidos desaparezcan sin intervencion.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Convenios",
  description:
    "Beneficios y convenios negociados por ASEMUCH Coquimbo y la Confederación Nacional ASEMUCH para sus afiliadas y afiliados a lo largo de Chile.",
  alternates: { canonical: "/convenios" },
};

export default async function ConveniosPage() {
  const localConvenios = await getPublishedAgreements();
  return <ConveniosClient localConvenios={localConvenios} />;
}
