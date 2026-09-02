import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, BookOpenCheck, Download, FileText, HeartHandshake, Landmark, Scale, ShieldCheck, Users } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import NewsSection from "@/components/NewsSection";

const stats = [
  { value: "+100", label: "años de historia gremial" },
  { value: "+300", label: "organizaciones comunales de base a nivel nacional" },
];

const highlights = [
  "Representamos a funcionarios municipales de Coquimbo con trabajo gremial activo y cercano.",
  "Integramos la historia de ASEMUCH con una proyección local enfocada en derechos, bienestar y organización.",
  "Mantenemos vínculo con beneficios y convenios de ASEMUCH Coquimbo y la Confederación Nacional.",
];

const directors = [
  {
    title: "Directiva 2025 a 2027",
    description:
      "Equipo dirigente que articula representación, coordinación interna y presencia gremial en Coquimbo.",
    image: "/images/rosa-renney-cristian-tapia-asemuch-coquimbo.webp",
  },
  {
    title: "Trabajo con organizaciones aliadas",
    description:
      "Participación en encuentros, capacitaciones y actividades junto a actores del mundo municipal y sindical.",
    image: "/images/asemuch-junto-a-la-cut-y-hero.webp",
  },
];

const benefits = [
  {
    title: "Asesoría legal gratuita",
    text: "Acceso a orientación jurídica en materia de Estatuto Administrativo Municipal, licencias médicas, calificaciones y derechos laborales.",
    icon: ShieldCheck,
  },
  {
    title: "Representación gremial",
    text: "Te representamos ante tu municipio, la Contraloría y organismos del Estado en materias laborales, administrativas y disciplinarias.",
    icon: Scale,
  },
  {
    title: "Capacitación permanente",
    text: "Talleres, seminarios y cursos sobre derechos funcionarios, prevención, liderazgo y desarrollo profesional para todos los afiliados.",
    icon: BookOpenCheck,
  },
  {
    title: "Red de convenios",
    text: "Descuentos en salud, óptica, farmacia, capacitación y más, a través de convenios negociados colectivamente para afiliados y grupo familiar.",
    icon: HeartHandshake,
  },
  {
    title: "Negociación colectiva",
    text: "Participamos activamente en la negociación de remuneraciones, beneficios y condiciones laborales a nivel municipal y regional.",
    icon: Users,
  },
  {
    title: "Solidaridad en casos urgentes",
    text: "Apoyo y acompañamiento a afiliados que enfrentan sumarios, desvinculaciones injustificadas o vulneraciones de sus derechos.",
    icon: HeartHandshake,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative isolate overflow-hidden">
        <HeroCarousel />
        <div id="inicio" className="relative mx-auto grid min-h-[640px] w-full max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:min-h-[680px] lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div className="max-w-3xl text-white">
              <div className="mb-6 inline-flex rounded-full border border-white/16 bg-white/12 px-4 py-2 text-sm font-medium backdrop-blur">
                Funcionarios municipales de Coquimbo
              </div>
              <h1 className="font-heading text-[clamp(2.75rem,6.2vw,5.5rem)] font-black leading-[0.94] tracking-[-0.03em] text-balance text-white">
                Más de 100 años de historia gremial al servicio de Coquimbo.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84 sm:text-xl">
                ASEMUCH Coquimbo representa, acompaña y organiza a funcionarios municipales de Coquimbo
                con una mirada local, activa y comprometida con sus derechos.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#afiliate"
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-base font-bold text-slate-900 transition hover:translate-y-[-1px]"
                >
                  Quiero afiliarme
                </a>
                <a
                  href="#noticias"
                  className="inline-flex items-center justify-center rounded-full border border-white/22 bg-white/8 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/14"
                >
                  Ver noticias y comunicados
                </a>
              </div>
            </div>

            <div className="grid gap-4 lg:justify-self-end lg:pb-8">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[1.6rem] border border-white/16 bg-white/14 p-5 text-white shadow-[0_30px_80px_rgba(6,16,33,0.28)] backdrop-blur-md"
                >
                  <p className="font-heading text-4xl font-black sm:text-5xl">{stat.value}</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/82 sm:text-base">{stat.label}</p>
                </article>
              ))}
            </div>
        </div>
      </section>

      <section id="quienes-somos" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg">
              <Image
                src="/images/reunion-asemuch-funcionarios.webp"
                alt="Actividad de ASEMUCH Coquimbo con funcionarios municipales"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg sm:translate-y-10">
              <Image
                src="/images/junto-a-asemuch-nacional-y-hero.webp"
                alt="Dirigentes de ASEMUCH Coquimbo en actividad gremial"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
              <Landmark className="h-4 w-4" />
              Quiénes Somos
            </div>
            <h2 className="mt-5 font-heading text-4xl font-black tracking-[-0.02em] text-balance sm:text-5xl">
              Una organización gremial con identidad local y trayectoria histórica.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              ASEMUCH Coquimbo reúne a funcionarios municipales de Coquimbo para defender derechos,
              fortalecer la organización interna y proyectar una voz gremial consistente en el ámbito local.
            </p>
            <div className="mt-8 grid gap-4">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[1.5rem] border border-border bg-card/90 px-5 py-4 shadow-sm"
                >
                  <p className="leading-7 text-card-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Misión</p>
          <h3 className="mt-4 font-heading text-3xl font-black">Misión Asociación de Funcionarios Municipales de Coquimbo</h3>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Representar y defender los derechos de funcionarios municipales de Coquimbo, promoviendo
            condiciones laborales dignas, organización activa y participación gremial permanente.
          </p>
        </article>
        <article className="rounded-[2rem] border border-primary/20 bg-[color:color-mix(in_oklab,var(--color-primary)_7%,white)] p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Visión</p>
          <h3 className="mt-4 font-heading text-3xl font-black">Organización gremial referente en Coquimbo</h3>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Consolidarnos como una organización gremial referente en Coquimbo, reconocida por su
            capacidad de representación, cercanía con sus bases y aporte a la dignidad del trabajo municipal.
          </p>
        </article>
      </section>

      <section id="directiva" className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Directiva</p>
            <h2 className="mt-4 font-heading text-4xl font-black tracking-[-0.02em] sm:text-5xl">Representación activa en el período 2025 a 2027</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {directors.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
              <div className="relative min-h-80">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[1.8rem] border border-border bg-[linear-gradient(135deg,rgba(28,84,146,0.08),rgba(242,198,78,0.13))] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Accesos rápidos</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/afiliarse", label: "Afiliarse", text: "Únete al gremio - es gratis", icon: Users },
              { href: "/dictamenes", label: "Dictámenes", text: "Resoluciones de Contraloría", icon: Scale },
              { href: "/documentos", label: "Documentos", text: "Circulares, actas y guías", icon: FileText },
              { href: "/contacto", label: "Contacto", text: "Comunícate con nosotros", icon: HeartHandshake },
            ].map(({ href, label, text, icon: Icon }) => (
              <Link key={href} href={href} className="group rounded-2xl border border-white/70 bg-white/85 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">¿Por qué afiliarte?</p>
            <h2 className="mt-3 font-heading text-4xl font-black tracking-[-0.02em] sm:text-5xl">Beneficios de ser parte de ASEMUCH</h2>
          </div>
          <Link href="/afiliarse" className="inline-flex w-fit rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-blue-light">
            Afiliarme ahora
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-[1.6rem] border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="noticias" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-7xl px-4 pt-2 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Noticias ASEMUCH Coquimbo</p>
          <h2 className="mt-3 font-heading text-4xl font-black tracking-[-0.02em] sm:text-5xl">Últimas novedades, comunicados y actividades de ASEMUCH Coquimbo</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">Noticias locales y nacionales relacionadas con el trabajo municipal y la actividad gremial.</p>
        </div>
        <NewsSection />
      </section>

      <section id="afiliate" className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden rounded-[2.25rem] border border-border bg-slate-950 text-white shadow-[0_32px_80px_rgba(15,23,42,0.16)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[420px]">
            <Image
              src="/images/rossa-renney-cristian-tapia-foto-para-directiva-y-hero.webp"
              alt="Representantes de ASEMUCH Coquimbo en actividad gremial"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
          </div>

          <div className="p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
              <ArrowDownRight className="h-4 w-4" />
              Afiliación
            </div>
            <h2 className="mt-5 font-heading text-4xl font-black tracking-[-0.02em] sm:text-5xl">
              Si trabajas en la Municipalidad de Coquimbo puedes afiliarte a ASEMUCH
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/78">
              La afiliación permite fortalecer la organización y defender los derechos de funcionarios
              municipales de Coquimbo mediante una representación gremial activa.
            </p>

            <div className="mt-8 rounded-[1.6rem] border border-white/12 bg-white/8 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/62">Requisitos</p>
              <p className="mt-3 text-base leading-7 text-white/82">
                Pueden afiliarse trabajadoras y trabajadores de planta, contrata, cementerio o código de la
                Municipalidad de Coquimbo.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <a
                href="/FORMULARIO%20ASEMUCH%20COQUIMBO.docx"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-base font-bold text-slate-950 transition hover:translate-y-[-1px]"
              >
                <Download className="h-4 w-4" />
                Descargar formulario
              </a>
              <a
                href="/FORMULARIO%20ASEMUCH%20COQUIMBO.docx"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                <FileText className="h-4 w-4" />
                Ver documento adjunto
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
