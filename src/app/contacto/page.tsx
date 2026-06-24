"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { CONTACT_INFO } from "@/components/SiteData";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", municipio: "", mensaje: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <PageHeader
        title="Contacto"
        subtitle="Comunícate con la sede regional. Estamos para orientarte y representarte."
        breadcrumbs={[{ label: "Contacto" }]}
      />

      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Formulario */}
            <div>
              <h2
                className="text-2xl font-extrabold text-[#0c2340] mb-6"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                Envíanos un mensaje
              </h2>

              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2.5} className="w-8 h-8">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0c2340]" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-[#5d6675] max-w-sm">
                    Gracias por contactarnos. Un representante de ASEMUCH Coquimbo te responderá dentro de 1–2 días hábiles.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ nombre: "", email: "", municipio: "", mensaje: "" }); }}
                    className="mt-2 text-sm text-[#0c71c3] font-semibold hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0c2340] mb-1.5">
                        Nombre completo *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        placeholder="Juan Pérez"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e3e9f1] text-sm text-[#0c2340] placeholder:text-[#5d6675]/50 focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0c2340] mb-1.5">
                        Correo electrónico *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="juan@municipio.cl"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e3e9f1] text-sm text-[#0c2340] placeholder:text-[#5d6675]/50 focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0c2340] mb-1.5">
                      Municipio donde trabaja
                    </label>
                    <input
                      type="text"
                      value={form.municipio}
                      onChange={(e) => setForm({ ...form, municipio: e.target.value })}
                      placeholder="Municipalidad de La Serena"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e3e9f1] text-sm text-[#0c2340] placeholder:text-[#5d6675]/50 focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0c2340] mb-1.5">
                      Mensaje *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      placeholder="Describe tu consulta o inquietud..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e3e9f1] text-sm text-[#0c2340] placeholder:text-[#5d6675]/50 focus:outline-none focus:border-[#0c71c3] focus:ring-1 focus:ring-[#0c71c3] transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="self-start px-8 py-3 rounded-xl bg-[#0c71c3] hover:bg-[#2ea3f2] text-white font-semibold text-sm transition-colors"
                  >
                    Enviar mensaje
                  </button>
                  <p className="text-xs text-[#5d6675]">
                    * Campos obligatorios. Tu información es confidencial y no será compartida con terceros.
                  </p>
                </form>
              )}
            </div>

            {/* Info de contacto */}
            <div className="flex flex-col gap-6">
              <h2
                className="text-2xl font-extrabold text-[#0c2340]"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                Información de contacto
              </h2>

              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                    ),
                    label: "Dirección",
                    value: `${CONTACT_INFO.direccion}, ${CONTACT_INFO.region}`,
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.21 12 19.79 19.79 0 0 1 1.14 3.4 2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    ),
                    label: "Teléfono",
                    value: CONTACT_INFO.telefono,
                    href: `tel:${CONTACT_INFO.telefono.replace(/\s/g, "")}`,
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                      </svg>
                    ),
                    label: "Correo",
                    value: CONTACT_INFO.email,
                    href: `mailto:${CONTACT_INFO.email}`,
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                    ),
                    label: "Horario de atención",
                    value: CONTACT_INFO.horario,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0c71c3] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#5d6675] uppercase tracking-wide">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-[#0c2340] font-medium hover:text-[#0c71c3] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#0c2340] font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Destacado afiliación */}
              <div className="mt-4 p-6 rounded-2xl" style={{ backgroundColor: "#e7edf5", border: "0.8px solid #e3e9f1" }}>
                <h3 className="font-bold text-[#0c2340] mb-2" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                  ¿Eres funcionario municipal?
                </h3>
                <p className="text-sm text-[#5d6675] leading-relaxed mb-4">
                  Si trabajas en una municipalidad de la Región de Coquimbo, puedes afiliarte a ASEMUCH y acceder a todos nuestros servicios de representación y defensa.
                </p>
                <a
                  href={`mailto:${CONTACT_INFO.email}?subject=Solicitud de afiliación`}
                  className="inline-block px-5 py-2.5 rounded-xl bg-[#0c71c3] hover:bg-[#2ea3f2] text-white font-semibold text-sm transition-colors"
                >
                  Solicitar información de afiliación
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
