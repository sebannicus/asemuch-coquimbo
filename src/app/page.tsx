import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickAccess />
        <NewsSection />
      </main>
      <Footer />
    </>
  );
}
