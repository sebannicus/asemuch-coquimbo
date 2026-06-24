import Link from "next/link";
import { QUICK_ACCESS_ITEMS } from "./SiteData";

export default function QuickAccess() {
  return (
    <section className="py-12 bg-white">
      <div className="container-site">
        <h2
          className="text-center text-lg font-bold text-[#5d6675] mb-8 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
        >
          Accesos rápidos
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {QUICK_ACCESS_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-[#e3e9f1] bg-white hover:bg-[#f5f9fc] hover:border-[#0c71c3]/40 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#e7edf5] group-hover:bg-[#0c71c3] flex items-center justify-center text-2xl transition-colors duration-200">
                <span role="img" aria-label={item.label}>{item.icon}</span>
              </div>
              <div>
                <p
                  className="font-bold text-[#0c2340] group-hover:text-[#0c71c3] transition-colors text-sm lg:text-base"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  {item.label}
                </p>
                <p className="text-xs text-[#5d6675] mt-0.5">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
