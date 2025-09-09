import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingModal from "@/components/booking-modal";
import type { Trainer } from "@shared/schema";

export default function TrainersSection() {
  const [bookingTrainer, setBookingTrainer] = useState<Trainer | null>(null);

  const { data: trainers = [], isLoading } = useQuery<Trainer[]>({
    queryKey: ['/api/trainers'],
  });

  if (isLoading) {
    return (
      <section id="trainers" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading trainers...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="trainers" className="section-spacing bg-background">
      <div className="container mx-auto container-spacing">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tight">
            Meet Our Expert <span className="gradient-text">Trainers</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            World-class professionals dedicated to your success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="minimal-card text-center" data-testid={`trainer-${trainer.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <CardContent className="p-8">
                <div 
                  className="w-32 h-32 mx-auto mb-6 bg-cover bg-center rounded-2xl"
                  style={{ backgroundImage: `url('${trainer.image}')` }}
                />
                <h3 className="text-xl font-bold text-foreground mb-2">{trainer.name}</h3>
                <p className="text-primary font-semibold mb-4">{trainer.specialty}</p>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{trainer.bio}</p>
                <div className="text-sm text-muted-foreground mb-2">
                  <strong>Certifications:</strong> {trainer.certifications}
                </div>
                <div className="text-sm text-muted-foreground mb-8">
                  <strong>Experience:</strong> {trainer.experience}
                </div>
                <Button 
                  onClick={() => setBookingTrainer(trainer)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold transition-colors duration-200"
                  data-testid={`book-trainer-${trainer.id}`}
                >
                  Book Session
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {bookingTrainer && (
        <BookingModal
          type="trainer"
          item={bookingTrainer}
          isOpen={!!bookingTrainer}
          onClose={() => setBookingTrainer(null)}
        />
      )}
    </section>
  );
}
