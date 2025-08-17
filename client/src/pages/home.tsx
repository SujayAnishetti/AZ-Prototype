import Header from "@/components/header";
import Hero from "@/components/hero";
import ClinicalTrialsGrid from "@/components/clinical-trials-grid";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <ClinicalTrialsGrid />
      <Footer />
    </div>
  );
}
