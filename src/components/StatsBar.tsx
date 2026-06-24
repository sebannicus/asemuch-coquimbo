import { STATS } from "./SiteData";

export default function StatsBar() {
  return (
    <section className="bg-white border-y border-[#e3e9f1]">
      <div className="container-site py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#e3e9f1]">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-7 px-4 text-center gap-1"
            >
              <span
                className="text-3xl font-extrabold text-[#0c71c3]"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-medium text-[#5d6675] uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
