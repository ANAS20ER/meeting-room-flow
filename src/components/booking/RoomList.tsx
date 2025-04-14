
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tv, Users, Wifi, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

// Types for our room data
export type Room = {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  image: string;
  location: string;
};

// Mock room data
export const ROOMS: Room[] = [
  {
    id: "1",
    name: "Salle Innovation",
    capacity: 8,
    equipment: ["TV", "Wifi", "Café"],
    image: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    location: "Étage 1"
  },
  {
    id: "2",
    name: "Salle Créativité",
    capacity: 4,
    equipment: ["TV", "Wifi"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    location: "Étage 2"
  },
  {
    id: "3",
    name: "Salle Stratégie",
    capacity: 10,
    equipment: ["TV", "Wifi", "Café"],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    location: "Étage 1"
  },
  {
    id: "4",
    name: "Salle Focus",
    capacity: 6,
    equipment: ["Wifi"],
    image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    location: "Étage 3"
  },
  {
    id: "5",
    name: "Salle Collaboration",
    capacity: 12,
    equipment: ["TV", "Wifi", "Café"],
    image: "https://images.unsplash.com/photo-1573167507387-dd4d54f660f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    location: "Étage 2"
  }
];

// Map of equipment names to icons
const EQUIPMENT_ICONS: Record<string, React.ReactNode> = {
  TV: <Tv className="h-4 w-4" />,
  Wifi: <Wifi className="h-4 w-4" />,
  Café: <Coffee className="h-4 w-4" />
};

type RoomListProps = {
  selectedRoomId: string | null;
  onRoomSelect: (room: Room) => void;
  selectedDate: Date | undefined;
  selectedTimeSlot: string | null;
};

const RoomList: React.FC<RoomListProps> = ({
  selectedRoomId,
  onRoomSelect,
  selectedDate,
  selectedTimeSlot
}) => {
  // Filter rooms based on date and time selections (in a real app, this would call an API)
  const availableRooms = ROOMS.filter(() => selectedDate && selectedTimeSlot);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-booking-dark">
          Salles disponibles
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedDate && selectedTimeSlot ? (
          availableRooms.length > 0 ? (
            <div className="flex flex-col gap-3">
              {availableRooms.map((room) => (
                <div
                  key={room.id}
                  className={cn(
                    "p-3 border rounded-md cursor-pointer transition-all",
                    selectedRoomId === room.id
                      ? "border-booking-primary bg-booking-light"
                      : "hover:border-booking-accent"
                  )}
                  onClick={() => onRoomSelect(room)}
                >
                  <div className="flex items-start gap-3">
                    <div className="hidden sm:block w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{room.name}</h3>
                        <Badge variant="outline" className="ml-2">
                          <Users className="mr-1 h-3 w-3" />
                          {room.capacity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {room.location}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {room.equipment.map((item) => (
                          <div
                            key={item}
                            className="flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                          >
                            {EQUIPMENT_ICONS[item]}
                            <span className="ml-1 hidden md:inline">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 text-muted-foreground">
              Aucune salle disponible pour la période sélectionnée.
            </div>
          )
        ) : (
          <div className="text-center p-6 text-muted-foreground">
            Veuillez sélectionner une date et un horaire pour voir les salles disponibles.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomList;
