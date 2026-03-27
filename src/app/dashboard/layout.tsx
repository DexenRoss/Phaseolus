import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentSession } from "@/lib/auth";
import LogoutButton from "@/components/auth/logout-button";
import { AppPermission, hasPermission, isAppRole } from "@/lib/permissions";

type NavItem = {
  href: string;
  label: string;
  permission?: AppPermission;
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  if (!isAppRole(session.role)) {
    redirect("/forbidden");
  }

  const navItems: NavItem[] = [
    { href: "/dashboard", label: "Overview" },
    {
      href: "/dashboard/users",
      label: "Users",
      permission: "user:read",
    },
    {
      href: "/dashboard/invitations",
      label: "Invitations",
      permission: "invitation:read",
    },
    {
      href: "/dashboard/audit",
      label: "Audit Log",
      permission: "audit:read",
    },
    {
      href: "/dashboard/authors",
      label: "Authors",
      permission: "author:create",
    },
    {
      href: "/dashboard/publications",
      label: "Publications",
      permission: "publication:create",
    },
  ];

  const visibleNavItems = navItems.filter((item) => {
    if (!item.permission) return true;
    return hasPermission(session.role, item.permission);
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside
        style={{
          borderRight: "1px solid #e5e7eb",
          padding: "24px",
          display: "grid",
          alignContent: "start",
          gap: "24px",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>Phaseolus</h1>
          <p style={{ marginTop: "8px", color: "#6b7280" }}>Lab platform</p>
        </div>

        <nav style={{ display: "grid", gap: "12px" }}>
          {visibleNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "grid", gap: "8px", fontSize: "14px" }}>
          <div>Email: {session.email}</div>
          <div>Rol: {session.role}</div>
        </div>

        <LogoutButton />
      </aside>

      <main style={{ padding: "24px" }}>{children}</main>
    </div>
  );
}