import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  return (
    <div className="min-h-screen bg-[#f5f9fc] text-lg text-[#0c2340]">
      <AdminHeader userEmail={userEmail} />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[230px_1fr] lg:py-8">
        <AdminSidebar />
        <main className="min-w-0 pb-16">{children}</main>
      </div>
    </div>
  );
}
