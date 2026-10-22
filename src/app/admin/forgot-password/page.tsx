import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/admin/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#f5f9fc] px-4 py-12 text-lg text-[#0c2340]">
      <div className="mx-auto max-w-lg rounded-3xl border-2 border-[#e1ebf6] bg-white p-6 shadow-sm sm:p-10">
        <Link href="/admin/login" className="inline-flex min-h-12 items-center text-lg font-bold text-[#0c71c3] hover:underline">
          ← Volver a entrar
        </Link>
        <h1 className="mt-2 text-3xl font-extrabold" style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
          Olvidé mi contraseña
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-[#3d4756]">
          Escribe tu correo y te enviaremos un enlace para crear una contraseña nueva.
        </p>

        <ForgotPasswordForm />
      </div>
    </main>
  );
}
