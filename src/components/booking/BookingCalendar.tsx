
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeSlots } from "./TimeSlots";

type BookingCalendarProps = {
  onDateTimeSelect: (date: Date | undefined, timeSlot: string | null) => void;
  selectedDate: Date | undefined;
  selectedTimeSlot: string | null;
};

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  onDateTimeSelect,
  selectedDate,
  selectedTimeSlot,
}) => {
  const handleDateSelect = (date: Date | undefined) => {
    onDateTimeSelect(date, selectedTimeSlot);
  };

  const handleTimeSelect = (timeSlot: string) => {
    onDateTimeSelect(selectedDate, timeSlot);
  };

  // Disable past dates and weekends for the calendar
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    return date < today || isWeekend;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-booking-dark">
          Sélectionnez une date et un horaire
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={isDateDisabled}
            className="rounded-md pointer-events-auto border"
          />
          
          {selectedDate && (
            <TimeSlots
              selectedTimeSlot={selectedTimeSlot}
              onTimeSelect={handleTimeSelect}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;
