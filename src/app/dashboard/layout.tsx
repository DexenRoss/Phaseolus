import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/logout-button";
import { getCurrentSession } from "@/lib/auth";
import { getDashboardNavItems } from "@/lib/permissions";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  const navItems = getDashboardNavItems(session.permissions);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-[var(--border)] bg-[var(--sidebar)] p-6 lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">Phaseolus</h1>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Lab platform
            </p>
          </div>

          <nav className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--sidebar-hover)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <p className="text-sm text-[var(--muted-foreground)]">Email</p>
            <p className="mt-1 text-sm font-medium">{session.email}</p>

            <p className="mt-4 text-sm text-[var(--muted-foreground)]">Rol</p>
            <p className="mt-1 inline-flex rounded-full bg-[var(--badge)] px-3 py-1 text-xs font-semibold text-[var(--badge-foreground)]">
              {session.role}
            </p>

            <div className="mt-4">
              <LogoutButton />
            </div>
          </div>
        </aside>

        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}