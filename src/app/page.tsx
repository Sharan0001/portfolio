import Hero from "@/components/hero/Hero";
import SystemsShowcase from "@/components/systems/SystemsShowcase";
import DecisionDemo from "@/components/demo/DecisionDemo";
import PhilosophySection from "@/components/philosophy/PhilosophySection";
import TechDepth from "@/components/tech/TechDepth";
import ModelLifecycle from "@/components/lifecycle/ModelLifecycle";
import Timeline from "@/components/timeline/Timeline";
import Contact from "@/components/contact/Contact";
import CursorGlow from "@/components/ui/CursorGlow";
import FloatingIcons from "@/components/ui/FloatingIcons";

export default function Home() {
  return (
    <main className="relative">
      <CursorGlow />
      {/* Global floating AI/ML icons */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingIcons />
      </div>
      <div className="relative z-10">
        <Hero />
        <div className="section-divider" />
        <SystemsShowcase />
        <div className="section-divider" />
        <DecisionDemo />
        <div className="section-divider" />
        <PhilosophySection />
        <div className="section-divider" />
        <TechDepth />
        <div className="section-divider" />
        <ModelLifecycle />
        <div className="section-divider" />
        <Timeline />
        <div className="section-divider" />
        <Contact />
      </div>
    </main>
  );
}
