import { requireAdminSession } from "@/lib/auth";
import { AdminShell } from "./AdminShell";

export async function ProtectedAdminPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdminSession();

  return <AdminShell userEmail={user?.email ?? ""}>{children}</AdminShell>;
}
