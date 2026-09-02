export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#cbdced] bg-white p-8 text-center">
      <h2
        className="text-lg font-bold text-[#0c2340]"
        style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
      >
        {title}
      </h2>
      <p className="mt-2 text-sm text-[#5d6675]">{description}</p>
    </div>
  );
}
