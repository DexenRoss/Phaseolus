export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-3">
          <img
            src="/unam-logo.png"
            alt="UNAM"
            className="h-10 w-auto"
          />
        </div>

        <a
          href="#"
          className="text-indigo-500 font-medium hover:underline"
        >
          Iniciar sesión
        </a>
      </header>

      {/* HERO */}
      <section
        className="relative px-10 py-20 overflow-hidden"
      >
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-no-repeat bg-right bg-contain opacity-80"
          style={{
            backgroundImage: "url('/dna.png')",
          }}
        />

        {/* Contenido */}
        <div className="relative max-w-3xl">
          <h1 className="text-6xl font-extrabold text-indigo-500 mb-6">
            Phaseolus
          </h1>

          <p className="text-xl font-semibold mb-6">
            Expresión diferencial de genes de <br />
            <span className="italic">
              Phaseolus vulgaris y P. acutifolius
            </span>
          </p>

          <button className="mt-4 inline-flex items-center rounded-full bg-indigo-500 px-6 py-3 text-white font-medium hover:bg-indigo-600 transition">
            Ir a gráficas de expresión
          </button>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="px-10 py-20 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">
          Portal de información integrada para Phaseolus
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Aplicación web pública para consultar niveles de expresión y expresión
          diferencial de genes de frijol bajo distintas condiciones, tejidos y
          tiempos.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="flex items-center justify-between px-10 py-6 border-t text-sm text-gray-600">
        <span>© 2025 Todos los derechos reservados</span>

        <img
          src="/unam-logo.png"
          alt="UNAM"
          className="h-8 w-auto"
        />
      </footer>
    </main>
  );
}
