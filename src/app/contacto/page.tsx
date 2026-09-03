import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Comunícate con ASEMUCH Coquimbo: dirección, teléfono, correo y formulario de contacto de la sede regional en Varela 1090, Coquimbo.",
};

export default function ContactoPage() {
  return <ContactoClient />;
}
