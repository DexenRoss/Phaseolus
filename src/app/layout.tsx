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
    <html lang="es">
      <body className="antialiased min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
