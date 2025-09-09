import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h2 className="text-xl lg:text-2xl font-black gradient-text tracking-tight">FitClub</h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                data-testid="nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                data-testid="nav-features"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('classes')}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                data-testid="nav-classes"
              >
                Classes
              </button>
              <button 
                onClick={() => scrollToSection('trainers')}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                data-testid="nav-trainers"
              >
                Trainers
              </button>
              <button 
                onClick={() => scrollToSection('membership')}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                data-testid="nav-membership"
              >
                Membership
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button 
              className="hidden sm:block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md font-medium transition-colors duration-200"
              data-testid="button-free-trial"
            >
              Book Free Trial
            </Button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-foreground hover:text-primary transition-colors"
              data-testid="button-mobile-menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-foreground hover:text-primary transition-colors font-medium text-left"
                data-testid="nav-mobile-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-left"
                data-testid="nav-mobile-features"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('classes')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-left"
                data-testid="nav-mobile-classes"
              >
                Classes
              </button>
              <button 
                onClick={() => scrollToSection('trainers')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-left"
                data-testid="nav-mobile-trainers"
              >
                Trainers
              </button>
              <button 
                onClick={() => scrollToSection('membership')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-left"
                data-testid="nav-mobile-membership"
              >
                Membership
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-left"
                data-testid="nav-mobile-contact"
              >
                Contact
              </button>
              <Button 
                className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium w-full"
                data-testid="button-mobile-free-trial"
              >
                Book Free Trial
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
