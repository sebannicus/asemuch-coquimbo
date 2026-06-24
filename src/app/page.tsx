import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import QuickAccess from "@/components/QuickAccess";
import BeneficiosSection from "@/components/BeneficiosSection";
import NewsSection from "@/components/NewsSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <QuickAccess />
      <BeneficiosSection />
      <NewsSection />
    </main>
  );
}
