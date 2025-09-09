import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingModal from "@/components/booking-modal";
import type { FitnessClass } from "@shared/schema";

export default function ClassesSection() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [bookingClass, setBookingClass] = useState<FitnessClass | null>(null);

  const { data: classes = [], isLoading } = useQuery<FitnessClass[]>({
    queryKey: ['/api/classes'],
  });

  const filters = [
    { id: "all", label: "All Classes" },
    { id: "strength", label: "Strength" },
    { id: "cardio", label: "Cardio" },
    { id: "yoga", label: "Yoga" },
    { id: "boxing", label: "Boxing" }
  ];

  const filteredClasses = selectedFilter === "all" 
    ? classes 
    : classes.filter(cls => cls.category === selectedFilter);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-primary text-primary-foreground';
      case 'intermediate': return 'bg-accent text-accent-foreground';
      case 'advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <section id="classes" className="py-20 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading classes...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="classes" className="section-spacing bg-card">
      <div className="container mx-auto container-spacing">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tight">
            Our <span className="gradient-text">Classes</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light">
            Choose from our diverse range of fitness programs
          </p>

          {/* Class Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedFilter === filter.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'border-border hover:bg-primary hover:text-primary-foreground'
                }`}
                data-testid={`filter-${filter.id}`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((cls) => (
            <Card key={cls.id} className="minimal-card overflow-hidden" data-testid={`class-${cls.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div 
                className="h-56 bg-cover bg-center"
                style={{ backgroundImage: `url('${cls.image}')` }}
              />
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-foreground">{cls.name}</h3>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getDifficultyColor(cls.difficulty)}`}>
                    {cls.difficulty}
                  </span>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-muted-foreground">
                    <i className="fas fa-clock w-5 mr-4 text-primary"></i>
                    <span className="font-medium">{cls.time}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <i className="fas fa-hourglass-half w-5 mr-4 text-primary"></i>
                    <span className="font-medium">{cls.duration}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <i className="fas fa-user w-5 mr-4 text-primary"></i>
                    <span className="font-medium">{cls.trainer}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <i className="fas fa-users w-5 mr-4 text-primary"></i>
                    <span className="font-medium">{cls.spots} spots left</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setBookingClass(cls)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold transition-colors duration-200"
                  data-testid={`book-class-${cls.id}`}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {bookingClass && (
        <BookingModal
          type="class"
          item={bookingClass}
          isOpen={!!bookingClass}
          onClose={() => setBookingClass(null)}
        />
      )}
    </section>
  );
}
