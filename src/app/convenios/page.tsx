import type { Metadata } from "next";
import ConveniosClient from "./ConveniosClient";

export const metadata: Metadata = {
  title: "Convenios",
  description:
    "Beneficios y convenios negociados por ASEMUCH Coquimbo y la Confederación Nacional ASEMUCH para sus afiliadas y afiliados a lo largo de Chile.",
};

export default function ConveniosPage() {
  return <ConveniosClient />;
}
