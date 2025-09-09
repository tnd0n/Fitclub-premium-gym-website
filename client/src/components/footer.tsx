export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Classes", href: "#classes" },
    { label: "Trainers", href: "#trainers" }
  ];

  const services = [
    { label: "Personal Training", href: "#" },
    { label: "Group Classes", href: "#" },
    { label: "Nutrition Coaching", href: "#" },
    { label: "Recovery & Spa", href: "#" }
  ];

  const socialLinks = [
    { icon: "fab fa-facebook-f", href: "#", color: "bg-primary" },
    { icon: "fab fa-instagram", href: "#", color: "bg-accent" },
    { icon: "fab fa-twitter", href: "#", color: "bg-primary" },
    { icon: "fab fa-youtube", href: "#", color: "bg-accent" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
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
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div data-testid="footer-brand">
            <h3 className="text-2xl font-bold gradient-text mb-4">FitClub</h3>
            <p className="text-muted-foreground">
              Transform your body, elevate your life with our premium fitness experience.
            </p>
          </div>

          {/* Quick Links */}
          <div data-testid="footer-quick-links">
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-primary transition-colors text-left"
                    data-testid={`footer-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div data-testid="footer-services">
            <h4 className="text-lg font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    className="hover:text-primary transition-colors"
                    data-testid={`footer-service-${service.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div data-testid="footer-social">
            <h4 className="text-lg font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform`}
                  data-testid={`social-${social.icon.split(' ')[1].replace('fa-', '')}`}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 FitClub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
