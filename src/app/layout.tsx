"use client";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type SessionData = {
  email?: string;
  name?: string;
  timestamp?: number;
};

function getStoredSession(): SessionData | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedSession = localStorage.getItem("phaseolus_session");
    if (!storedSession) {
      return null;
    }

    const parsedSession = JSON.parse(storedSession) as SessionData;
    const now = Date.now();
    if (parsedSession.timestamp && now - parsedSession.timestamp > 3600_000) {
      localStorage.removeItem("phaseolus_session");
      window.location.href = "/login";
      return null;
    }

    return parsedSession;
  } catch {
    return null;
  }
}

function getStoredDarkMode(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem("phaseolus_dark") === "1";
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dark, setDark] = useState(getStoredDarkMode);
  const [session] = useState<SessionData | null>(getStoredSession);

  // Estado para modo oscuro
  const isDarkMode = dark;
  const toggleDarkMode = () => setDark((d) => !d);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("phaseolus_dark", "1");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("phaseolus_dark");
    }
  }, [dark]);

  function handleSessionLinkClick() {
    if (!session?.email) {
      return;
    }

    localStorage.removeItem("phaseolus_session");
    window.location.href = "/login";
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-6 w-full">
                <button
                  className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:underline bg-transparent border-none cursor-pointer"
                  style={{ background: "none", border: "none", padding: 0 }}
                  onClick={() => window.location.href = "/"}
                >
                  Phaseolus
                </button>
                <nav className="flex-1 flex justify-end items-center gap-4">
                  {session && session.email ? (
                    <span className="text-gray-700 dark:text-gray-300">Bienvenido, {session.name || session.email}</span>
                  ) : null}
                  <Link
                    href="/login"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={handleSessionLinkClick}
                  >
                    {session && session.email ? "Cerrar sesión" : "Iniciar sesión"}
                  </Link>
                  <button
                    onClick={toggleDarkMode}
                    className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                    style={{ minWidth: 110 }}
                  >
                    {isDarkMode ? "Modo claro" : "Modo oscuro"}
                  </button>
                </nav>
              </div>
            </header>
        {children}
      </body>
    </html>
  );
}
