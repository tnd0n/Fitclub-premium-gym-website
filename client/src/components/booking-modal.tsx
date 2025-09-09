import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertBookingSchema } from "@shared/schema";
import type { FitnessClass, Trainer } from "@shared/schema";

const bookingFormSchema = insertBookingSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

interface BookingModalProps {
  type: "class" | "trainer";
  item: FitnessClass | Trainer;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ type, item, isOpen, onClose }: BookingModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      type,
      itemId: item.id,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      return apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      toast({
        title: "Booking confirmed!",
        description: `Your ${type} booking has been confirmed. We'll contact you soon.`,
      });
      form.reset();
      onClose();
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Booking failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

  const isClass = type === "class";
  const displayName = isClass ? (item as FitnessClass).name : (item as Trainer).name;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Book {isClass ? "Class" : "Session"}: {displayName}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          {isClass ? (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Time:</strong> {(item as FitnessClass).time}</p>
              <p><strong>Duration:</strong> {(item as FitnessClass).duration}</p>
              <p><strong>Trainer:</strong> {(item as FitnessClass).trainer}</p>
              <p><strong>Difficulty:</strong> {(item as FitnessClass).difficulty}</p>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Specialty:</strong> {(item as Trainer).specialty}</p>
              <p><strong>Experience:</strong> {(item as Trainer).experience}</p>
              <p><strong>Certifications:</strong> {(item as Trainer).certifications}</p>
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">First Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="bg-input border-border text-foreground"
                        data-testid="booking-input-first-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="bg-input border-border text-foreground"
                        data-testid="booking-input-last-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      {...field} 
                      className="bg-input border-border text-foreground"
                      data-testid="booking-input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      {...field} 
                      className="bg-input border-border text-foreground"
                      data-testid="booking-input-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={onClose}
                className="flex-1"
                data-testid="booking-button-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={bookingMutation.isPending}
                className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground"
                data-testid="booking-button-confirm"
              >
                {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
