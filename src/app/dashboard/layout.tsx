import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentSession } from "@/lib/auth";
import LogoutButton from "@/components/auth/logout-button";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  const baseNavItems = [{ href: "/dashboard", label: "Overview" }];

  const adminItems = [
    { href: "/dashboard/users", label: "Users" },
    { href: "/dashboard/invitations", label: "Invitations" },
    { href: "/dashboard/audit", label: "Audit Log" },
  ];

  const collaboratorItems = [
    { href: "/dashboard/publications", label: "Publications" },
    { href: "/dashboard/datasets", label: "Datasets" },
  ];

  const userItems = [
    { href: "/dashboard/publications", label: "Publications" },
  ];

  let navItems = [...baseNavItems];

  if (session.role === "ADMIN") {
    navItems = [...navItems, ...adminItems, ...collaboratorItems];
  } else if (session.role === "COLLABORATOR") {
    navItems = [...navItems, ...collaboratorItems];
  } else if (session.role === "USER") {
    navItems = [...navItems, ...userItems];
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        background: "#f8fafc",
      }}
    >
      <aside
        style={{
          background: "#0f172a",
          color: "#ffffff",
          padding: "24px 20px",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gap: "24px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            Phaseolus
          </h1>
          <p
            style={{
              marginTop: "8px",
              color: "#cbd5e1",
              fontSize: "14px",
            }}
          >
            Lab platform
          </p>
        </div>

        <nav style={{ display: "grid", gap: "10px", alignContent: "start" }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: "#e2e8f0",
                textDecoration: "none",
                padding: "10px 12px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            display: "grid",
            gap: "12px",
            paddingTop: "12px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ fontSize: "14px", color: "#cbd5e1" }}>
            <div>
              <strong>Email:</strong> {session.email}
            </div>
            <div>
              <strong>Rol:</strong> {session.role}
            </div>
          </div>

          <LogoutButton />
        </div>
      </aside>

      <main
        style={{
          padding: "32px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
