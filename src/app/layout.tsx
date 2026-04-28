import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phaseolus — Expresión Diferencial de Genes",
  description:
    "Portal de análisis de expresión diferencial de genes de Phaseolus vulgaris y P. acutifolius. Consulta niveles de expresión bajo distintas condiciones, tejidos y tiempos.",
  keywords: ["Phaseolus", "expresión diferencial", "frijol", "genes", "UNAM", "bioinformática"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
