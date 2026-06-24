"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { CONTACT_INFO } from "@/components/SiteData";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "placeholder";

const PASOS = [
  {
    num: "01",
    titulo: "Revisa los requisitos",
    descripcion:
      "Debes ser funcionario municipal de una de las 15 comunas de la Región de Coquimbo, ya sea de planta o a contrata. El proceso es simple y completamente gratuito.",
  },
  {
    num: "02",
    titulo: "Completa el formulario",
    descripcion:
      "Llena el formulario de afiliación con tus datos de contacto y tu municipio. Te confirmaremos la recepción por correo electrónico dentro de 1–2 días hábiles.",
  },
  {
    num: "03",
    titulo: "Bienvenida formal",
    descripcion:
      "Un representante de la directiva regional tomará contacto contigo para completar el proceso de ingreso y explicarte todos los beneficios de ser parte de ASEMUCH.",
  },
];

const REQUISITOS = [
  "Ser funcionario/a municipal (planta o contrata)",
  "Trabajar en un municipio de la Región de Coquimbo",
  "No tener restricciones legales para afiliarse",
  "Voluntad de participar en la vida gremial",
];

type FormState = "idle" | "sending" | "success" | "error";

export default function AfiliarPage() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    municipio: "",
    cargo: "",
    tipo_contrato: "",
    mensaje: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: `Solicitud de afiliación de ${form.nombre} — ${form.municipio}`,
          _tipo: "Afiliación ASEMUCH Coquimbo",
        }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <main>
      <PageHeader
        title="Afíliate a ASEMUCH"
        subtitle="Únete al gremio que representa y defiende los derechos de más de 1.200 funcionarios municipales en la Región de Coquimbo."
        breadcrumbs={[{ label: "Afiliarse" }]}
      />

      {/* Pasos */}
      <section className="py-16" style={{ backgroundColor: "#e7edf5" }}>
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#0c71c3] uppercase tracking-widest">El proceso</span>
            <h2
              className="mt-2 text-3xl font-extrabold text-[#0c2340]"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Afiliarte es simple y gratuito
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PASOS.map((paso) => (
              <div
                key={paso.num}
                className="bg-white rounded-2xl p-8"
                style={{ border: "0.8px solid #e3e9f1" }}
              >
                <span
                  className="text-4xl font-extrabold text-[#0c71c3]/20 leading-none"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  {paso.num}
                </span>
                <h3
                  className="mt-3 text-lg font-bold text-[#0c2340] mb-3"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  {paso.titulo}
                </h3>
                <p className="text-sm text-[#5d6675] leading-relaxed">{paso.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario + requisitos */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Sidebar requisitos */}
            <div className="lg:col-span-1">
              <h3
                className="text-xl font-bold text-[#0c2340] mb-6"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                Requisitos
              </h3>
              <ul className="flex flex-col gap-3 mb-8">
                {REQUISITOS.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0c71c3] flex items-center justify-center shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3 h-3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#5d6675] leading-snug">{req}</span>
                  </li>
                ))}
              </ul>

              <div className="p-5 rounded-2xl" style={{ backgroundColor: "#e7edf5" }}>
                <p className="text-sm font-bold text-[#0c2340] mb-1">¿Tienes dudas antes de afiliarte?</p>
                <p className="text-sm text-[#5d6675] mb-3">
                  Escríbenos directamente y te orientamos sin compromiso.
                </p>
                <a
                  href={`mailto:${CONTACT_INFO.email}?subject=Consulta%20afiliaci%C3%B3n%20ASEMUCH%20Coquimbo`}
                  className="text-sm font-semibold text-[#0c71c3] hover:underline"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Formulario */}
            <div className="lg:col-span-2">
              <h2
                className="text-2xl font-extrabold text-[#0c2340] mb-6"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                Formulario de afiliación
              </h2>

              {state === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center rounded-2xl" style={{ backgroundColor: "#e7edf5" }}>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2.5} className="w-8 h-8">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0c2340]" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                    ¡Solicitud enviada!
                  </h3>
                  <p className="text-[#5d6675] max-w-sm text-sm">
                    Gracias <strong>{form.nombre}</strong>. Hemos recibido tu solicitud y nos pondremos en contacto contigo a la brevedad en <strong>{form.email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {state === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0">
                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      Hubo un error. Por favor intenta de nuevo o contáctanos directamente.
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0c2340] mb-1.5">Nombre completo *</label>
                      <input required type="text" value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        placeholder="Juan Pérez Soto"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e3e9f1] text-sm text-[#0c2340] placeholder:text-[#5d6675]/50 focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0c2340] mb-1.5">Correo electrónico *</label>
                      <input required type="email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="juan@municipio.cl"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e3e9f1] text-sm text-[#0c2340] placeholder:text-[#5d6675]/50 focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0c2340] mb-1.5">Teléfono</label>
                      <input type="tel" value={form.telefono}
                        onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                        placeholder="+56 9 1234 5678"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e3e9f1] text-sm text-[#0c2340] placeholder:text-[#5d6675]/50 focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0c2340] mb-1.5">Municipio donde trabaja *</label>
                      <input required type="text" value={form.municipio}
                        onChange={(e) => setForm({ ...form, municipio: e.target.value })}
                        placeholder="Municipalidad de La Serena"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e3e9f1] text-sm text-[#0c2340] placeholder:text-[#5d6675]/50 focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0c2340] mb-1.5">Cargo o función</label>
                      <input type="text" value={form.cargo}
                        onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                        placeholder="Administrativo, Inspector, Auxiliar..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e3e9f1] text-sm text-[#0c2340] placeholder:text-[#5d6675]/50 focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0c2340] mb-1.5">Tipo de contrato</label>
                      <select value={form.tipo_contrato}
                        onChange={(e) => setForm({ ...form, tipo_contrato: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e3e9f1] text-sm text-[#0c2340] focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition bg-white">
                        <option value="">Selecciona una opción</option>
                        <option value="Planta">Planta</option>
                        <option value="A contrata">A contrata</option>
                        <option value="Honorarios">Honorarios</option>
                        <option value="No sé">No sé / Consultar</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0c2340] mb-1.5">Comentarios o preguntas</label>
                    <textarea rows={3} value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      placeholder="Puedes incluir dudas, situaciones particulares o cómo nos conociste..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e3e9f1] text-sm text-[#0c2340] placeholder:text-[#5d6675]/50 focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition resize-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="self-start inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#0c71c3] hover:bg-[#2ea3f2] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
                  >
                    {state === "sending" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Enviando…
                      </>
                    ) : "Solicitar afiliación"}
                  </button>
                  <p className="text-xs text-[#5d6675]">
                    * Campos obligatorios. Tus datos son confidenciales y no serán compartidos con terceros.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
