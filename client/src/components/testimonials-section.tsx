export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Jessica Martinez",
      role: "Software Engineer",
      transformation: "180 lbs → 145 lbs",
      quote: "FitClub transformed my life in just 6 months. The trainers are incredibly knowledgeable and supportive!",
      initial: "J",
      color: "bg-primary"
    },
    {
      name: "David Thompson",
      role: "Business Owner",
      transformation: "220 lbs → 185 lbs",
      quote: "The facilities are world-class and the community here is amazing. Best investment I've made for my health.",
      initial: "D",
      color: "bg-accent"
    }
  ];

  return (
    <section className="section-spacing bg-background">
      <div className="container mx-auto container-spacing">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tight">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Real transformations from our members
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="minimal-card p-10" data-testid={`testimonial-${testimonial.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="flex items-start space-x-6 mb-8">
                <div className={`w-20 h-20 ${testimonial.color} rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-2xl`}>
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-1">{testimonial.name}</h4>
                  <p className="text-muted-foreground mb-2">{testimonial.role}</p>
                  <p className="text-sm text-primary font-semibold">Transformation: {testimonial.transformation}</p>
                </div>
              </div>
              <blockquote className="text-muted-foreground text-lg leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
