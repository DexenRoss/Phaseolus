import AcceptInvitationForm from "@/components/invitations/accept-invitation-form";

type AcceptInvitationPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function AcceptInvitationPage({
  searchParams,
}: AcceptInvitationPageProps) {
  const { token } = await searchParams;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Aceptar invitación</h1>
        <p style={{ color: "#475569" }}>
          Completa tus datos para crear tu cuenta en Phaseolus.
        </p>

        <AcceptInvitationForm token={token ?? ""} />
      </div>
    </main>
  );
}