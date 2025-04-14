
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", 
  "12:00", "13:00", "14:00", "15:00", 
  "16:00", "17:00"
];

type TimeSlotsProps = {
  selectedTimeSlot: string | null;
  onTimeSelect: (timeSlot: string) => void;
};

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedTimeSlot,
  onTimeSelect,
}) => {
  return (
    <div className="mt-2">
      <h3 className="text-base font-medium mb-2">Horaires disponibles</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {TIME_SLOTS.map((time) => (
          <Button
            key={time}
            variant="outline"
            className={cn(
              "text-sm h-10",
              selectedTimeSlot === time
                ? "bg-booking-primary text-white hover:bg-booking-dark"
                : "hover:bg-booking-light hover:text-booking-primary"
            )}
            onClick={() => onTimeSelect(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};
