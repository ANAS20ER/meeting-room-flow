
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Tv, Wifi, Coffee } from "lucide-react";
import type { Room } from "./RoomList";

type RoomDetailsProps = {
  room: Room | null;
};

// Map of equipment names to icons
const EQUIPMENT_ICONS: Record<string, React.ReactNode> = {
  TV: <Tv className="h-5 w-5" />,
  Wifi: <Wifi className="h-5 w-5" />,
  Café: <Coffee className="h-5 w-5" />
};

const RoomDetails: React.FC<RoomDetailsProps> = ({ room }) => {
  if (!room) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-booking-dark">
            Détails de la salle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <p>Veuillez sélectionner une salle pour voir ses détails.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl text-booking-dark flex items-center justify-between">
          <span>{room.name}</span>
          <Badge className="ml-2 bg-booking-primary">
            <Users className="mr-1 h-3 w-3" />
            {room.capacity} personnes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="rounded-md overflow-hidden h-48">
            <img
              src={room.image}
              alt={`Photo de ${room.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{room.location}</span>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Équipements</h3>
              <div className="flex flex-wrap gap-3">
                {room.equipment.map((item) => (
                  <div
                    key={item}
                    className="flex items-center bg-muted px-3 py-2 rounded-md"
                  >
                    {EQUIPMENT_ICONS[item]}
                    <span className="ml-2">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomDetails;
