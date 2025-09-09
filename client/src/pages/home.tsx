import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import FeaturesSection from "@/components/features-section";
import ClassesSection from "@/components/classes-section";
import TrainersSection from "@/components/trainers-section";
import MembershipSection from "@/components/membership-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ClassesSection />
      <TrainersSection />
      <MembershipSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
