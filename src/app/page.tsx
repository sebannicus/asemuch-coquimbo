import Image from "next/image";
import { ArrowDownRight, Download, FileText, HeartHandshake, Landmark, Megaphone, ShieldCheck, Users } from "lucide-react";

const stats = [
  { value: "+100", label: "años de historia gremial" },
  { value: "+300", label: "organizaciones comunales de base a nivel nacional" },
];

const highlights = [
  "Representamos a funcionarios municipales de Coquimbo con trabajo gremial activo y cercano.",
  "Integramos la historia de ASEMUCH con una proyección local enfocada en derechos, bienestar y organización.",
  "Mantenemos vínculo con beneficios y convenios de ASEMÚCH Coquimbo y la Confederación Nacional.",
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

const newsCards = [
  {
    title: "Noticias ASEMÚCH Coquimbo",
    text: "Últimas novedades, comunicados y actividades de ASEMÚCH Coquimbo, junto a noticias locales y nacionales relevantes para funcionarios municipales.",
    icon: Megaphone,
  },
  {
    title: "Comunicados y actividades",
    text: "Espacio para difundir acuerdos, convocatorias, jornadas y participación gremial con foco directo en la Municipalidad de Coquimbo.",
    icon: FileText,
  },
];

const benefits = [
  {
    title: "Acompañamiento gremial",
    text: "Orientación y respaldo para resguardar derechos laborales de funcionarios municipales de Coquimbo.",
    icon: ShieldCheck,
  },
  {
    title: "Convenios y beneficios",
    text: "Acceso a beneficios y convenios de ASEMÚCH Coquimbo y Confederación Nacional.",
    icon: HeartHandshake,
  },
  {
    title: "Capacitación y articulación",
    text: "Participación en encuentros, jornadas y redes de trabajo con otras organizaciones municipales.",
    icon: Users,
  },
];

const navItems = [
  { href: "#quienes-somos", label: "Quiénes Somos" },
  { href: "#directiva", label: "Directiva" },
  { href: "#noticias", label: "Noticias" },
  { href: "#afiliate", label: "Afíliate" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/foto-hero-asemuch-coquimbo-reunion-funcionarios.webp"
          alt="Funcionarios municipales de Coquimbo en una actividad de ASEMÚCH Coquimbo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,52,0.78),rgba(7,26,52,0.62)_40%,rgba(7,26,52,0.88))]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/25 to-transparent" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
          <header className="sticky top-4 z-20 rounded-full border border-white/18 bg-white/12 px-4 py-3 backdrop-blur-md">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <a href="#inicio" className="flex items-center gap-4 text-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/16 text-lg font-black tracking-[0.28em]">
                  A
                </div>
                <div>
                  <p className="font-heading text-[clamp(1.45rem,2.5vw,2.4rem)] font-black leading-none">
                    ASEMÚCH Coquimbo
                  </p>
                  <p className="mt-1 text-sm text-white/78 sm:text-base">
                    Asociación de Funcionarios Municipales de Coquimbo
                  </p>
                </div>
              </a>

              <nav className="flex flex-wrap items-center gap-2 text-sm text-white/90">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/18 px-4 py-2 transition hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </header>

          <div
            id="inicio"
            className="grid flex-1 items-end gap-10 pb-6 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:pb-0 lg:pt-20"
          >
            <div className="max-w-3xl text-white">
              <div className="mb-6 inline-flex rounded-full border border-white/16 bg-white/12 px-4 py-2 text-sm font-medium backdrop-blur">
                Funcionarios municipales de Coquimbo
              </div>
              <h1 className="font-heading text-[clamp(2.9rem,7vw,6.1rem)] font-black leading-[0.94] tracking-[-0.03em] text-balance">
                Más de 100 años de historia gremial al servicio de Coquimbo.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84 sm:text-xl">
                ASEMÚCH Coquimbo representa, acompaña y organiza a funcionarios municipales de Coquimbo
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

            <div className="grid gap-4 self-end lg:pb-8">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[2rem] border border-white/16 bg-white/14 p-6 text-white shadow-[0_30px_80px_rgba(6,16,33,0.28)] backdrop-blur-md"
                >
                  <p className="font-heading text-4xl font-black sm:text-5xl">{stat.value}</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-white/82 sm:text-base">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[2rem] border border-white/14 bg-white/12 p-6 text-white backdrop-blur-md">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Presencia gremial</p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/84">
                Unificamos la bienvenida del sitio con la presentación institucional para que la primera
                experiencia sea una sola pieza: clara, cercana y respaldada por imágenes reales de la organización.
              </p>
            </article>
            <article className="rounded-[2rem] border border-white/14 bg-[linear-gradient(135deg,rgba(242,198,78,0.22),rgba(255,255,255,0.08))] p-6 text-white backdrop-blur-md">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Enfoque exclusivo Coquimbo</p>
              <p className="mt-4 text-lg leading-8 text-white/84">
                Todo el relato institucional se centra en Coquimbo, en sus funcionarios municipales y en la
                organización gremial local.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="quienes-somos" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg">
              <Image
                src="/images/reunion-asemuch-funcionarios.webp"
                alt="Actividad de ASEMÚCH Coquimbo con funcionarios municipales"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-80 overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg sm:translate-y-10">
              <Image
                src="/images/junto-a-asemuch-nacional-y-hero.webp"
                alt="Dirigentes de ASEMÚCH Coquimbo en actividad gremial"
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
              ASEMÚCH Coquimbo reúne a funcionarios municipales de Coquimbo para defender derechos,
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

      <section id="noticias" className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-border bg-[linear-gradient(135deg,rgba(28,84,146,0.08),rgba(242,198,78,0.13))] p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Noticias y comunicados</p>
          <h2 className="mt-4 font-heading text-4xl font-black tracking-[-0.02em] sm:text-5xl">
            Últimas novedades, comunicados y actividades de ASEMÚCH Coquimbo
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            El área Noticias ASEMÚCH Coquimbo queda abierta a noticias locales y nacionales vinculadas al
            trabajo municipal, al quehacer gremial y a la participación de la asociación.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {newsCards.map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-[1.75rem] border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-foreground">{title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {benefits.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-[1.8rem] border border-border bg-card p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="afiliate" className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden rounded-[2.25rem] border border-border bg-slate-950 text-white shadow-[0_32px_80px_rgba(15,23,42,0.16)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[420px]">
            <Image
              src="/images/rossa-renney-cristian-tapia-foto-para-directiva-y-hero.webp"
              alt="Representantes de ASEMÚCH Coquimbo en actividad gremial"
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
