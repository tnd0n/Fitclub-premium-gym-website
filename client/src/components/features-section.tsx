export default function FeaturesSection() {
  const features = [
    {
      icon: "fas fa-dumbbell",
      title: "Personal Training",
      description: "One-on-one coaching with certified trainers tailored to your specific goals and fitness level."
    },
    {
      icon: "fas fa-users",
      title: "Group Classes",
      description: "High-energy group workouts including HIIT, Yoga, Boxing, and specialized fitness programs."
    },
    {
      icon: "fas fa-apple-alt",
      title: "Nutrition Coaching",
      description: "Expert nutrition guidance and meal planning to maximize your fitness results and overall health."
    },
    {
      icon: "fas fa-spa",
      title: "Recovery & Spa",
      description: "Premium recovery services including sauna, massage therapy, and rehabilitation support."
    }
  ];

  return (
    <section id="features" className="section-spacing bg-background">
      <div className="container mx-auto container-spacing">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tight">
            Why Choose <span className="gradient-text">FitClub</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Premium facilities and expert guidance for your fitness journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="minimal-card p-8 text-center" data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                <i className={`${feature.icon} text-2xl text-primary`}></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
