export default function CheckEmailPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams?.email || "";

  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-muted p-6 md:p-10">
        <h1 className="text-2xl font-extrabold">Revisa tu correo</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Te enviamos un correo de confirmación{email ? ` a ${email}` : ""}.  
          Abre el link para activar tu cuenta.
        </p>

        <div className="mt-6 rounded-lg border border-border bg-background p-4 text-sm">
          Si no lo ves, revisa <b>spam</b> o <b>promociones</b>.
        </div>
      </div>
    </main>
  );
}
