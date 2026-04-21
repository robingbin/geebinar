import { createFileRoute } from "@tanstack/react-router";
import { CursorGlow } from "@/components/site/CursorGlow";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { FeaturedFilms } from "@/components/site/FeaturedFilms";
import { AllProjects } from "@/components/site/AllProjects";
import { Reels } from "@/components/site/Reels";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <FeaturedFilms />
        <AllProjects />
        <Reels />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
