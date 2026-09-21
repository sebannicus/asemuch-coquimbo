import type { Metadata } from "next";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";
import { ProtectedAdminPage } from "@/components/admin/ProtectedAdminPage";

export const metadata: Metadata = {
  title: "Mi cuenta | Panel Admin",
};

export default function AdminProfilePage() {
  return (
    <ProtectedAdminPage>
      <ChangePasswordForm />
    </ProtectedAdminPage>
  );
}
