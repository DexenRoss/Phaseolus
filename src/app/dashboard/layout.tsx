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

  const baseNavItems = [{ href: "/dashboard", label: "Overview", icon: "grid" }];

  const adminItems = [
    { href: "/dashboard/users", label: "Users", icon: "users" },
    { href: "/dashboard/invitations", label: "Invitations", icon: "mail" },
    { href: "/dashboard/audit", label: "Audit Log", icon: "shield" },
  ];

  const collaboratorItems = [
    { href: "/dashboard/publications", label: "Publications", icon: "file" },
    { href: "/dashboard/datasets", label: "Datasets", icon: "database" },
    { href: "/dashboard/expression", label: "Expression", icon: "chart" },
  ];

  const userItems = [
    { href: "/dashboard/publications", label: "Publications", icon: "file" },
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
        gridTemplateColumns: "280px 1fr",
        background: "hsl(150 10% 97%)",
      }}
    >
      <aside
        style={{
          background: "linear-gradient(180deg, #064E3B 0%, #065F46 40%, #047857 100%)",
          color: "#ffffff",
          padding: "28px 20px",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gap: "28px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Logo / Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <div
              style={{
                height: "36px",
                width: "36px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                display: "grid",
                placeItems: "center",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.12em",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              PV
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: 800,
                letterSpacing: "-0.01em",
              }}
            >
              Phaseolus
            </h1>
          </div>
          <p
            style={{
              marginTop: "4px",
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              fontWeight: 400,
            }}
          >
            Lab platform · UNAM
          </p>
        </div>

        {/* Navigation */}
        <nav style={{ display: "grid", gap: "6px", alignContent: "start" }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                padding: "11px 14px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.06)",
                fontSize: "14px",
                fontWeight: 500,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User info + logout */}
        <div
          style={{
            display: "grid",
            gap: "14px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
            <div style={{ marginBottom: "4px" }}>
              <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Email:</span>{" "}
              {session.email}
            </div>
            <div>
              <span style={{ fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Rol:</span>{" "}
              <span
                style={{
                  display: "inline-block",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.12)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: "#86efac",
                }}
              >
                {session.role}
              </span>
            </div>
          </div>

          <LogoutButton />
        </div>
      </aside>

      <main
        style={{
          padding: "32px",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}
