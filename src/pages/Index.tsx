import HeroSection from "@/components/HeroSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import ProjectGrid from "@/components/ProjectGrid";
import DevConsole from "@/components/DevConsole";
import Timeline from "@/components/Timeline";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Main content */}
      <main>
        <HeroSection />
        <SkillsMarquee />
        <ProjectGrid />
        <DevConsole />
        <Timeline />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
