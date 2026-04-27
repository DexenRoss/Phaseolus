import Link from "next/link";
import ScrollFrames from "../components/ScrollFrames";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Scroll-driven seedling animation — THE PROTAGONIST */}
      <ScrollFrames frameCount={60} />

      {/* ─── Navigation Header ─── */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 glass-light">
        <div className="flex items-center gap-3">
          {/* UNAM Shield */}
          <img
            src="/unam-logo.svg"
            alt="UNAM"
            className="h-9 w-auto"
          />
          <div>
            <span className="text-base font-bold tracking-wide text-foreground">
              Phaseolus
            </span>
            <span className="hidden sm:inline text-xs text-muted-foreground ml-2">
              UNAM
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="/graphs"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Gráficas
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 shadow-sm"
          >
            Iniciar sesión
          </Link>
        </nav>
      </header>

      {/* ─── Hero Section — Left-aligned, minimal overlay ─── */}
      <section className="relative z-20 flex min-h-[92vh] flex-col items-start justify-end px-8 sm:px-12 lg:px-16 pb-20">
        {/* Subtle left-side gradient only — lets the animation breathe */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.03) 55%, transparent 100%)",
          }}
        />

        <div className="max-w-xl animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-white/90 tracking-wide uppercase">
              Portal de Análisis Genómico
            </span>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl text-glow leading-[1.05]">
            Phaseolus
          </h1>

          <p className="mt-5 max-w-md text-base sm:text-lg text-white/85 font-light leading-relaxed text-glow-sm">
            Expresión diferencial de genes de{" "}
            <em className="font-medium not-italic text-emerald-300">
              Phaseolus vulgaris
            </em>{" "}
            y{" "}
            <em className="font-medium not-italic text-emerald-300">
              P.&nbsp;acutifolius
            </em>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/graphs"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110 shadow-lg shadow-emerald-900/30 animate-pulse-glow"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              Explorar gráficas
            </Link>

            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/8 backdrop-blur-sm px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/15"
            >
              Conocer más
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-8 flex flex-col items-center gap-1.5 animate-bounce-subtle opacity-60">
          <span className="text-[10px] text-white/50 tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section id="about" className="relative z-20 py-16 px-8 sm:px-12 lg:px-16">
        <div className="max-w-lg">
          <div className="glass rounded-2xl p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-10 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Sobre el Proyecto
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 text-glow">
              Portal integrado para{" "}
              <span className="text-emerald-300">Phaseolus</span>
            </h2>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-8 text-glow-sm">
              Consulta niveles de expresión y expresión diferencial de genes de frijol
              bajo distintas condiciones, tejidos y tiempos. Desarrollado en colaboración
              con la UNAM.
            </p>

            {/* Compact feature list */}
            <div className="grid gap-3">
              <div className="flex items-center gap-3 rounded-lg bg-white/8 px-4 py-3">
                <div className="h-8 w-8 rounded-md bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-semibold text-white/90">Análisis de Expresión</span>
                  <span className="text-xs text-white/50 ml-2">Gráficas interactivas</span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-white/8 px-4 py-3">
                <div className="h-8 w-8 rounded-md bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-semibold text-white/90">Multi-condición</span>
                  <span className="text-xs text-white/50 ml-2">Tejidos y tiempos</span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-white/8 px-4 py-3">
                <div className="h-8 w-8 rounded-md bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-semibold text-white/90">Datos Abiertos</span>
                  <span className="text-xs text-white/50 ml-2">Acceso público</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Research Context Section ─── */}
      <section className="relative z-20 py-16 px-8 sm:px-12 lg:px-16">
        <div className="max-w-lg">
          <div className="glass rounded-2xl p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-10 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Contexto Científico
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 text-glow">
              Importancia del frijol
            </h2>

            <p className="text-sm text-white/70 leading-relaxed mb-4 text-glow-sm">
              El frijol común (<em>Phaseolus vulgaris</em> L.) es la leguminosa más importante
              para consumo humano directo en América Latina y África. Su cultivo es fundamental
              para la seguridad alimentaria de más de 400 millones de personas en el mundo.
            </p>
            <p className="text-sm text-white/70 leading-relaxed mb-4 text-glow-sm">
              México es centro de origen y diversificación del frijol, albergando una diversidad
              genética única que incluye las cinco especies domesticadas del género <em>Phaseolus</em>.
              Esta riqueza genética representa un recurso invaluable para el mejoramiento de
              cultivos frente a los retos del cambio climático.
            </p>
            <p className="text-sm text-white/70 leading-relaxed text-glow-sm">
              La especie silvestre <em>P. acutifolius</em> (frijol tépari) destaca por su
              tolerancia excepcional a sequía y altas temperaturas, lo que la convierte en una
              fuente estratégica de genes de resistencia para programas de mejoramiento genético.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Methodology Section ─── */}
      <section className="relative z-20 py-16 px-8 sm:px-12 lg:px-16">
        <div className="max-w-lg ml-auto mr-8 sm:mr-12 lg:mr-16">
          <div className="glass rounded-2xl p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-10 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Metodología
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 text-glow">
              Análisis transcriptómico
            </h2>

            <p className="text-sm text-white/70 leading-relaxed mb-4 text-glow-sm">
              Se emplearon tecnologías de secuenciación masiva (RNA-Seq) para perfilar la
              expresión génica global bajo distintas condiciones experimentales, incluyendo
              interacciones con <em>Rhizobium</em>, estrés por sequía y estrés salino.
            </p>
            <p className="text-sm text-white/70 leading-relaxed mb-4 text-glow-sm">
              Los datos de expresión fueron normalizados mediante CPM (Counts Per Million) y
              TMM (Trimmed Mean of M-values) para garantizar comparaciones cuantitativas
              robustas entre condiciones y réplicas biológicas.
            </p>
            <p className="text-sm text-white/70 leading-relaxed text-glow-sm">
              La identificación de genes diferencialmente expresados se realizó con modelos
              lineales generalizados, aplicando correcciones de comparaciones múltiples
              (FDR &lt; 0.05) y filtros de fold change (|log₂FC| &gt; 1).
            </p>
          </div>
        </div>
      </section>

      {/* ─── Dataset Overview Section ─── */}
      <section className="relative z-20 py-16 px-8 sm:px-12 lg:px-16">
        <div className="max-w-lg">
          <div className="glass rounded-2xl p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-10 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Datasets Disponibles
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 text-glow">
              Condiciones experimentales
            </h2>

            <div className="grid gap-3 mb-6">
              {[
                { label: "Rhizobium", desc: "Simbiosis y nodulación", samples: "36 muestras" },
                { label: "Sequía", desc: "Estrés hídrico progresivo", samples: "24 muestras" },
                { label: "Salinidad", desc: "Estrés salino (NaCl)", samples: "18 muestras" },
                { label: "Desarrollo", desc: "Etapas de germinación", samples: "30 muestras" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg bg-white/8 px-4 py-3">
                  <div>
                    <span className="text-sm font-semibold text-white/90">{item.label}</span>
                    <span className="text-xs text-white/50 ml-2">{item.desc}</span>
                  </div>
                  <span className="text-xs text-emerald-400/80 font-medium">{item.samples}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-white/60 leading-relaxed text-glow-sm">
              Cada dataset incluye réplicas biológicas, controles negativos y métricas de
              calidad de las bibliotecas de secuenciación para garantizar la reproducibilidad
              de los resultados.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Team & Collaboration Section ─── */}
      <section className="relative z-20 py-16 px-8 sm:px-12 lg:px-16">
        <div className="max-w-lg ml-auto mr-8 sm:mr-12 lg:mr-16">
          <div className="glass rounded-2xl p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-10 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Colaboración
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 text-glow">
              Laboratorio Nacional de Análisis y Tecnología del Centro de Genómicas
            </h2>

            <p className="text-sm text-white/70 leading-relaxed mb-4 text-glow-sm">
              Este portal es resultado de la colaboración entre el laboratorio de genómica
              funcional de la UNAM y el equipo de bioinformática del Centro de Ciencias
              Genómicas (CCG).
            </p>
            <p className="text-sm text-white/70 leading-relaxed text-glow-sm">
              La plataforma permite a investigadores, estudiantes y colaboradores externos
              acceder de forma abierta a los datos de expresión generados en el laboratorio,
              facilitando la reproducibilidad y el avance de la investigación en genómica
              de leguminosas.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Call to Action ─── */}
      <section className="relative z-20 py-20 px-8 sm:px-12 lg:px-16">
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)",
          }}
        />

        <div className="max-w-lg">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 text-glow leading-tight">
            Explora la expresión génica
          </h2>
          <p className="text-base text-white/75 mb-8 text-glow-sm leading-relaxed">
            Accede a las gráficas interactivas de expresión diferencial
            y descubre patrones de regulación en condiciones experimentales diversas.
          </p>
          <Link
            href="/graphs"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition hover:brightness-110 shadow-lg shadow-emerald-900/30"
          >
            Ir a las gráficas
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-20 border-t border-white/10 py-8 px-8 sm:px-12 lg:px-16">
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
          }}
        />
        <div className="max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/unam-logo.svg"
              alt="UNAM"
              className="h-7 w-auto opacity-70"
            />
            <span className="text-xs text-white/50">
              © 2025 Phaseolus — UNAM
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/graphs" className="text-xs text-white/40 transition hover:text-white/80">
              Gráficas
            </Link>
            <Link href="/login" className="text-xs text-white/40 transition hover:text-white/80">
              Acceso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
