const MESSAGES: Record<string, string> = {
  guardado: "Listo, se guardó correctamente.",
  eliminado: "Listo, se eliminó.",
};

export function AdminNotice({ ok }: { ok?: string }) {
  const message = ok ? MESSAGES[ok] : undefined;

  if (!message) {
    return null;
  }

  return (
    <div role="status" className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-5 py-4 text-xl font-bold text-emerald-800">
      ✅ {message}
    </div>
  );
}
