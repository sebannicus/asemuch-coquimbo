import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/admin/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Recuperar contraseña | Panel Admin",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#f5f9fc] px-4 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-[#d9e6f5] bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0c71c3]">Panel Admin</p>
        <h1
          className="mt-2 text-3xl font-extrabold text-[#0c2340]"
          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
        >
          Recuperar contraseña
        </h1>
        <p className="mt-2 text-sm text-[#5d6675]">
          Ingresa el email de la cuenta admin y te enviaremos un enlace para definir una nueva contraseña.
        </p>

        <ForgotPasswordForm />
      </div>
    </main>
  );
}
