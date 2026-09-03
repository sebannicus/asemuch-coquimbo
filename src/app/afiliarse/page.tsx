import type { Metadata } from "next";
import AfiliarseClient from "./AfiliarseClient";

export const metadata: Metadata = {
  title: "Afiliarse",
  description:
    "Afíliate a ASEMUCH Coquimbo: revisa los requisitos y completa el formulario para unirte al gremio que representa y defiende a los funcionarios municipales de la Región de Coquimbo.",
};

export default function AfiliarsePage() {
  return <AfiliarseClient />;
}
