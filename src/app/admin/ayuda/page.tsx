import type { Metadata } from "next";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";

export const metadata: Metadata = {
  title: "Ayuda | Panel Admin",
};

const SECTIONS: Array<{ title: string; items: React.ReactNode[] }> = [
  {
    title: "Lo más importante: publicar o guardar para después",
    items: [
      <>Al final de cada formulario hay dos botones: <strong>“Publicar en el sitio”</strong> (todos lo ven de inmediato) y <strong>“Guardar sin publicar”</strong> (queda guardado solo aquí, para terminarlo después).</>,
      <>Para sacar algo del sitio sin borrarlo: entra a <strong>Editar</strong> y presiona <strong>“Quitar del sitio”</strong>.</>,
      <><strong>Eliminar</strong> lo borra para siempre. El panel siempre pregunta antes de hacerlo.</>,
      <>Cuando algo se guarda bien, aparece un aviso verde que dice <strong>“Listo”</strong>.</>,
    ],
  },
  {
    title: "Publicar una noticia",
    items: [
      <>En el Inicio presiona <strong>“Publicar una noticia”</strong>.</>,
      <>Escribe el título, elige las fotos desde tu computador y escribe el texto.</>,
      <>La primera foto queda como portada (marcada con ⭐). Puedes quitar cualquier foto con el botón <strong>Quitar</strong>.</>,
      <>Para separar párrafos, presiona Enter dos veces (deja una línea en blanco).</>,
      <>Si el panel avisa que las fotos pesan mucho, publica con menos fotos y después entra a <strong>Editar</strong> para agregar el resto.</>,
    ],
  },
  {
    title: "Publicar un comunicado",
    items: [
      <>Puedes escribir el texto, adjuntar un archivo (PDF, Word o Excel) o hacer las dos cosas.</>,
      <>Si el archivo pesa más de 4 MB, guárdalo como PDF o redúcelo en <a href="https://www.ilovepdf.com/es/comprimir_pdf" target="_blank" rel="noreferrer" className="font-bold text-[#0c71c3] underline">ilovepdf.com</a>.</>,
    ],
  },
  {
    title: "Subir un documento PDF",
    items: [
      <>Para actas, circulares, reglamentos y otros documentos oficiales.</>,
      <>Elige el PDF, escribe su nombre y elige el tipo de documento de la lista.</>,
      <>Aparece en la página <strong>Documentos</strong> del sitio, en la sección “ASEMUCH Coquimbo”.</>,
    ],
  },
  {
    title: "Agregar un convenio",
    items: [
      <>Escribe el nombre de la empresa y cuál es el beneficio. Lo demás es opcional.</>,
      <>Si le pones fecha en <strong>“Vigente hasta”</strong>, el convenio se quita solo del sitio cuando vence.</>,
    ],
  },
  {
    title: "Mi contraseña",
    items: [
      <>Para cambiarla, presiona <strong>“Mi contraseña”</strong> en el menú.</>,
      <>Si la olvidas: en la pantalla para entrar presiona <strong>“Olvidé mi contraseña”</strong>. Te llegará un correo; ábrelo <strong>en el mismo computador y navegador</strong>.</>,
      <>Cuando termines, presiona <strong>“Salir”</strong> arriba a la derecha, sobre todo si el computador es compartido.</>,
    ],
  },
];

export default function AdminAyudaPage() {
  return (
    <ProtectedAdminPage>
      <section className="space-y-6">
        <div className="rounded-3xl border-2 border-[#e1ebf6] bg-white p-6">
                    <h2 className="text-3xl font-extrabold text-[#0c2340] sm:text-4xl" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
            Cómo usar el panel
          </h2>
          <p className="mt-2 max-w-2xl text-lg text-[#3d4756]">
            Haz clic en cada tema para abrirlo.
          </p>
        </div>

        <div className="space-y-3">
          {SECTIONS.map((section, index) => (
            <details key={section.title} open={index === 0} className="group rounded-2xl border-2 border-[#e1ebf6] bg-white">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-xl font-bold text-[#0c2340]">
                {section.title}
                <span className="text-3xl text-[#0c71c3] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <ul className="space-y-3 border-t-2 border-[#eef4fb] px-6 py-5 text-lg leading-relaxed text-[#3d4756]">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#0c71c3]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
    </ProtectedAdminPage>
  );
}
