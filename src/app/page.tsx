import Image from "next/image";

export default function Home() {
  return (
    <div className="">
       <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold">Theme tokens OK</h1>

      <button className="mt-6 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90">
        Botón primario
      </button>

      <div className="mt-6 rounded-lg border border-border bg-secondary p-4 text-secondary-foreground">
        Caja secundaria
      </div>
    </main>
    </div>
  );
}
