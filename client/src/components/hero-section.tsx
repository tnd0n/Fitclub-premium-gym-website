import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-background">

      {/* Hero Content */}
      <div className="container mx-auto container-spacing text-center max-w-6xl">
        <div className="space-y-8">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
            Transform Your Body, <span className="gradient-text">Elevate Your Life</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light">
            Premium fitness experience with world-class facilities and expert trainers
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
            <Button 
              onClick={() => scrollToSection('classes')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-200 min-w-[220px] h-14"
              data-testid="button-start-journey"
            >
              Start Your Journey
            </Button>
            <Button 
              onClick={() => scrollToSection('membership')}
              variant="outline"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-200 min-w-[220px] h-14"
              data-testid="button-view-plans"
            >
              View Membership Plans
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
