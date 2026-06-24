import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import QuickAccess from "@/components/QuickAccess";
import NewsSection from "@/components/NewsSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <QuickAccess />
      <NewsSection />
    </main>
  );
}
