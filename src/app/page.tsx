"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex min-h-[80vh] w-full max-w-5xl flex-col gap-16 px-6 py-16 text-foreground">
        <section className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Phaseolus</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Expresión diferencial de genes de Phaseolus vulgaris y P. acutifolius
          </p>
          <Link
            href="/graphs"
            className="inline-flex w-fit items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Ir a gráficas de expresión
          </Link>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Portal de información integrada para Phaseolus</h2>
          <p className="text-base text-muted-foreground">
            Aplicación web pública para consultar niveles de expresión y expresión diferencial de genes de frijol bajo distintas condiciones, tejidos y tiempos.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer hendrerit, ligula id maximus feugiat, sapien libero consequat justo, sed faucibus elit neque vitae dolor.
          </p>
        </section>
      </main>
    </div>
  );
}
