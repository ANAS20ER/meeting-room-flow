
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Room } from "./RoomList";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  subject: z.string().min(2, {
    message: "L'objet doit comporter au moins 2 caractères.",
  }),
  participants: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num > 0;
  }, {
    message: "Veuillez entrer un nombre valide de participants.",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type BookingFormProps = {
  selectedRoom: Room | null;
  selectedDate: Date | undefined;
  selectedTimeSlot: string | null;
  onComplete: () => void;
};

const BookingForm: React.FC<BookingFormProps> = ({
  selectedRoom,
  selectedDate,
  selectedTimeSlot,
  onComplete,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      participants: "",
      notes: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would send the booking data to the server
    console.log("Booking submitted:", {
      ...data,
      roomId: selectedRoom?.id,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
    });
    
    // Show a toast notification
    toast.success("Réservation confirmée !", {
      description: `Votre réservation pour ${selectedRoom?.name} le ${formatDate(selectedDate)} à ${selectedTimeSlot} a été confirmée.`,
    });
    
    // Reset form and booking state
    form.reset();
    onComplete();
  };

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    return format(date, "PPPP", { locale: fr });
  };

  const isFormDisabled = !selectedRoom || !selectedDate || !selectedTimeSlot;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-booking-dark">
          Finaliser la réservation
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isFormDisabled ? (
          <div className="text-muted-foreground text-center p-6">
            Veuillez sélectionner une date, un horaire et une salle pour finaliser votre réservation.
          </div>
        ) : (
          <div className="mb-6 space-y-2 bg-muted p-3 rounded-md">
            <p><strong>Salle:</strong> {selectedRoom?.name}</p>
            <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
            <p><strong>Heure:</strong> {selectedTimeSlot}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom" {...field} disabled={isFormDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="votre.email@example.com" {...field} disabled={isFormDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objet de la réunion</FormLabel>
                  <FormControl>
                    <Input placeholder="Objet de la réunion" {...field} disabled={isFormDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de participants</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nombre de participants"
                      min="1"
                      max={selectedRoom?.capacity.toString()}
                      {...field}
                      disabled={isFormDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Notes spécifiques pour cette réservation"
                      className="resize-none"
                      {...field}
                      disabled={isFormDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-booking-primary hover:bg-booking-dark"
              disabled={isFormDisabled}
            >
              Confirmer la réservation
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
