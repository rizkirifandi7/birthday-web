import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/MainPage/Hero";
import FeatureTabs from "@/components/MainPage/FeatureTabs";
import FunQuiz from "@/components/MainPage/FunQuiz";
import Footer from "@/components/MainPage/Footer";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto border-x border-border min-h-screen bg-background text-foreground antialiased selection:bg-rose-500/20 selection:text-rose-600">
      {/* Codeforge Top Header Bar */}
      <Navbar />

      {/* Codeforge Divide-y Section Layout */}
      <main className="flex flex-col divide-y divide-border">
        <Hero name="Sahabat Tercinta" />
        <FeatureTabs />
        <FunQuiz />
      </main>

      {/* Codeforge Grid Footer */}
      <Footer />
    </div>
  );
}
