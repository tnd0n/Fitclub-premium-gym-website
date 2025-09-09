import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Membership } from "@shared/schema";

export default function MembershipSection() {
  const { data: memberships = [], isLoading } = useQuery<Membership[]>({
    queryKey: ['/api/memberships'],
  });

  if (isLoading) {
    return (
      <section id="membership" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading memberships...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="membership" className="section-spacing bg-card">
      <div className="container mx-auto container-spacing">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tight">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Flexible membership options to fit your lifestyle
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {memberships.map((membership) => (
            <Card 
              key={membership.id} 
              className={`minimal-card relative ${membership.popular ? 'border-primary border-2' : ''}`}
              data-testid={`membership-${membership.name.toLowerCase()}`}
            >
              {membership.popular === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <CardContent className="p-10">
                <div className={`text-center mb-10 ${membership.popular ? 'mt-4' : ''}`}>
                  <h3 className="text-2xl font-bold text-foreground mb-6">{membership.name}</h3>
                  <div className="text-5xl font-black text-foreground mb-2">
                    ${membership.price}
                    <span className="text-xl text-muted-foreground font-medium">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  {membership.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-muted-foreground">
                      <i className="fas fa-check text-primary w-5 mr-4 mt-1 text-sm"></i>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full py-4 rounded-lg font-semibold transition-colors duration-200 ${
                    membership.popular 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                      : 'bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground'
                  }`}
                  data-testid={`choose-${membership.name.toLowerCase()}`}
                >
                  Choose {membership.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
