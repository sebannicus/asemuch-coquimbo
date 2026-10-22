"use client";

import { useState } from "react";
import { adminInputClassName } from "./ui";

// Campo de contraseña con botón "Mostrar": evita errores de tipeo al no ver lo que se escribe.
export function PasswordField({
  name,
  label,
  minLength,
  autoComplete = "current-password",
}: {
  name: string;
  label: string;
  minLength?: number;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block">
      <span className="mb-2 block text-lg font-bold text-[#0c2340]">{label}</span>
      <span className="flex gap-2">
        <input
          name={name}
          type={visible ? "text" : "password"}
          required
          minLength={minLength}
          autoComplete={autoComplete}
          className={adminInputClassName}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="min-h-14 shrink-0 rounded-lg border-2 border-[#b9cde3] px-4 text-base font-bold text-[#0c2340] hover:border-[#0c71c3]"
          aria-pressed={visible}
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </span>
    </label>
  );
}
